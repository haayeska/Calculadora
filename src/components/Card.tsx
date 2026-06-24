import Display from './Display'
import Keypad from './Keypad'

function Card() {
 

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-80 grid gap-4"> 
       <Display />
       <Keypad />   
      </div>
    </div>
  )
}

export default Card
