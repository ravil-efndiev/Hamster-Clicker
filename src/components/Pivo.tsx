import { useState } from "react";
import logo from "../assets/hamster-logo.png";

interface Props {
  counter: number;
  active: boolean;
  onTap: () => void;
}

function Pivo({ onTap, counter, active }: Props) {
  const handleTap = () => {
    onTap();
  };

  return (
    <>
      <h2 className="counter">{counter}</h2>
      <div className={`pivo ${!active && "disabled"}`} onClick={handleTap}>
        <img src={logo} alt="Pivo" className="pivo-image" />
      </div>
    </>
  );
}

export default Pivo;
