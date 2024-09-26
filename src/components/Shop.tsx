import ShopItem from "./ShopItem";
import {
  multitapTemplate,
  autotapTemplate,
  crittapTemplate,
  ItemType,
  energyRestoreTemplate,
  maxEnergyTemplate,
} from "../Templates";
import { useState } from "react";

interface Props {
  balance: number;
  multitapLevel: number;
  autotapLevel: number;
  crittapLevel: number;
  energyRestoreLevel: number;
  maxEnergyLevel: number;
  onPurchaseAbort: () => void;
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
    energyRestoreTemplate.baseValue / (energyRestoreLevel + 1)
  );
  const [nextMaxEnergy, setNextMaxEnergy] = useState(
    maxEnergyTemplate.baseValue + maxEnergyLevel
  );

  const handleItemPurchase = (type: ItemType, price: number) => {
    if (balance < price) {
      onPurchaseAbort();
      return;
    }

    switch (type) {
      case ItemType.multitap:
        setNextTapGain(multitapTemplate.baseValue + (multitapLevel + 1));
        onStatChange(
          ItemType.multitap,
          multitapTemplate.baseValue + multitapLevel
        );
        onBalanceChange(balance - price);
        break;
      case ItemType.autotap:
        setNextAutotapRate(autotapTemplate.baseValue / (autotapLevel + 2));
        onStatChange(
          ItemType.autotap,
          autotapTemplate.baseValue / (autotapLevel + 1)
        );
        onBalanceChange(balance - price);
        break;
      case ItemType.crittap:
        setNextCritChance(crittapTemplate.baseValue * (crittapLevel + 1));
        onStatChange(
          ItemType.crittap,
          crittapTemplate.baseValue * (crittapLevel + 1)
        );
        onBalanceChange(balance - price);
        break;
      case ItemType.energyRestore:
        setNextEnRestore(
          energyRestoreTemplate.baseValue / (energyRestoreLevel + 1)
        );
        onStatChange(
          ItemType.energyRestore,
          energyRestoreTemplate.baseValue / (energyRestoreLevel + 1)
        );
        onBalanceChange(balance - price);
        break;
      case ItemType.maxEnergy:
        setNextMaxEnergy(maxEnergyTemplate.baseValue + maxEnergyLevel * 500);
        onStatChange(
          ItemType.maxEnergy,
          maxEnergyTemplate.baseValue + maxEnergyLevel * 500
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
          onPurchase={handleItemPurchase}
        />
        <ShopItem
          type={ItemType.autotap}
          itemName={`Autotap ${autotapLevel + 1}`}
          itemDesc={`Automatically get a point every ${
            nextAutotapRate / 1000
          } seconds`}
          itemPrice={calcItemPrice(
            autotapTemplate.basePrice,
            autotapLevel,
            1.3
          )}
          onPurchase={handleItemPurchase}
        />
        <ShopItem
          type={ItemType.crittap}
          itemName={`Crittap ${crittapLevel + 1}`}
          itemDesc={`Every tap has ${nextCritChance}% chance to gain 5x the normal value`}
          itemPrice={calcItemPrice(crittapTemplate.basePrice, crittapLevel, 2)}
          onPurchase={handleItemPurchase}
        />
        <ShopItem
          type={ItemType.energyRestore}
          itemName={`Energy Restore ${energyRestoreLevel + 1}`}
          itemDesc={`Energy will restore once every ${
            nextEnRestore / 1000
          } seconds`}
          itemPrice={energyRestoreTemplate.basePrice}
          onPurchase={handleItemPurchase}
        />
        <ShopItem
          type={ItemType.maxEnergy}
          itemName={`Maximum Energy ${maxEnergyLevel + 1}`}
          itemDesc={`Your maximum energy amount will increase to ${nextMaxEnergy}`}
          itemPrice={maxEnergyTemplate.basePrice}
          onPurchase={handleItemPurchase}
        />
        <ShopItem
          type={ItemType.crittap}
          itemName={`blank`}
          itemDesc={``}
          itemPrice={0}
          onPurchase={() => console.log("not implemented")}
        />
        <div className="shop-balance">
          <p className="text-center">${balance}</p>
        </div>
      </div>
    </>
  );
}

export default Shop;
