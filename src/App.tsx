import { useEffect, useState, MouseEvent } from "react";
import "./App.css";
import Hamster from "./components/Hamster";
import Shop from "./components/Shop";
import ShopToggle from "./components/ShopToggle";
import Cheats from "./components/Cheats";
import StatsDisplay from "./components/StatsDisplay";
import PlusEffect, { Position } from "./components/PlusEffect";
import { energyRestoreTemplate, ItemType } from "./Templates";
import { v4 as uuidv4 } from "uuid";

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

  const [energy, setEnergy] = useState(1000);
  const [energyRestoreRate, setEnergyRestoreRate] = useState(1000);
  const [energyRestoreLevel, setEnergyRestoreLevel] = useState(0);
  const [maxEnergy, setMaxEnergy] = useState(1000);
  const [maxEnergyLevel, setMaxEnergyLevel] = useState(0);

  const enableCheats = true;

  useEffect(() => {
    const arInterval = setInterval(() => {
      if (!autotapRate) return;
      setBalance((prevBalance) => prevBalance + 1);
    }, autotapRate);

    const energyInterval = setInterval(() => {
      if (energy < maxEnergy) setEnergy((prevEnergy) => prevEnergy + 1);
    }, energyRestoreRate);

    return () => {
      clearInterval(arInterval);
      clearInterval(energyInterval);
    };
  }, [
    autotapRate,
    energyRestoreRate,
    maxEnergy,
    energy,
    setEnergyRestoreRate,
    setEnergy,
    setBalance,
  ]);

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
      case ItemType.energyRestore:
        setEnergyRestoreRate(value);
        setEnergyRestoreLevel((prevLvl) => prevLvl + 1);
        break;
      case ItemType.maxEnergy:
        setMaxEnergy(value);
        setEnergy(value);
        setMaxEnergyLevel((prevLvl) => prevLvl + 1);
        break;
    }
  };

  const spawnPlusEffect = (pos: Position) => {
    setEffectPositions([...effectPositions, pos]);

    setTimeout(() => {
      setEffectPositions((prev) => prev.filter((prevPos) => prevPos !== pos));
    }, 1000);
  };

  const handleTap = (event: MouseEvent) => {
    if (energy - tapGain < 0) return;
    setEnergy((prevEnergy) => prevEnergy - tapGain);
    spawnPlusEffect({ x: event.clientX, y: event.clientY, uuid: uuidv4() });
    setBalance((prevBalance) => prevBalance + tapGain);
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
        energy={energy}
      />
      <Hamster onTap={handleTap} counter={balance} active={!shopActive} />
      {effectPositions.map((pos: Position) => (
        <PlusEffect value={tapGain} pos={pos} key={pos.uuid} />
      ))}
      <div className="shop-wrapper">
        {shopActive && (
          <Shop
            multitapLevel={multitapLevel}
            autotapLevel={autotapLevel}
            crittapLevel={crittapLevel}
            energyRestoreLevel={energyRestoreLevel}
            maxEnergyLevel={maxEnergyLevel}
            balance={balance}
            onPurchaseAbort={(message) => alert(message)}
            onBalanceChange={(value) => setBalance(value)}
            onStatChange={handleStatChange}
          />
        )}
      </div>
    </>
  );
}

export default App;
