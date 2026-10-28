import { useCallback, useState } from "react"
import { calcular, OPERADORES, paraTexto } from "../lib/calcular"

type Estado = {
  expressao: string
  // true logo depois do "=": o próximo número começa uma conta nova
  calculado: boolean
  erro: string | null
}

const INICIAL: Estado = { expressao: "", calculado: false, erro: null }

const terminaEmValor = (texto: string) => /[\d)%]$/.test(texto)

function aplicar(estado: Estado, tecla: string): Estado {
  const { expressao, calculado } = estado
  const ultimo = expressao.at(-1) ?? ""

  if (tecla === "C") return INICIAL

  if (tecla === "⌫") {
    if (calculado) return INICIAL
    return { ...estado, expressao: expressao.slice(0, -1), erro: null }
  }

  if (tecla === "=") {
    if (!expressao) return estado
    try {
      return { expressao: paraTexto(calcular(expressao)), calculado: true, erro: null }
    } catch (e) {
      return { ...estado, erro: (e as Error).message }
    }
  }

  // Daqui para baixo, a tecla muda a expressão
  let base = expressao
  if (calculado && /^[\d.]$/.test(tecla)) base = ""
  const proximo = (texto: string): Estado => ({ expressao: texto, calculado: false, erro: null })

  if (/^\d$/.test(tecla)) {
    if (/[)%]$/.test(base)) return proximo(`${base}×${tecla}`)
    // Evita zeros à esquerda, como 007
    if (/(^|[^\d.])0$/.test(base)) return proximo(base.slice(0, -1) + tecla)
    return proximo(base + tecla)
  }

  if (tecla === ".") {
    const numeroAtual = base.match(/[\d.]*$/)?.[0] ?? ""
    if (numeroAtual.includes(".")) return estado
    if (/[)%]$/.test(base)) return proximo(`${base}×0.`)
    return proximo(base + (numeroAtual ? "." : "0."))
  }

  if (OPERADORES.includes(tecla)) {
    if (!base) return tecla === "-" ? proximo("-") : estado
    if (base === "-") return estado
    if (ultimo === "(") return tecla === "-" ? proximo(base + tecla) : estado
    // Trocar de operador: 5+ seguido de × vira 5×
    if (OPERADORES.includes(ultimo)) return proximo(base.slice(0, -1) + tecla)
    if (ultimo === ".") return proximo(base + "0" + tecla)
    return proximo(base + tecla)
  }

  if (tecla === "%") {
    return terminaEmValor(base) ? proximo(base + "%") : estado
  }

  if (tecla === "(" || tecla === ")" || tecla === "()") {
    const abertos = (base.match(/\(/g) ?? []).length - (base.match(/\)/g) ?? []).length
    // No botão "()" a calculadora decide: fecha se der, senão abre
    const fechar = tecla === ")" || (tecla === "()" && abertos > 0 && terminaEmValor(base))

    if (fechar) {
      return abertos > 0 && terminaEmValor(base) ? proximo(base + ")") : estado
    }
    return proximo(base + (terminaEmValor(base) ? "×(" : "("))
  }

  return estado
}

export function useCalculadora() {
  const [estado, setEstado] = useState<Estado>(INICIAL)

  const pressionar = useCallback((tecla: string) => {
    setEstado((atual) => aplicar(atual, tecla))
  }, [])

  // Prévia do resultado enquanto a conta é digitada (só quando há uma operação)
  let previa: number | null = null
  if (!estado.calculado && /[+\-×÷%]/.test(estado.expressao.slice(1))) {
    try {
      previa = calcular(estado.expressao)
    } catch {
      previa = null
    }
  }

  return { ...estado, previa, pressionar }
}
