import { useEffect, useState } from "react";
import "./App.css";
import Pivo from "./components/Pivo";
import Shop from "./components/Shop";
import ShopToggle from "./components/ShopToggle";
import Cheats from "./components/Cheats";
import StatsDisplay from "./components/StatsDisplay";
import { ItemType } from "./Templates";

function App() {
  const [balance, setBalance] = useState(0);
  const [shopActive, setShopActive] = useState(false);

  const [multitapLevel, setMultitapLevel] = useState(0);
  const [autotapLevel, setAutotapLevel] = useState(0);
  const [crittapLevel, setCrittapLevel] = useState(0);

  const [stats, setStats] = useState({
    tapGain: 1,
    autotapRate: 0,
    critChance: 0,
  });

  const browserUpdateMs = 40;
  const enableCheats = false;

  useEffect(() => {
    let timer = 0;
    const interval = setInterval(() => {
      if (!stats.autotapRate) return;
      timer += browserUpdateMs;
      if (timer >= stats.autotapRate) {
        setBalance((prevBalance) => prevBalance + 1);
        timer = 0;
      }
    }, browserUpdateMs);

    return () => clearInterval(interval);
  }, []);

  const handleStatChange = (type: ItemType, value: number) => {
    switch (type) {
      case ItemType.multitap:
        setStats((prev) => {
          const newStats = prev;
          newStats.tapGain = value;
          return newStats;
        });
        setMultitapLevel((prevLvl) => prevLvl + 1);
        break;
      case ItemType.autotap:
        setStats((prev) => {
          const newStats = prev;
          newStats.autotapRate = value;
          return newStats;
        });
        setAutotapLevel((prevLvl) => prevLvl + 1);
        break;
      case ItemType.crittap:
        setStats((prev) => {
          const newStats = prev;
          newStats.critChance = value;
          return newStats;
        });
        setCrittapLevel((prevLvl) => prevLvl + 1);
        break;
    }
  };

  const handleBalanceChange = (value: number) => {
    setBalance(value);
  };

  const handleTap = () => {
    setBalance((prevBalance) => prevBalance + stats.tapGain);
  };

  const handleShopToggle = () => {
    setShopActive(!shopActive);
  };

  return (
    <>
      {enableCheats && (
        <Cheats onCheatApply={() => setBalance((prev) => prev + 1000)} />
      )}
      <ShopToggle onShopToggle={handleShopToggle} />
      <StatsDisplay
        multitapLvl={multitapLevel}
        autotapLvl={autotapLevel}
        crittapLvl={crittapLevel}
        tapGain={stats.tapGain}
        autotapRate={stats.autotapRate}
        critChance={stats.critChance}
      />
      <Pivo onTap={handleTap} counter={balance} active={!shopActive} />
      <div className="shop-wrapper">
        {shopActive && (
          <Shop
            multitapLevel={multitapLevel}
            autotapLevel={autotapLevel}
            crittapLevel={crittapLevel}
            balance={balance}
            onPurchaseAbort={() => alert("not enough money")}
            onBalanceChange={handleBalanceChange}
            onStatChange={handleStatChange}
          />
        )}
      </div>
    </>
  );
}

export default App;
