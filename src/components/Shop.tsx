import ShopItem from "./ShopItem";
import {
  multitapTemplate,
  autotapTemplate,
  crittapTemplate,
  ItemType,
} from "../Templates";
import { useState } from "react";

interface Props {
  balance: number;
  onPurchaseAbort: () => void;
}

function Shop({ balance, onPurchaseAbort }: Props) {
  const [multitapLevel, setMultitapLevel] = useState(0);
  const [autotapLevel, setAutotapLevel] = useState(0);
  const [crittapLevel, setCrittapLevel] = useState(0);

  const nextTapGain = multitapTemplate.baseValue * (multitapLevel + 1);
  const nextAutotapRate = autotapTemplate.baseValue / (autotapLevel + 1);
  const nextCritChance = crittapTemplate.baseValue * (crittapLevel + 1);

  const handleItemPurchase = (type: ItemType, price: number) => {
    if (balance < price) {
      onPurchaseAbort();
      return;
    }

    switch (type) {
      case ItemType.multitap:
        console.log("purchased multitap");
        break;
      case ItemType.autotap:
        console.log("purchased autotap");
        break;
      case ItemType.crittap:
        console.log("purchased crittap");
        break;
    }
  };

  return (
    <>
      <div className="shop">
        <ShopItem
          type={ItemType.multitap}
          itemName={`Multitap ${multitapLevel + 1}`}
          itemDesc={`Every tap now will gain ${nextTapGain} points`}
          itemPrice={multitapTemplate.basePrice * (multitapLevel + 1)}
          onPurchase={handleItemPurchase}
        />
        <ShopItem
          type={ItemType.autotap}
          itemName={`Autotap ${autotapLevel + 1}`}
          itemDesc={`Automatically get a point every ${nextAutotapRate / 1000} seconds`}
          itemPrice={autotapTemplate.basePrice * (autotapLevel + 1)}
          onPurchase={handleItemPurchase}
        />
        <ShopItem
          type={ItemType.crittap}
          itemName={`Crittap ${crittapLevel + 1}`}
          itemDesc={`Every tap has ${nextCritChance}% chance to gain 5x the normal value`}
          itemPrice={autotapTemplate.basePrice * (autotapLevel + 1)}
          onPurchase={handleItemPurchase}
        />
      </div>
    </>
  );
}

export default Shop;
