import { useEffect, useState } from "react";

export type Position = {
  x: number;
  y: number;
  uuid: string; // for key property
};

interface Props {
  value: number;
  pos: Position;
}

function PlusEffect({ value, pos }: Props) {
  const [opacity, setOpacity] = useState(1);
  const [downOffset, setDownOffset] = useState(0);

  const browserMinUpdate = 40;

  useEffect(() => {
    let timer = 0;
    const interval = setInterval(() => {
      timer += browserMinUpdate;
      setOpacity(1 / timer * 100);
      setDownOffset(-timer / 20);
    }, browserMinUpdate);

    return () => clearInterval(interval);
  }, [setOpacity]);

  return (
    <p
      className="plus-effect"
      style={{
        left: pos.x + "px",
        top: pos.y - downOffset + "px",
        opacity: opacity
      }}
    >
      +{value}
    </p>
  );
}

export default PlusEffect;
