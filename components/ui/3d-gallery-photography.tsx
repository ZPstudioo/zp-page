"use client";

import type React from "react";
import { useRef, useMemo, useState, useEffect, type MutableRefObject } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

type ImageItem = string | { src: string; alt?: string };

/** Avança (+1) ou volta (-1) exatamente uma foto. */
export type ComandoGaleria = (dir: 1 | -1) => void;

interface FadeSettings {
  fadeIn: { start: number; end: number };
  fadeOut: { start: number; end: number };
}

interface BlurSettings {
  blurIn: { start: number; end: number };
  blurOut: { start: number; end: number };
  maxBlur: number;
}

interface InfiniteGalleryProps {
  /** Todas as fotos. Lista estável: as texturas carregam uma vez só. */
  images: ImageItem[];
  /** Índices de `images` que o túnel percorre (o filtro). Padrão: todas. */
  ativas?: number[];
  /** Recebe a função de passo — para botões de seta fora do canvas. */
  controle?: MutableRefObject<ComandoGaleria | null>;
  speed?: number;
  visibleCount?: number;
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  className?: string;
  style?: React.CSSProperties;
}

const DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;
/** Deriva do autoplay, em unidades de profundidade por segundo. */
const AUTO_VEL = 1;
/** Sem interação por este tempo, o autoplay volta (com rampa). */
const AUTO_RETORNO_MS = 3000;

const createClothMaterial = () => {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normal;
        vec3 pos = position;
        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        pos.z -= (curve + clothEffect + flagWave);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    /* Blur em 3×3 (9 leituras por pixel, eram 25). O passo dobra para manter
       o mesmo raio — e com a textura de 1200px, um texel já é o dobro do de
       2400px, então o `maxBlur` da galeria não precisa mudar. */
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vec4 color = texture2D(map, vUv);
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          for (float x = -1.0; x <= 1.0; x += 1.0) {
            for (float y = -1.0; y <= 1.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

/** 0→1 dentro da faixa [start, end]; 0 antes, 1 depois. */
const faixa = (p: number, start: number, end: number) =>
  p <= start ? 0 : p >= end ? 1 : (p - start) / (end - start);

/**
 * O túnel de fotos.
 *
 * Nada aqui passa pelo estado do React depois da montagem: os 8 planos são
 * criados uma vez e, a cada frame, posição, escala, textura e uniforms são
 * escritos direto nos objetos do three. (Antes havia `setState` dentro do
 * `useFrame` — a cena inteira re-renderizava a 60fps, lendo a velocidade de
 * um frame atrás. Era a trava.)
 *
 * O movimento é um número só, `desloc` = deriva do autoplay + passo das
 * setas. A posição e a foto de cada plano saem dele por conta — nada
 * acumula, então nenhum salto de velocidade consegue embaralhar as fotos.
 */
function GalleryScene({
  images,
  ativas,
  controle,
  speed = 1,
  visibleCount = 8,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.15 },
    fadeOut: { start: 0.85, end: 0.95 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.9, end: 1.0 },
    maxBlur: 3.0,
  },
}: Omit<InfiniteGalleryProps, "className" | "style" | "controle"> & {
  controle: MutableRefObject<ComandoGaleria | null>;
}) {
  const gl = useThree((s) => s.gl);

  const srcs = useMemo(
    () => images.map((img) => (typeof img === "string" ? img : img.src)),
    [images],
  );
  /* ImageBitmapLoader: a decodificação do WebP acontece fora da thread
     principal (`createImageBitmap`). Com o TextureLoader comum ela caía no
     primeiro frame de cada foto — parte do engasgo. O bitmap já vem
     invertido (`flipY`), por isso a textura sai com `flipY = false`. */
  const bitmaps = useLoader(THREE.ImageBitmapLoader, srcs, (loader) => {
    (loader as THREE.ImageBitmapLoader).setOptions({ imageOrientation: "flipY" });
  }) as ImageBitmap[];

  const textures = useMemo(
    () =>
      bitmaps.map((b) => {
        const t = new THREE.Texture(b);
        t.flipY = false;
        t.needsUpdate = true;
        return t;
      }),
    [bitmaps],
  );
  useEffect(
    () => () => {
      textures.forEach((t) => t.dispose());
    },
    [textures],
  );

  /* Subida para a GPU: UMA textura por frame, a partir do momento em que a
     cena liga (um pouco antes da seção aparecer). Subir as 23 de uma vez
     travava um frame por mais de 1s com a CPU limitada; esperar o primeiro
     frame de cada foto espalhava engasgos pela animação. */
  const filaGpu = useRef<THREE.Texture[]>([]);
  useEffect(() => {
    filaGpu.current = [...textures];
  }, [textures]);

  const aspectos = useMemo(
    () =>
      textures.map((t) => {
        const img = t.image as ImageBitmap | null;
        return img?.width && img?.height ? img.width / img.height : 1;
      }),
    [textures],
  );

  const lista = useMemo(() => ativas ?? images.map((_, i) => i), [ativas, images]);

  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createClothMaterial()),
    [visibleCount],
  );
  const geometria = useMemo(() => new THREE.PlaneGeometry(1, 1, 32, 32), []);
  useEffect(
    () => () => {
      materials.forEach((m) => m.dispose());
    },
    [materials],
  );
  useEffect(() => () => geometria.dispose(), [geometria]);

  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  const posicoes = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const horizontalAngle = (i * 2.618) % (Math.PI * 2);
      const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
      const horizontalRadius = (i % 3) * 1.2;
      const verticalRadius = ((i + 1) % 4) * 0.8;
      out.push({
        x: (Math.sin(horizontalAngle) * horizontalRadius * MAX_HORIZONTAL_OFFSET) / 3,
        y: (Math.cos(verticalAngle) * verticalRadius * MAX_VERTICAL_OFFSET) / 4,
      });
    }
    return out;
  }, [visibleCount]);

  /** Distância entre dois planos — "uma foto" de passo. */
  const passo = DEPTH_RANGE / visibleCount;

  const estado = useRef({
    deriva: 0,
    seta: { v: 0 },
    alvo: 0,
    ultimoToque: -Infinity,
    auto: 1,
    anterior: 0,
    forca: 0,
    lista,
    troca: { o: 1 },
  });

  /* ── Seta = um quadro ─────────────────────────────────────────
     Cada toque avança exatamente `passo`. Toques durante o deslize
     encadeiam (até 2 fotos à frente do que está na tela) em vez de
     somar velocidade — por isso segurar a seta não dispara mais. */
  useEffect(() => {
    const e = estado.current;
    controle.current = (dir) => {
      e.ultimoToque = performance.now();
      const emCurso = gsap.isTweening(e.seta);
      e.alvo = gsap.utils.clamp(e.seta.v - 2 * passo, e.seta.v + 2 * passo, e.alvo + dir * passo);
      gsap.to(e.seta, {
        v: e.alvo,
        duration: 0.8,
        // Parado: movimento de câmera, `dolly`. Já deslizando: `cut`, que sai
        // na velocidade máxima — reiniciar um ease-in no meio daria um tranco.
        ease: emCurso ? "cut" : "dolly",
        overwrite: true,
      });
    };
    return () => {
      controle.current = null;
      gsap.killTweensOf(e.seta);
    };
  }, [controle, passo]);

  /* ── Filtro: dissolve curto, a lista troca no escuro ─────────── */
  useEffect(() => {
    const e = estado.current;
    if (e.lista === lista) return;
    const tl = gsap
      .timeline()
      .to(e.troca, { o: 0, duration: 0.25, ease: "shutter" })
      .add(() => {
        e.lista = lista;
      })
      .to(e.troca, { o: 1, duration: 0.4, ease: "cut" });
    return () => {
      tl.kill();
      e.lista = lista;
      e.troca.o = 1;
    };
  }, [lista]);

  useFrame((state, delta) => {
    // Voltando de aba oculta ou de fora da tela, o delta chega enorme.
    const dt = Math.min(delta, 0.05);
    const e = estado.current;

    const proxima = filaGpu.current.shift();
    if (proxima) gl.initTexture(proxima);

    // Autoplay: some no toque, volta com rampa 3s depois.
    const querAuto = performance.now() - e.ultimoToque > AUTO_RETORNO_MS ? 1 : 0;
    e.auto += (querAuto - e.auto) * Math.min(1, dt * 2);
    e.deriva += AUTO_VEL * speed * e.auto * dt;

    const desloc = e.deriva + e.seta.v;
    const vel = (desloc - e.anterior) / Math.max(dt, 1e-4);
    e.anterior = desloc;
    // A curvatura do "tecido" acompanha a velocidade, com teto.
    e.forca += (gsap.utils.clamp(-2, 2, vel / 10) - e.forca) * Math.min(1, dt * 8);

    const time = state.clock.elapsedTime;
    const ids = e.lista;
    const n = ids.length;

    for (let i = 0; i < visibleCount; i++) {
      const mesh = meshes.current[i];
      const mat = materials[i];
      if (!mesh || !mat) continue;

      const bruto = passo * i + desloc;
      const volta = Math.floor(bruto / DEPTH_RANGE);
      const z = bruto - volta * DEPTH_RANGE;
      const slot = i + volta * visibleCount;
      const idx = n ? ids[((slot % n) + n) % n] : -1;
      const tex = idx >= 0 ? textures[idx] : undefined;
      if (!tex) {
        mesh.visible = false;
        continue;
      }

      const p = z / DEPTH_RANGE;
      const opacity =
        faixa(p, fadeSettings.fadeIn.start, fadeSettings.fadeIn.end) *
        (1 - faixa(p, fadeSettings.fadeOut.start, fadeSettings.fadeOut.end)) *
        e.troca.o;
      const blur =
        blurSettings.maxBlur *
        Math.max(
          1 - faixa(p, blurSettings.blurIn.start, blurSettings.blurIn.end),
          faixa(p, blurSettings.blurOut.start, blurSettings.blurOut.end),
        );

      mesh.visible = opacity > 0.001;
      if (!mesh.visible) continue;

      // A troca de foto acontece no mesmo frame em que o plano dá a volta.
      if (mat.uniforms.map.value !== tex) mat.uniforms.map.value = tex;
      const a = aspectos[idx];
      mesh.scale.set(a > 1 ? 2 * a : 2, a > 1 ? 2 : 2 / a, 1);
      mesh.position.set(posicoes[i].x, posicoes[i].y, z - DEPTH_RANGE / 2);

      mat.uniforms.opacity.value = opacity;
      mat.uniforms.blurAmount.value = blur;
      mat.uniforms.time.value = time;
      mat.uniforms.scrollForce.value = e.forca;
    }
  });

  if (images.length === 0) return null;

  return (
    <>
      {materials.map((material, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          visible={false}
          geometry={geometria}
          material={material}
          onPointerEnter={() => {
            material.uniforms.isHovered.value = 1;
          }}
          onPointerLeave={() => {
            material.uniforms.isHovered.value = 0;
          }}
        />
      ))}
    </>
  );
}

function FallbackGallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="h-full overflow-y-auto bg-film-black p-6">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="h-40 w-full object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default function InfiniteGallery({
  images,
  ativas,
  controle,
  className = "h-96 w-full",
  style,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.4, end: 0.43 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.4, end: 0.43 },
    maxBlur: 8.0,
  },
  ...rest
}: InfiniteGalleryProps) {
  const [webglSupported, setWebglSupported] = useState(true);
  const raiz = useRef<HTMLDivElement>(null);
  const controleInterno = useRef<ComandoGaleria | null>(null);
  const comando = controle ?? controleInterno;

  /* Trava 2 do F8: fora da tela o loop para (`frameloop="never"`) e as
     setas voltam a ser só do navegador. O `setState` aqui roda na entrada
     e na saída da seção — nunca por frame. */
  const [naTela, setNaTela] = useState(false);
  const naTelaRef = useRef(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    // O loop liga ~400px antes, para as texturas irem subindo à GPU antes
    // da primeira foto aparecer…
    const loop = new IntersectionObserver(([e]) => setNaTela(e.isIntersecting), {
      rootMargin: "400px 0px",
    });
    // …mas as setas só valem com a galeria de fato na tela.
    const teclas = new IntersectionObserver(([e]) => {
      naTelaRef.current = e.isIntersecting;
    });
    loop.observe(el);
    teclas.observe(el);
    return () => {
      loop.disconnect();
      teclas.disconnect();
    };
  }, []);

  // Só ← e →, e só com a galeria visível. ↑ ↓ continuam rolando a página.
  useEffect(() => {
    const aoTeclar = (ev: KeyboardEvent) => {
      if (!naTelaRef.current || ev.defaultPrevented) return;
      if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey) return;
      const alvo = ev.target as HTMLElement | null;
      if (alvo?.closest("input, textarea, select, [contenteditable='true']")) return;
      const dir = ev.key === "ArrowRight" ? 1 : ev.key === "ArrowLeft" ? -1 : 0;
      if (!dir) return;
      ev.preventDefault();
      comando.current?.(dir);
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [comando]);

  const filtradas = useMemo(() => {
    const todas = images.map((img) =>
      typeof img === "string" ? { src: img, alt: "" } : { src: img.src, alt: img.alt ?? "" },
    );
    return ativas ? ativas.map((i) => todas[i]) : todas;
  }, [images, ativas]);

  if (!webglSupported) {
    return (
      <div className={className} style={style}>
        <FallbackGallery images={filtradas} />
      </div>
    );
  }

  return (
    <div ref={raiz} className={className} style={style}>
      <Canvas
        frameloop={naTela ? "always" : "never"}
        camera={{ position: [0, 0, 0], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <GalleryScene
          images={images}
          ativas={ativas}
          controle={comando}
          fadeSettings={fadeSettings}
          blurSettings={blurSettings}
          {...rest}
        />
      </Canvas>
    </div>
  );
}
