import { currencyFormatterUSD } from "../../utils/utils";
import s from "./focusedBlockData.module.scss";
import { useEffect, useState } from "react";

/** Renders a floating card with Date and Reward of the focused block */
const FocusedBlockData = ({
  reward,
  date,
  backgroundColor = "#19243f",
}: {
  reward?: number;
  date?: string;
  backgroundColor?: string;
}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const cardWidth = 250;
  const getCardPosition = (e: MouseEvent) => {
    const offsetX = 50;
    let newX = e.clientX + offsetX;
    if (newX + cardWidth > window.innerWidth) {
      newX = e.clientX - cardWidth - offsetX;
    }
    return { x: newX, y: e.clientY };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition(getCardPosition(e));
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!reward) return null;

  return (
    <div
      id="focusedBlockDataContainer"
      className={s.focusedBlockDataContainer}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        pointerEvents: "none",
        backgroundColor,
      }}
    >
      <p className={s.date}>{date}</p>
      <p className={s.reward}>{currencyFormatterUSD.format(reward || 0)}</p>
    </div>
  );
};

export default FocusedBlockData;
