import { Skeleton } from "@mui/material";
import { currencyFormatterUSD } from "../../utils/utils";
import s from "./additionalInfo.module.scss";
import { useAppSelector } from "../../app/hooks";

/** Renders additional info about the data like average, min and max block rewards */
const AdditionalInfo = () => {
  /* GET PRIMARY COLOR */
  /* BLOCKS */
  const { value: blocks } = useAppSelector((state) => state.blocks);
  /* THEME */
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const color = isDarkMode ? "#00ffff" : "#000";

  const smallSkeleton = (
    <Skeleton variant="text" width="50px" sx={{ display: "inline-block" }} />
  );

  /** Adds the same style to a given amount */
  const formatAmount = (amount: number, isCurrency = true) => {
    return (
      <span style={{ fontWeight: 700, fontSize: 18, color }}>
        {isCurrency ? currencyFormatterUSD.format(amount) : amount}
      </span>
    );
  };

  return (
    <div className={s.additionalInfo}>
      <h2>Estadísticas adicionales:</h2>
      <ul className={s.additionalInfoList}>
        <li>
          Total de bloques:{" "}
          {blocks?.length ? formatAmount(blocks.length, false) : smallSkeleton}
        </li>
        <li>
          Promedio diario:{" "}
          {blocks?.length
            ? formatAmount(
                blocks.reduce((a, b) => a + b.reward, 0) / blocks.length
              )
            : smallSkeleton}
        </li>
        <li>
          Mínima:{" "}
          {blocks?.length
            ? formatAmount(Math.min(...blocks.map((d) => d.reward)))
            : smallSkeleton}
        </li>
        <li>
          Máximo:{" "}
          {blocks?.length
            ? formatAmount(Math.max(...blocks.map((d) => d.reward)))
            : smallSkeleton}
        </li>
      </ul>
    </div>
  );
};

export default AdditionalInfo;
