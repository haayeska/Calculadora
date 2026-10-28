import { useEffect } from "react"

import Display from "./Display"
import Keypad from "./Keypad"
import { useCalculadora } from "../hooks/useCalculadora"

// Teclas do teclado físico que têm um nome diferente do botão
const ATALHOS: Record<string, string> = {
  "*": "×",
  x: "×",
  "/": "÷",
  ",": ".",
  Enter: "=",
  Backspace: "⌫",
  Escape: "C",
  Delete: "C",
}

const ACEITAS = /^[\d.+\-%()=]$/

function Card() {
  const { expressao, previa, erro, pressionar } = useCalculadora()

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const tecla = ATALHOS[e.key] ?? (ACEITAS.test(e.key) ? e.key : null)
      if (!tecla) return
      // Evita a busca rápida do Firefox no "/" e o clique duplo no botão focado com Enter
      e.preventDefault()
      pressionar(tecla)
    }

    window.addEventListener("keydown", aoTeclar)
    return () => window.removeEventListener("keydown", aoTeclar)
  }, [pressionar])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="sr-only">Calculadora</h1>

      <div className="grid w-full max-w-xs gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur">
        <Display expressao={expressao} previa={previa} erro={erro} />
        <Keypad onPressionar={pressionar} />
      </div>

      <p className="hidden text-center text-xs text-slate-400 sm:block">
        Dá para usar o teclado: números, + - * /, Enter para calcular, Backspace para apagar e Esc para limpar.
      </p>
    </main>
  )
}

export default Card
