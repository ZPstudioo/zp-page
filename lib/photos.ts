/**
 * ═══════════════════════════════════════════════════════════════
 * MANIFESTO ÚNICO DE FOTOS
 * ═══════════════════════════════════════════════════════════════
 *
 * Nenhum componente declara imagem. Todos leem daqui.
 *
 * Acervo real do estúdio, entregue em 23/07/2026: dois ensaios de
 * estúdio (fundo cinza, luz controlada). Os originais tinham até
 * 10205×12756 e 33 MB cada; aqui estão em WebP de 2400px no lado
 * maior — o `next/image` gera os tamanhos menores sob demanda.
 *
 * O EXIF foi removido no processamento: são clientes reais e os
 * arquivos de câmera carregam número de série e, por vezes, GPS.
 *
 * Para acrescentar fotos: processe para `public/fotos/`, some uma
 * entrada aqui com `alt` que descreva a cena de verdade (é SEO e é
 * acessibilidade) e pronto — nenhum componente muda.
 */

export type Categoria = "Casais" | "Família";

export interface Foto {
  src: string;
  /** Descrição real da cena — nunca "foto 1". */
  alt: string;
  categoria: Categoria;
  largura: number;
  altura: number;
  /** largura / altura. Evita layout shift (CLS). */
  ratio: number;
  /** Miniatura de 16px embutida: o lugar da foto já nasce com a cor certa. */
  blur: string;
}

export const fotos: Foto[] = [
  {
    src: "/fotos/casal-testas-encostadas.webp",
    alt: "Casal de perfil com as testas encostadas e os olhos fechados, sob luz lateral",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAQBACdASoQABQAPt1cpkyopSOiMAgBEBuJYwDG9Yvq3tURLnfaIH8TgAD+6fNKXY+zpsFUTsFzVFRbpkogFwu7mcYNYGSL2yuGh2Rmv7p2ELWCf6KxaQwpgBoXgrQvORal78N3jcVncFYamqyF/UfUBybKhBRQtCvnihnwAAA=",
  },
  {
    src: "/fotos/casal-abraco-camera.webp",
    alt: "Casal abraçado de lado, os dois sorrindo para a câmera",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAADwAwCdASoQABQAPt1cpkyopSOiMAgBEBuJZQDCgCHcxyGnCEJyd6pQAP7Q6Pnx3aReNdmSBAzP2LKgumDdmvf0ecfPtsP9VV29SMmWaAnNcB1h7MUPUr54MzG7k9TfpfH8N5rNx4fhVzSkiT1L9eedKl5xBnfgFO3ezyRXcORDRhnLxauAAA==",
  },
  {
    src: "/fotos/casal-mao-no-rosto.webp",
    alt: "Mulher abraçada às costas do companheiro, a mão apoiada no próprio rosto",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAACQBACdASoQABQAPt1cpkyopSOiMAgBEBuJYwBv/1QB5BztPkgSY/5gDtnOZSAA/uXrpkSNiIPmazGA0IcUhWTi7v/akvNHgnC+wocKkoPu+E/9w6G5EevVKnm5KGvZODKnHudHuRaF1JnXhb0IFCs61cX0+y5NSWIig/FC7uYagwPYLgAAAA==",
  },
  {
    src: "/fotos/casal-banco-apoio.webp",
    alt: "Ele sentado no banco, ela apoiada em seus ombros, ambos olhando para a câmera",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAADwAwCdASoQABQAPt1cpkyopSOiMAgBEBuJZwAD4unafCDCMsewfXIAAP7s10IkUksldNxb4AAI0OzATAyXaBJn+Q+lGkFN9w27WagVWgTldADkbKPiDwEwRzdaApTLcXBT0itPlzZEujRLCEAAAA==",
  },
  {
    src: "/fotos/casal-olhar-banco.webp",
    alt: "Ele sentado olha para ela, de pé e de costas para a câmera",
    categoria: "Casais",
    largura: 1600,
    altura: 2400,
    ratio: 0.6667,
    blur:
      "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAAAwBACdASoQABgAPt0+s1SooiWjmAEQG4llAABc75iY9JzelxMbrYb0TwAA/un9OLpNcqmhSHssOlP0H9jkLG0sz7Wiy6/fLGDcVG/MtXhm+cP1Apr5HPj1ef8zWJOzLB7TvOpwsB1UnDyJ3uYSu9wBK/fRkylBDM1jvIWXOvS9s56wEWrGAAAA",
  },
  {
    src: "/fotos/casal-corpo-inteiro.webp",
    alt: "Retrato de corpo inteiro: ele sentado no banco, ela em pé apoiada em seu ombro",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAACwAwCdASoQABQAPt1cpkyopSOiMAgBEBuJZwAAK9zTW+HyTyGgHAD+3O9p7OO5hFkdQ4m/1kUffkAle0xpRGQZFGK/SgKlD5hing7Yk35ABR8ZfWYdTSjpzmkUgG5NaMw4RByPTwpbRNz+g+K+AAAA",
  },
  {
    src: "/fotos/casal-maos-dadas.webp",
    alt: "Casal descalço de mãos dadas, trocando olhares",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADwAwCdASoQABQAPt1apkyopSOiMAgBEBuJaQAASiaH8Ih9v34TTmUQAP7Q6VOcSwxEJMxNuk0pvdBnsIhpQAdAdmaTkUe9IdGo9ga8k4/ndLoSSR8k32z65sg2RwKsgN23uWuMgmQ5uXPXyY2CwRN1M5WAAA==",
  },
  {
    src: "/fotos/casal-maos-dadas-passo.webp",
    alt: "Casal de mãos dadas em passo, um olhando para o outro",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAAAQBACdASoQABQAPt1apkyopSOiMAgBEBuJZwAAXy5jPFiOreDSzyVuIAD+wGMfdVOEEgSthAWjnYB/jlJiYQLNVgQcUeOyO5z9uh9xaVScsqAjfps9tyNxngrXRt80t4c8KhouNGZtrhcqK+ocyZxlWwBhpiIXtAAAAA==",
  },
  {
    src: "/fotos/casal-chao-abraco.webp",
    alt: "Casal sentado no chão, ela abraçada às costas dele",
    categoria: "Casais",
    largura: 1600,
    altura: 2400,
    ratio: 0.6667,
    blur:
      "data:image/webp;base64,UklGRrIAAABXRUJQVlA4IKYAAACQBACdASoQABgAPt1ep00opSOiMAgBEBuJYwBUFdvms2PT9uA/Mo9dWCbN1AAA/oPLITOmsj3b6WnpnMvgnWUgDwaVkGoAVuyUs9luDVLXv/3AyKLofReNn9Wefn1PdmBkBS5tV342e2P/Q0RO2vuGhvcJy/7whu8SlR32KcKsOxqJ6fEOvj/X+zSyyx0D/27vCjPwfzgAJCjKcC3Bl3emJUKVoNAA",
  },
  {
    src: "/fotos/casal-chao-camera.webp",
    alt: "Casal sentado no chão de pernas cruzadas, sorrindo para a câmera",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAADwAwCdASoQABQAPt1apkyopSOiMAgBEBuJZwAAW/BSaS3mHRMnCikAAP6p7eF9UY1vxKMyNa8Kdt7cpzyJ19k15i8sYMZe6CYDsYH4m/4p/3lERBVuv9UMkR1EiLcePPkWd9yEGh/OhQT47atfk6WnIAA=",
  },
  {
    src: "/fotos/casal-chao-olhar.webp",
    alt: "Casal sentado no chão, de mãos dadas, trocando olhares",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAQBACdASoQABQAPt1apkyopSOiMAgBEBuJZwAD5GoN6XLb2dqLfYXBQAD+0OlvziYbDeFd2fsGQLhdK2cwnY440htLrja1fiD1h/EXXPn0fuxMV428NNtRvv5redg2t7moKtoOzdl72AWvRq7yVNm5YOyJb47B4l6QB7HAAAA=",
  },
  {
    src: "/fotos/casal-deitado-de-cima.webp",
    alt: "Casal deitado lado a lado, visto de cima, sorrindo um para o outro",
    categoria: "Casais",
    largura: 2400,
    altura: 1600,
    ratio: 1.5,
    blur:
      "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAABQAgCdASoQAAsAAwBSJYwCdAYtB2+W4QakMoAA/uI2/iMCGfIAtV6FbHclFe4YZoMUl86n7/w/u4DKlNbg9/dGZTEBXR6hDN5MG/lwTy/eDcJpCiOEOIdANEyab+62km3iL29SApiTDiIaAWAAAA==",
  },
  {
    src: "/fotos/casal2-banco-olhar.webp",
    alt: "Ele sentado no banco e ela em pé ao lado, os dois se olhando",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAABQBACdASoQABQAPt1apkyopSOiMAgBEBuJZQC+SYss2/3V6kIYSPCRm2LAAM4qHl8L34sVoz9cFu0WXlF6VOU1lDQjXAI6QFJxSshqsSQMR5VYvCeSpwdeUT1vF/9IOin0y+/BhRez6vlvpxBCrX0x3Be0uvN+UGMa+4WIjDcCtMB0gScJcw4AAAA=",
  },
  {
    src: "/fotos/casal2-abraco-sorriso.webp",
    alt: "Ela abraçada às costas dele, os dois sorrindo para a câmera",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRr4AAABXRUJQVlA4ILIAAACwBACdASoQABQAPt1apkyopSOiMAgBEBuJQBdmUCrKxyckF/+npuZfFux8u7sAAOJjVQ/45+YuE/+UBNaQ3UI2y1/yKte0B9syyv2tvwIdtbUmMogBl4WnR19p4NmG+xuwMqGYyepmC8vo24rsZYFX5JbSWkE4vguJSWNv5OYAd55cXgQCHjGIkfXl/tbXVXgR0p3DAPnZHDdCLg4d7ExN8Gvf8hjON/v5NetN6VvfyAAA",
  },
  {
    src: "/fotos/casal2-rostos-proximos.webp",
    alt: "Casal abraçado com os rostos próximos, sorrindo",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRr4AAABXRUJQVlA4ILIAAADQBACdASoQABQAPt1apkyopSOiMAgBEBuJQBUhtAf/+hQBs/kC6POeWXzcQlOaaADh/unJxOlz6UB8szE2V7+uoe/UDS8aLnj82c4sJUxbTfETzFiV3S71TBGkRr3D+cyT/O43i/3o4hi4ickxou0+5MNzPnih8GfRFJUdvmblnDiFd/yWnw5Ifoevj8l+DiuObGtAXMPD7h2MbJ8EdcqWzBRDn+dzlNMCq/H4SMClz2AA",
  },
  {
    src: "/fotos/casal2-poltrona.webp",
    alt: "Casal na poltrona: ela sentada no braço, ele acomodado ao lado",
    categoria: "Casais",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAAAQBACdASoQABQAPt1apkyopSOiMAgBEBuJZQC7ABk4fqwrvWrZDxhigADOOQj6xrRgzW1QvZwiKNk1V26WJiZFgEjNqlEcKoWBePEFMPau6Y2ZhaUVmqAYPdf3vmZp3B61CdiPrR0ixDB3FpMIEwLKx+fz/zvH1PcjiubOvn/8eA/gAAA=",
  },
  {
    src: "/fotos/familia-bebe-no-alto.webp",
    alt: "Pai levanta o bebê no alto enquanto a mãe acompanha o gesto",
    categoria: "Família",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRqIAAABXRUJQVlA4IJYAAABwBACdASoQABQAPt1apkyopSOiMAgBEBuJYwC7AYv+30roysFXb5h/zWAFAAD9nMng6bbCWWKg6C4e1ANJe+LOI+uU+hyLoxFbyHR3HJdoxeF6rdvXgtCiW5TA446JMrDY2jyHrPNfE2UcCIr8tzGvCSvCsfsus//nT/bnPn0Ma42P+IDgUSl18VZ6SFfKDSOaRE+OAAA=",
  },
  {
    src: "/fotos/familia-nos-ombros.webp",
    alt: "Mãe com o bebê no colo e pai com o filho mais velho nos ombros",
    categoria: "Família",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRqoAAABXRUJQVlA4IJ4AAABQBACdASoQABQAPt1cpkyopSOiMAgBEBuJYwC/OYu44J7ODzyt8MIg0fiQAPkYc4iewa8nIQqP257NkY5pSSkpxGk9iKWfmvDZ7jhlmUEEbTN0QL/aKev9g/ORzZLZdMheT+O3/0eAKYaqLJiu30R57ann8PX02GNFx+Y7We1gi7Nf2I5MR0vMQYq5woHEa6nHNJu3YG38XzbNpgAAAA==",
  },
  {
    src: "/fotos/familia-banco.webp",
    alt: "Família reunida: pai sentado no banco com o bebê, mãe e filho ao lado",
    categoria: "Família",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAQBACdASoQABQAPt1apkyopSOiMAgBEBuJZQAD5CIunOP3PH75LD610ADiXcRt2l2NY0n4I9C2Mx/UtOKPRui/hji1jnKHlR01d5uPZrt1/DJWtAOeRlWcqPzxdy2J3vawwR6JTbNT0QglmCnKcugI64zR1M94AAA=",
  },
  {
    src: "/fotos/familia-em-pe.webp",
    alt: "Família de quatro em pé, juntos, sorrindo para a câmera",
    categoria: "Família",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAADQAwCdASoQABQAPt1apkyopSOiMAgBEBuJYwAD5RHakG7u6fdzgMAA/ZtivBPTVVz+bOnEaPwI4/+BR9/wcfp93I+cBGsamFxmViP6Y8fXvN/7YJLBsiUrcDCTY9/Tc/Q5uHBz26t813WRmEFq/o4eUIUrDvl/cFiCOJQ4ICk8AA==",
  },
  {
    src: "/fotos/familia-reunida.webp",
    alt: "Pai ao centro, mãe sentada com o bebê no colo e o filho mais velho ao lado",
    categoria: "Família",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRrQAAABXRUJQVlA4IKgAAABwBACdASoQABQAPt1apkyopSOiMAgBEBuJQBdgMXmbfr3FurEeLnrJFHzHAADOKh6TgKDZl/WBTFruU2tqvpeVvYui+Pwl5L0sunbcrH8WjePst9ilkfs2L562EXTWb9Kfx/4Cvin0Bri2MABM1deFRt48RZ+vPx3f9Lw26vw7cQxUvfEX5/3ZbeT3o8zq0aOv1ky7R4YJ46sZlIKEGGlGk9ad3QLwGAA=",
  },
  {
    src: "/fotos/familia-poltrona.webp",
    alt: "Mãe sentada na poltrona com o bebê no colo e o pai em pé atrás",
    categoria: "Família",
    largura: 1920,
    altura: 2400,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAADwAwCdASoQABQAPt1apkyopSOiMAgBEBuJZwAAYfdyl+Uf1YUFkapwAP6Hhn/LSGwzAwN187BZmcTt9cCcDyvJLyNQ98KghdvH3AALr2AXVGjwZrY0lO9SQFNXkEFexWZW7CFzfgagwQpFZvfqvxmvdKyWNkl9Vl3yiSABQ06BnvmXJPEAAA==",
  },
  {
    src: "/fotos/retrato-bebe.webp",
    alt: "Retrato aproximado do bebê no colo da mãe, olhando para a câmera",
    categoria: "Família",
    largura: 1600,
    altura: 2400,
    ratio: 0.6667,
    blur:
      "data:image/webp;base64,UklGRtgAAABXRUJQVlA4IMwAAAAwBQCdASoQABgAPt1apkyopSOiMAgBEBuJYgCdMoRwA8Aaz5f1WzwsxoNuXBz4p12voAD+PDFzSyu5KtNFabYhPtZ+P40rKH8HgxzjyseFWaM62apeQoOabRPaVNyaYbLnb2Gail5unuzdX2TWIfH9L5uajFKopl9/uDgYgK1QWyqH27BywgtZ4MlcV3lYK8KmSkTWmMIP/lci8D4gEza9LAikyynsgkAo46oWqZmMxkXGEykiBnLx3n5xeCnL2GxSlgh1RDV7mfAgAAA=",
  },
];

export const categorias: Categoria[] = ["Casais", "Família"];

export const porCategoria = (c: Categoria) => fotos.filter((f) => f.categoria === c);

/**
 * Versão de 1200px da foto, só para a galeria WebGL.
 *
 * Textura não passa pelo `next/image`: sobe inteira para a GPU. Em 2400px
 * eram ~18 MB de memória de vídeo por foto (~440 MB no total) e um engasgo
 * a cada primeira aparição. Na tela um plano nunca passa de ~900px.
 * Gerada a partir do original, com o mesmo nome, em `public/fotos/galeria/`.
 */
export const srcGaleria = (f: Foto) => f.src.replace("/fotos/", "/fotos/galeria/");

/** Primeiro frame do filme — a foto do Hero. */
export const heroFoto = fotos[0];

/** Uma capa por categoria, para a lista de serviços. */
export const capas = categorias.map((c) => porCategoria(c)[0]);
