import { useState } from "react";
import "./App.css";
import Pivo from "./components/Pivo";
import Shop from "./components/Shop";

function App() {
  const stats = {
    tapGain: 1,
  };

  const [balance, setBalance] = useState(0);

  const handleCounterChange = (value: number) => {
    setBalance(value);
  };

  return (
    <>
      <Shop
        balance={balance}
        onPurchaseAbort={() => alert("not enough money")}
      />
      <Pivo tapGain={stats.tapGain} onCounterChange={handleCounterChange} />
    </>
  );
}

export default App;
