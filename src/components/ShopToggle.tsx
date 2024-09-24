import shopIcon from "../assets/shopico.png";

interface Props {
  onShopToggle: () => void;
}

function ShopToggle({ onShopToggle }: Props) {
  return (
    <>
      <img
        src={shopIcon}
        alt="shop-toggle"
        className="shop-toggle"
        onClick={() => onShopToggle()}
      />
    </>
  );
}

export default ShopToggle;
