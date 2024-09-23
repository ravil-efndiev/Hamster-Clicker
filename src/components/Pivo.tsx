import { useState } from "react";
import logo from "../assets/pivo.png" 

interface Props {
  tapGain: number;  
  onCounterChange: (value: number) => void;
}

function Pivo({tapGain, onCounterChange}: Props) {
  const [counter, setCounter] = useState(0);

  const handlePivoClick = () => {
    setCounter(counter + tapGain);
    onCounterChange(counter);
  }

  return (
    <>
      <h2 className="counter">{counter}</h2>
      <div className="pivo" onClick={handlePivoClick}>
        <img src={logo} alt="Pivo" className="pivo-image" />
      </div>
    </>
  );
}

export default Pivo
