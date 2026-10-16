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

export type Categoria = "Casais" | "Família" | "Retratos" | "Profissional";

export interface Foto {
  src: string;
  /** Descrição real da cena — nunca "foto 1". */
  alt: string;
  categoria: Categoria;
  /** Entra na galeria 3D (limite de ~24: cada uma é uma textura na GPU). As demais aparecem só no grid/tira. */
  destaque?: boolean;
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
    destaque: true,
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
    destaque: true,
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
    destaque: true,
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
    destaque: true,
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
    destaque: true,
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
    destaque: true,
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
    destaque: true,
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
    destaque: true,
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
    destaque: true,
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
    destaque: true,
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
  {
    src: "/fotos/retrato-karol-close.webp",
    alt: "Mulher de cabelo longo e blusa marrom sorrindo, em close de três quartos sobre fundo cinza",
    categoria: "Retratos",
    destaque: true,
    largura: 1431,
    altura: 2000,
    ratio: 0.7155,
    blur:
      "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoLABAAA4BaJZwAAucqEEePAAD+9fB3gBEOvHCzqHqmNsTwjwYM70xQxdhm1edzE+IAAA==",
  },
  {
    src: "/fotos/retrato-karol-banqueta.webp",
    alt: "Mulher de blusa marrom e calça preta sentada numa banqueta de madeira, olhando para a câmera",
    categoria: "Retratos",
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAQCdASoLABAAA4BaJZwAAxZf+bM6AAD+9dyCAzXGNAdtWXHF2zSIqsatQkM2Ci5uSjCN6uUX8DZuXkAAAA==",
  },
  {
    src: "/fotos/retrato-karol-corpo-inteiro.webp",
    alt: "Mulher de corpo inteiro com os braços abertos, blusa marrom e calça preta, em fundo cinza",
    categoria: "Retratos",
    destaque: true,
    largura: 1441,
    altura: 2000,
    ratio: 0.7205,
    blur:
      "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAQCdASoMABAAA4BaJZQC7AEfUrMBs+YA/vScXNeUyQijyozZHkq1oeF0iYCyjmTTMI0FXJcEQDQEcTi4KHbCxc2L0PDQWgAAAA==",
  },
  {
    src: "/fotos/retrato-bruno-luz-dura.webp",
    alt: "Jovem de camiseta preta sob luz dura, olhar sério, fundo escuro",
    categoria: "Retratos",
    destaque: true,
    largura: 1600,
    altura: 2000,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAQAgCdASoNABAAA4BaJZwAAxZhYxrHPkoAAP71lMpKJkzrjmlDic3s3wvFP0gdx+mBRLRIgvz++A8RfqzxPsE+XAIAAA==",
  },
  {
    src: "/fotos/retrato-bruno-jaqueta-azul.webp",
    alt: "Jovem de jaqueta azul de time abrindo a gola, sentado numa banqueta",
    categoria: "Retratos",
    destaque: true,
    largura: 1600,
    altura: 2000,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAAAQAgCdASoNABAAA4BaJYwAD45NU/psbFgAAP7dtpxLVWVcBJ5jgAGZM0lIdoKtfkEJ9zC92sOb2K6tp3wdj9n8H2zxQd3nK4qBEcMtpuBlD5FV68FgAA==",
  },
  {
    src: "/fotos/retrato-bruno-chao.webp",
    alt: "Jovem de blusa escura sentado no chão de pernas cruzadas, em estúdio claro",
    categoria: "Retratos",
    largura: 1600,
    altura: 2000,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAACwAQCdASoNABAAA4BaJZwAAp2sYXwEAP7vkIcJOeyvdEWn6cxgckc5R/a7V1BZGn1MC4v426tBLy90shHMfUGv7ATBM7U7a9XrGtsAAAA=",
  },
  {
    src: "/fotos/retrato-bruno-poltrona.webp",
    alt: "Jovem de camiseta preta sentado na poltrona, a mão apoiada no queixo",
    categoria: "Retratos",
    largura: 1600,
    altura: 2000,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAACQAQCdASoNABAAA4BaJZQAAkicY0AA/uo3tU9excMlrY/NndwyrsFQZrgd1q7xKEcu/iI8wwsVZm4P6V9YLfwygGh6rPSXuGlzI+1SnMKKJkgbEE6ALAAA",
  },
  {
    src: "/fotos/retrato-karoline-close.webp",
    alt: "Mulher de blusa preta com a mão no queixo, em close de lado",
    categoria: "Retratos",
    destaque: true,
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAACwAQCdASoLABAAA4BaJZwAAuUoczR4AP70oQCjgoplCD6vC8WzUGAAdfKTKyvmNmKq6xpw2KdvX/Im77XOehNNczAgAA==",
  },
  {
    src: "/fotos/retrato-karoline-chao.webp",
    alt: "Mulher de calça clara e blusa preta sentada no chão, olhando para a câmera",
    categoria: "Retratos",
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAgCdASoLABAAA4BaJZwAAueJUngEO64UAP70oQb8BBSFI8io62McpDJb970mC+5GaTxGedEAitVCCHj20UFdwAA=",
  },
  {
    src: "/fotos/retrato-karoline-sorriso.webp",
    alt: "Mulher de blusa preta sorrindo de frente, as mãos à frente do corpo",
    categoria: "Retratos",
    destaque: true,
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACwAQCdASoLABAAA4BaJaQAAubtKa+wAP7p8qalKA7l9nIpd6yji1ldVEFrHHGeR+KfOvzUAAA=",
  },
  {
    src: "/fotos/profissional-douglas-maos-juntas.webp",
    alt: "Homem de jaleco branco e óculos, de frente, mãos juntas à frente do corpo, fundo cinza escuro",
    categoria: "Profissional",
    destaque: true,
    largura: 1433,
    altura: 2000,
    ratio: 0.7165,
    blur:
      "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADQAQCdASoLABAAA4BaJZwAAuXn8X+JAAD+72dzl9CT89gzeZc1wEMcUdCmp2qvdpSehiIyhmDTSrXYQypJ1VtUkAA=",
  },
  {
    src: "/fotos/profissional-douglas-corpo-inteiro.webp",
    alt: "Homem de jaleco, de pé e de corpo inteiro, braços cruzados, em estúdio de fundo cinza",
    categoria: "Profissional",
    largura: 1419,
    altura: 2000,
    ratio: 0.7095,
    blur:
      "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAACwAQCdASoLABAAA4BaJZwAAlI7/QOAAMtEWhN5CF+zQMGpxWPdBSc7khiyk0bI4yBnft0YxZgfJqL+UYaXvsAA",
  },
  {
    src: "/fotos/profissional-douglas-sorriso.webp",
    alt: "Homem de jaleco e óculos sorrindo, de braços cruzados",
    categoria: "Profissional",
    destaque: true,
    largura: 1409,
    altura: 2000,
    ratio: 0.7045,
    blur:
      "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAAAQAgCdASoLABAAA4BaJZwAAxaghshescsAAP7l/74hjQU2l+ldwl6dZQ7Jl8s3mlN+H98VB4TRg6SRK1bdBGxFX+sCepEKAAA=",
  },
  {
    src: "/fotos/profissional-aline-estetoscopio.webp",
    alt: "Médica de jaleco branco e estetoscópio rosa, braços cruzados, sorrindo para a câmera",
    categoria: "Profissional",
    destaque: true,
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAABQAgCdASoLABAAA4BaJYwC7AYtBbLaEUNhC8AA/kCmmbj46RRKFhpWGwEmQKxMsC5W6Y+0p1OmmyL4zn5ooKESJZ7jjdcAJtz7sSyJmAtLkDTsiGd7B58AAAA=",
  },
  {
    src: "/fotos/profissional-aline-poltrona.webp",
    alt: "Médica de jaleco sentada numa poltrona de madeira, olhando para a câmera",
    categoria: "Profissional",
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoLABAAA4BaJZwAApuiCJa7IAD+0OvvTqly2CTkzfG2geVc8s5hYqozMVeqgwgsknzcLk3plMeaCAAA",
  },
  {
    src: "/fotos/profissional-aline-vestido-preto.webp",
    alt: "Mulher de vestido preto com a mão no queixo, olhando para a câmera",
    categoria: "Profissional",
    destaque: true,
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoLABAAA4BaJaQAAlxd28XZOAAA/NjICrBixRxClfqqOO1kgInG6Rb+tYONWxtpsvMHzfwA",
  },
  {
    src: "/fotos/profissional-aline-uniforme-azul.webp",
    alt: "Mulher de uniforme azul-claro e salto alto, em pé e de lado, braços cruzados",
    categoria: "Profissional",
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoLABAAA4BaJaQAAlJyzaoAAP7Q6++I5mTOWLOx5daHcneNHAF6K4hJb3zFLVf44hDjkWoUgAA=",
  },
  {
    src: "/fotos/profissional-diego-lendo.webp",
    alt: "Homem de terno azul lendo um livro à mesa de escritório, com luz verde ao fundo",
    categoria: "Profissional",
    destaque: true,
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAABQAgCdASoLABAAA4BaJZAC7H8AGBr1GvXkm0AA/veVA5vkonySnLbJYl9dUo3NliN39V6SmQ1qO1JHKSCEUB3fXHDa+KWRT14NuKwhHcRtPGiGknZiLo/CSAA=",
  },
  {
    src: "/fotos/profissional-diego-terno-preto.webp",
    alt: "Homem de terno preto e camisa vinho, de frente, ajeitando o paletó",
    categoria: "Profissional",
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAAAwAgCdASoLABAAA4BaJZwAAucQ0xTvyc0fAAD+wGJeZZT3i3tRWY8PRu97wLTyC89ZPp+HzMOa/Co5qedoEcQDzRNCnRo/kXwAAA==",
  },
  {
    src: "/fotos/profissional-diego-poltrona.webp",
    alt: "Homem de terno azul sentado na poltrona, mãos cruzadas, em estúdio claro",
    categoria: "Profissional",
    destaque: true,
    largura: 1333,
    altura: 2000,
    ratio: 0.6665,
    blur:
      "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoLABAAA4BaJZwC7AELGyv8MAAA/kEm1oDMGW4qWWSx+ynoOWinD6T1Rn7yVZ0wq92EPl4HOfUoA3RuXnqfCINueSUNoAAA",
  },
  {
    src: "/fotos/profissional-giuliano-sorriso.webp",
    alt: "Homem de blazer e óculos sorrindo diante do computador, num escritório de luz baixa",
    categoria: "Profissional",
    destaque: true,
    largura: 1600,
    altura: 2000,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADQAQCdASoNABAAA4BaJZQAAtoq3ShJAAD++RRkMPd6gzuJ7RPl5SJiN96/eTM/qHfWx7yi5O6pUnz4mP4nD6H6wnDovUjKqTo+rEr97TRRsOIAAAA=",
  },
  {
    src: "/fotos/profissional-giuliano-lendo.webp",
    alt: "Homem de blazer lendo um livro à mesa, em escritório escuro",
    categoria: "Profissional",
    largura: 1600,
    altura: 2000,
    ratio: 0.8,
    blur:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAABQAgCdASoNABAAA4BaJYgCsAYuRwLRybAwngAA/vhpUa+6qc0CsiL6ZibPAGz2Wbnt4ss51A104sGe1AcLVC066h/uoYAKSG02KKIKoddOabMhBgH9anhHxDxIAA==",
  },
  {
    src: "/fotos/profissional-giuliano-mesa.webp",
    alt: "Homem de blazer sentado à mesa com a mão no queixo, estantes de livros ao fundo",
    categoria: "Profissional",
    largura: 2000,
    altura: 1333,
    ratio: 1.5004,
    blur:
      "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoQAAsAA4BaJQBdgCFrtVEnp4AA/vlJuXupjj+2m7ktzayHBm7hdIoIOmYJVqPJafYK9b9TFvxcGd4qqT5EEKuDNsEiAAAA",
  },
];

export const categorias: Categoria[] = ["Casais", "Família", "Retratos", "Profissional"];

/** Fotos que vão para a galeria WebGL. */
export const destaques = fotos.filter((f) => f.destaque);

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
