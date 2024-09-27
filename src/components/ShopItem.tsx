import { ItemType } from "../Templates";

interface Props {
  type: ItemType;
  itemName: string;
  itemDesc: string;
  itemPrice: number;
  itemLvlLimit: number;
  onPurchase: (type: ItemType, price: number, lvlLimit: number) => void;
}

function ShopItem(props: Props) {
  return (
    <>
      <div
        className="card shop-item text-center"
        onClick={() => props.onPurchase(props.type, props.itemPrice, props.itemLvlLimit)}
      >
        <div className="card-body">
          <h5 className="card-title shop-item__title">{props.itemName}</h5>
          <p className="card-text shop-item__text">{props.itemDesc}</p>
          <p className="card-text shop-item__price">${props.itemPrice}</p>
        </div>
      </div>
    </>
  );
}

export default ShopItem;
