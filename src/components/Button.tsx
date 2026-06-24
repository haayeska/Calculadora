type ButtonProps = React.ComponentProps <'button'> & {
  label: string;
};  


function Button({label, ...props} : ButtonProps ) {
 

  return (
    <button {...props} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {label}
    </button>
  )
}

export default Button