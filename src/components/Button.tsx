type ButtonProps = React.ComponentProps<"button"> & {
  label: string
  variante?: "numero" | "funcao" | "operador" | "igual"
}

const estilos = {
  numero: "bg-slate-700 hover:bg-slate-600 text-white",
  funcao: "bg-slate-600 hover:bg-slate-500 text-violet-200",
  operador: "bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 text-2xl",
  igual: "bg-violet-600 hover:bg-violet-500 text-white text-2xl",
}

function Button({ label, variante = "numero", className = "", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`h-16 cursor-pointer rounded-xl text-xl font-medium transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${estilos[variante]} ${className}`}
    >
      {label}
    </button>
  )
}

export default Button
