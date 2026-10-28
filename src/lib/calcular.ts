// Calcula a expressão sem usar eval(): primeiro quebra o texto em pedaços (tokens)
// e depois resolve respeitando a precedência: parênteses, %, × e ÷, + e -.

type Token =
  | { tipo: "numero"; valor: number }
  | { tipo: "+" | "-" | "×" | "÷" | "%" | "(" | ")" }

export const OPERADORES = ["+", "-", "×", "÷"]

function tokenizar(expressao: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < expressao.length) {
    const c = expressao[i]

    if (/[\d.]/.test(c)) {
      let fim = i
      while (fim < expressao.length && /[\d.]/.test(expressao[fim])) fim++
      const texto = expressao.slice(i, fim)
      if (texto === "." || texto.split(".").length > 2) throw new Error("Número inválido")
      tokens.push({ tipo: "numero", valor: Number(texto) })
      i = fim
      continue
    }

    if ("+-×÷%()".includes(c)) {
      tokens.push({ tipo: c as "+" })
      i++
      continue
    }

    throw new Error(`Caractere inválido: ${c}`)
  }

  return tokens
}

function resolver(tokens: Token[]): number {
  let pos = 0
  const atual = () => tokens[pos]

  // soma := produto (("+" | "-") produto)*
  const soma = (): number => {
    let valor = produto()
    while (atual()?.tipo === "+" || atual()?.tipo === "-") {
      const op = tokens[pos++].tipo
      const direita = produto()
      valor = op === "+" ? valor + direita : valor - direita
    }
    return valor
  }

  // produto := sinal (("×" | "÷") sinal)*
  const produto = (): number => {
    let valor = sinal()
    while (atual()?.tipo === "×" || atual()?.tipo === "÷") {
      const op = tokens[pos++].tipo
      const direita = sinal()
      if (op === "÷" && direita === 0) throw new Error("Não dá para dividir por zero")
      valor = op === "×" ? valor * direita : valor / direita
    }
    return valor
  }

  // sinal := "-" sinal | primario "%"*
  const sinal = (): number => {
    if (atual()?.tipo === "-") {
      pos++
      return -sinal()
    }
    let valor = primario()
    while (atual()?.tipo === "%") {
      pos++
      valor = valor / 100
    }
    return valor
  }

  // primario := numero | "(" soma ")"
  const primario = (): number => {
    const token = atual()
    if (!token) throw new Error("Expressão incompleta")

    if (token.tipo === "numero") {
      pos++
      return token.valor
    }

    if (token.tipo === "(") {
      pos++
      const valor = soma()
      if (atual()?.tipo !== ")") throw new Error("Falta fechar o parêntese")
      pos++
      return valor
    }

    throw new Error("Expressão inválida")
  }

  const resultado = soma()
  if (pos < tokens.length) throw new Error("Expressão inválida")
  return resultado
}

export function calcular(expressao: string): number {
  // Fecha sozinho os parênteses que ficaram abertos, como as calculadoras de celular
  const abertos = (expressao.match(/\(/g) ?? []).length - (expressao.match(/\)/g) ?? []).length
  const completa = expressao + ")".repeat(Math.max(abertos, 0))

  const resultado = resolver(tokenizar(completa))
  if (!Number.isFinite(resultado)) throw new Error("Resultado grande demais")

  // Corrige imprecisões do ponto flutuante, como 0.1 + 0.2 = 0.30000000000000004
  return Number(resultado.toPrecision(12))
}

// Mostra com vírgula decimal e separador de milhar, no padrão brasileiro
export function formatar(expressao: string): string {
  return expressao.replace(/\d+(\.\d*)?/g, (numero) => {
    const [inteiro, decimal] = numero.split(".")
    const comMilhar = Number(inteiro).toLocaleString("pt-BR")
    return decimal === undefined ? comMilhar : `${comMilhar},${decimal}`
  })
}

export function paraTexto(valor: number): string {
  // Evita notação científica (1e+21, 1e-7), que o tokenizador não entende
  const texto = String(valor)
  if (!texto.includes("e")) return texto
  // toFixed() ainda usa notação científica acima de 1e21, por isso o BigInt
  return Math.abs(valor) >= 1 ? BigInt(Math.round(valor)).toString() : valor.toFixed(20).replace(/\.?0+$/, "")
}
