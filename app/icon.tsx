import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Ícone gerado, não um arquivo estático — não havia `public/` no projeto e
 * o `<link rel="icon">` manual em `layout.tsx` apontava para um arquivo
 * inexistente (404 em toda carga de página). A convenção `app/icon.tsx` do
 * Next é auto-detectada; ele injeta a tag sozinho.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            border: "2px solid #EDEDE8",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#FF3D00",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
