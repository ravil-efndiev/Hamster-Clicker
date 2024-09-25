export type Position = {
  x: number;
  y: number;
};

interface Props {
  value: number;
  pos: Position;
}

function PlusEffect({ value, pos }: Props) {
  return (
    <p
      className="plus-effect"
      style={{ left: pos.x + "px", top: pos.y + "px" }}
    >
      +{value}
    </p>
  );
}

export default PlusEffect;
