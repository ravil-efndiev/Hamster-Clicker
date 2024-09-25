import logo from "../assets/hamster-logo.png";
import { MouseEvent } from "react";

interface Props {
  counter: number;
  active: boolean;
  onTap: (event: MouseEvent) => void;
}

function Hamster({ onTap, counter, active }: Props) {
  const handleTap = (event: MouseEvent) => {
    onTap(event);
  };

  return (
    <>
      <h2 className="counter">{counter}</h2>
      <div className={`pivo ${!active && "disabled"}`} onMouseDown={handleTap}>
        <img src={logo} alt="Hamster" className="pivo-image" />
      </div>
    </>
  );
}

export default Hamster;
