import ShopItem from "./ShopItem";
import {
  multitapTemplate,
  autotapTemplate,
  crittapTemplate,
  ItemType,
  energyRestoreTemplate,
  maxEnergyTemplate,
  EnergyRestoreValues,
} from "../Templates";
import { useState } from "react";

interface Props {
  balance: number;
  multitapLevel: number;
  autotapLevel: number;
  crittapLevel: number;
  energyRestoreLevel: number;
  maxEnergyLevel: number;
  onPurchaseAbort: (message: string) => void;
  onBalanceChange: (value: number) => void;
  onStatChange: (type: ItemType, vlaue: number) => void;
}

function Shop({
  balance,
  multitapLevel,
  autotapLevel,
  crittapLevel,
  energyRestoreLevel,
  maxEnergyLevel,
  onPurchaseAbort,
  onBalanceChange,
  onStatChange,
}: Props) {
  const [nextTapGain, setNextTapGain] = useState(
    multitapTemplate.baseValue * (multitapLevel + 1)
  );
  const [nextAutotapRate, setNextAutotapRate] = useState(
    autotapTemplate.baseValue / (autotapLevel + 1)
  );
  const [nextCritChance, setNextCritChance] = useState(
    crittapTemplate.baseValue * (crittapLevel + 1)
  );
  const [nextEnRestore, setNextEnRestore] = useState(
    energyRestoreLevel === 0 ? EnergyRestoreValues.first : EnergyRestoreValues.second
  );
  const [nextMaxEnergy, setNextMaxEnergy] = useState(
    maxEnergyTemplate.baseValue + (maxEnergyLevel + 1) * 500
  );

  const handleItemPurchase = (type: ItemType, price: number, lvlLimit: number) => {
    if (balance < price) {
      onPurchaseAbort("Not enough money!");
      return;
    }

    const checkForLevelLimit = (lvl: number): boolean => {
      if (lvl + 1 > lvlLimit && lvlLimit > 0) {
        onPurchaseAbort("You have reached the limit of this upgrade");
        return false;
      }
      return true;
    }

    switch (type) {
      case ItemType.multitap:
        if (!checkForLevelLimit(multitapLevel)) return;
        setNextTapGain(multitapTemplate.baseValue + (multitapLevel + 1));
        onStatChange(
          ItemType.multitap,
          multitapTemplate.baseValue + multitapLevel
        );
        onBalanceChange(balance - price);
        break;
      case ItemType.autotap:
        if (!checkForLevelLimit(autotapLevel)) return;
        setNextAutotapRate(autotapTemplate.baseValue / (autotapLevel + 2));
        onStatChange(
          ItemType.autotap,
          autotapTemplate.baseValue / (autotapLevel + 1)
        );
        onBalanceChange(balance - price);
        break;
      case ItemType.crittap:
        if (!checkForLevelLimit(crittapLevel)) return;
        setNextCritChance(crittapTemplate.baseValue * (crittapLevel + 1));
        onStatChange(
          ItemType.crittap,
          crittapTemplate.baseValue * (crittapLevel + 1)
        );
        onBalanceChange(balance - price);
        break;
      case ItemType.energyRestore:
        if (!checkForLevelLimit(energyRestoreLevel)) return;
        setNextEnRestore(
          EnergyRestoreValues.second
        );
        onStatChange(
          ItemType.energyRestore,
          energyRestoreLevel === 0 ? EnergyRestoreValues.first : EnergyRestoreValues.second
        );
        onBalanceChange(balance - price);
        break;
      case ItemType.maxEnergy:
        if (!checkForLevelLimit(maxEnergyLevel)) return;
        setNextMaxEnergy(maxEnergyTemplate.baseValue + (maxEnergyLevel + 2) * 500);
        onStatChange(
          ItemType.maxEnergy,
          maxEnergyTemplate.baseValue + (maxEnergyLevel + 1) * 500
        );
        onBalanceChange(balance - price);
        break;
    }
  };

  const calcItemPrice = (basePrice: number, level: number, power: number) =>
    basePrice * Math.floor((Math.pow(level + 1, power) / 100) * 100);

  return (
    <>
      <div className="shop">
        <ShopItem
          type={ItemType.multitap}
          itemName={`Multitap ${multitapLevel + 1}`}
          itemDesc={`Every tap now will gain ${nextTapGain} points`}
          itemPrice={calcItemPrice(
            multitapTemplate.basePrice,
            multitapLevel,
            1.5
          )}
          itemLvlLimit={0}
          onPurchase={handleItemPurchase}
        />
        <ShopItem
          type={ItemType.autotap}
          itemName={`Autotap ${autotapLevel + 1}`}
          itemDesc={`Automatically get a point every ${nextAutotapRate / 1000
            } seconds`}
          itemPrice={calcItemPrice(
            autotapTemplate.basePrice,
            autotapLevel,
            1.3
          )}
          itemLvlLimit={0}
          onPurchase={handleItemPurchase}
        />
        <ShopItem
          type={ItemType.crittap}
          itemName={`Crittap ${crittapLevel + 1}`}
          itemDesc={`Every tap has ${nextCritChance}% chance to gain 5x the normal value`}
          itemPrice={calcItemPrice(crittapTemplate.basePrice, crittapLevel, 2)}
          onPurchase={handleItemPurchase}
          itemLvlLimit={10}
        />
        <ShopItem
          type={ItemType.energyRestore}
          itemName={`Energy Restore ${energyRestoreLevel + 1}`}
          itemDesc={`Energy will restore once every ${nextEnRestore / 1000
            } seconds`}
          itemPrice={calcItemPrice(energyRestoreTemplate.basePrice, energyRestoreLevel, 5)}
          onPurchase={handleItemPurchase}
          itemLvlLimit={3}
        />
        <ShopItem
          type={ItemType.maxEnergy}
          itemName={`Maximum Energy ${maxEnergyLevel + 1}`}
          itemDesc={`Your maximum energy amount will increase to ${nextMaxEnergy}`}
          itemPrice={calcItemPrice(maxEnergyTemplate.basePrice, maxEnergyLevel, 2)}
          onPurchase={handleItemPurchase}
          itemLvlLimit={5}
        />
        <ShopItem
          type={ItemType.crittap}
          itemName={`blank`}
          itemDesc={``}
          itemPrice={0}
          onPurchase={() => console.log("not implemented")}
          itemLvlLimit={0}
        />
        <div className="shop-balance">
          <p className="text-center">${balance}</p>
        </div>
      </div>
    </>
  );
}

export default Shop;
