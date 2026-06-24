import Button from './Button'

const buttons = [
  "C", "()", "%","÷",
  "7", "8", "9", "×",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "=", "="
];

function Keypad() {
 

  return (
    <div className="grid grid-cols-4 gap-2">
     {buttons.map((label, index) => (
        <Button key={index} label={label} />
      ))}
    </div>
  )
}

export default Keypad