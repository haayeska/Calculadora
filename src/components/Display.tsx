import { formatar } from "../lib/calcular"

type DisplayProps = {
  expressao: string
  previa: number | null
  erro: string | null
}

function Display({ expressao, previa, erro }: DisplayProps) {
  const texto = expressao ? formatar(expressao) : "0"

  return (
    <div className="flex min-h-28 flex-col items-end justify-end gap-1 rounded-xl bg-slate-950/60 px-4 py-3">
      <output
        aria-live="polite"
        className={`w-full break-all text-right font-light ${texto.length > 12 ? "text-3xl" : "text-5xl"}`}
      >
        {texto}
      </output>

      <p className={`h-6 text-right text-lg ${erro ? "text-red-400" : "text-slate-400"}`}>
        {erro ?? (previa !== null ? `= ${formatar(String(previa))}` : "")}
      </p>
    </div>
  )
}

export default Display
