/**
 * Etiqueta de seção — a marcação de claquete: "CENA 02 · SOBRE".
 * Padroniza o cabeçalho de toda seção sem repetir a marcação.
 */
export default function Eyebrow({ cena, children }: { cena: string; children: string }) {
  return (
    <p data-reveal className="mb-6 flex items-center gap-3 font-hud text-[10px] uppercase tracking-hud text-film-grey">
      <span className="text-film-400">{cena}</span>
      <span className="h-px w-6 bg-film-line" />
      {children}
    </p>
  );
}
