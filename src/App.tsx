import { useEffect, useState, MouseEvent } from "react";
import "./App.css";
import Hamster from "./components/Hamster";
import Shop from "./components/Shop";
import ShopToggle from "./components/ShopToggle";
import Cheats from "./components/Cheats";
import StatsDisplay from "./components/StatsDisplay";
import PlusEffect, { Position } from "./components/PlusEffect";
import { ItemType } from "./Templates";

function App() {
  const [balance, setBalance] = useState(0);
  const [shopActive, setShopActive] = useState(false);

  const [multitapLevel, setMultitapLevel] = useState(0);
  const [autotapLevel, setAutotapLevel] = useState(0);
  const [crittapLevel, setCrittapLevel] = useState(0);

  const [tapGain, setTapGain] = useState(1);
  const [autotapRate, setAutotapRate] = useState(0);
  const [critChance, setCritChance] = useState(0);

  const [effectPositions, setEffectPositions] = useState<Position[]>([]);

  const enableCheats = false;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!autotapRate) return;
      setBalance((prevBalance) => prevBalance + 1);
    }, autotapRate);

    return () => clearInterval(interval);
  }, [autotapRate]);

  const handleStatChange = (type: ItemType, value: number) => {
    switch (type) {
      case ItemType.multitap:
        setTapGain(value);
        setMultitapLevel((prevLvl) => prevLvl + 1);
        break;
      case ItemType.autotap:
        setAutotapRate(value);
        setAutotapLevel((prevLvl) => prevLvl + 1);
        break;
      case ItemType.crittap:
        setCritChance(value);
        setCrittapLevel((prevLvl) => prevLvl + 1);
        break;
    }
  };

  const spawnPlusEffect = (pos: Position) => {
    setEffectPositions([...effectPositions, pos]);

    setTimeout(() => {
      setEffectPositions((prev) => 
        prev.filter((prevPos) => prevPos !== pos)
      );
    }, 1000);
  };

  const handleTap = (event: MouseEvent) => {
    setBalance((prevBalance) => prevBalance + tapGain);
    spawnPlusEffect({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      {enableCheats && (
        <Cheats onCheatApply={() => setBalance((prev) => prev + 1000)} />
      )}
      <ShopToggle onShopToggle={() => setShopActive(!shopActive)} />
      <StatsDisplay
        multitapLvl={multitapLevel}
        autotapLvl={autotapLevel}
        crittapLvl={crittapLevel}
        tapGain={tapGain}
        autotapRate={autotapRate}
        critChance={critChance}
      />
      <Hamster onTap={handleTap} counter={balance} active={!shopActive} />
      {effectPositions.map((pos: Position, index) => (
        <PlusEffect value={tapGain} pos={pos} key={index} />
      ))}
      <div className="shop-wrapper">
        {shopActive && (
          <Shop
            multitapLevel={multitapLevel}
            autotapLevel={autotapLevel}
            crittapLevel={crittapLevel}
            balance={balance}
            onPurchaseAbort={() => alert("not enough money")}
            onBalanceChange={(value) => setBalance(value)}
            onStatChange={handleStatChange}
          />
        )}
      </div>
    </>
  );
}

export default App;
