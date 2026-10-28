import Button from "./Button"

type Tecla = {
  label: string
  variante?: "numero" | "funcao" | "operador" | "igual"
  nome?: string
}

const teclas: Tecla[] = [
  { label: "C", variante: "funcao", nome: "Limpar tudo" },
  { label: "()", variante: "funcao", nome: "Parênteses" },
  { label: "%", variante: "funcao", nome: "Porcentagem" },
  { label: "÷", variante: "operador", nome: "Dividir" },
  { label: "7" }, { label: "8" }, { label: "9" },
  { label: "×", variante: "operador", nome: "Multiplicar" },
  { label: "4" }, { label: "5" }, { label: "6" },
  { label: "-", variante: "operador", nome: "Subtrair" },
  { label: "1" }, { label: "2" }, { label: "3" },
  { label: "+", variante: "operador", nome: "Somar" },
  { label: "0" },
  { label: ".", nome: "Vírgula" },
  { label: "⌫", variante: "funcao", nome: "Apagar" },
  { label: "=", variante: "igual", nome: "Calcular" },
]

type KeypadProps = {
  onPressionar: (tecla: string) => void
}

function Keypad({ onPressionar }: KeypadProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {teclas.map((tecla) => (
        <Button
          key={tecla.label}
          label={tecla.label === "." ? "," : tecla.label}
          aria-label={tecla.nome}
          variante={tecla.variante}
          onClick={() => onPressionar(tecla.label)}
        />
      ))}
    </div>
  )
}

export default Keypad
