import { useEffect } from "react";
import { CircularProgress, Skeleton } from "@mui/material";
import s from "./chartContainer.module.scss";
import FocusedBlockData from "../focusedBlockData/FocusedBlockData";
import LinePlot from "../../components/linePlot/LinePlot";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Block } from "../../model/model.interface";
import {
  clearBlocks,
  clearFocusedBlock,
  fetchBlocks,
  setFocusedBlock,
} from "../blocks/blocksSlice";

const ChartContainer = () => {
  const dispatch = useAppDispatch();
  /* BLOCKS */
  const {
    value: blocks,
    focusedBlock,
    status,
    error,
  } = useAppSelector((state) => state.blocks);
  /* DATES */
  const dates = useAppSelector((state) => state.dateSelection.value);
  /* THEME */
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const plotColor = isDarkMode ? "#00ffff" : "black";
  const linesColor = isDarkMode ? "#fff" : "#000";

  const handleFocusBlock = (data: Block | null) => {
    dispatch(data ? setFocusedBlock(data) : clearFocusedBlock());
  };

  // Fetch blocks on initial render
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlocks(dates));
    }
  }, [dispatch, status, dates]);

  if (status === "loading" || status === "idle") {
    return <ChartLoading />;
  }

  if (status === "failed") {
    return <p>Error loading blocks: {error}</p>;
  }

  return (
    <>
      <FocusedBlockData
        reward={focusedBlock?.reward}
        date={focusedBlock?.date.date}
        backgroundColor={isDarkMode ? "#19243f" : "#fafafa"}
      />
      <div className={s.chartContainer}>
        {blocks ? (
          <LinePlot
            data={blocks}
            onDataFocus={handleFocusBlock}
            plotColor={plotColor}
            linesColor={linesColor}
          />
        ) : (
          <ChartLoading />
        )}
      </div>
    </>
  );
};

const ChartLoading = () => {
  return (
    <div className={s.loadingContainer}>
      <div className={s.spinnerContainer}>
        <CircularProgress className={s.spinner} size={100} />
      </div>
      <Skeleton
        variant="rounded"
        height={410}
        width={"100%"}
        sx={{ backgroundColor: "#19243f" }}
      ></Skeleton>
    </div>
  );
};

export default ChartContainer;
