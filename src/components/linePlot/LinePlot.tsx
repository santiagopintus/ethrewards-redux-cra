import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import {
  createGuideLine,
  createScales,
  drawAxes,
  drawDots,
  drawLine,
  listenMouseEvents,
} from "../../utils/plot";
import { Block, Measures } from "../../model/model.interface";

type LinePlotProps = {
  data: Block[];
  onDataFocus: (b: Block | null) => void;
  plotColor: string;
  linesColor: string;
};

/**
 * LinePlot is a React component that visualizes an array of Block data as a line plot using D3.js.
 * It renders a SVG element with a plot area and a guide line for the X and Y axes.
 * @prop data - The array of Block data to be plotted.
 * @prop onDataFocus - A function to set the focused data in the context.
 * @prop measures - An object with the dimensions of the plot area.
 * @prop dotRadius - The radius of the dots representing the data points.
 */
export default function LinePlot({
  data,
  onDataFocus,
  plotColor,
  linesColor,
}: LinePlotProps) {
  const [plotSizes, setPlotSizes] = useState<Measures>({
    W: 0, //WIDTH -> Starts as 0 to be able to measure window right
    H: 400, //HEIGHT
    R: 20, //RIGHT
    L: 60, //LEFT
    T: 30, //TOP
    B: 20, //BOTTOM
  });

  const svgRef = useRef<SVGSVGElement>(null);
  const dotRadius = 3;

  const updateWidth = () => {
    setPlotSizes({
      ...plotSizes,
      W:
        document.querySelector(".container")?.clientWidth ||
        Math.min(window.innerWidth * 0.8, 1200),
    });
  };
  /* Update width according to viewport size */
  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const svgPlot = d3.select(svgRef.current);
    svgPlot.selectAll("*").remove(); //Ensure clean restart

    const { x, y } = createScales(data, plotSizes);

    drawAxes(svgPlot, x, y, plotSizes);

    /* Draw main plot line */
    drawLine(svgPlot, data, x, y, plotColor);

    // Initialize guide lines for X and Y axes
    const vertGuideLine = createGuideLine(svgPlot, linesColor);
    const horGuideLine = createGuideLine(svgPlot, linesColor);

    //Draw dots on each line vertices
    const dots = drawDots(svgPlot, data, x, y, dotRadius, plotColor);

    // Listen to mousemove event on the SVG element
    listenMouseEvents(
      svgPlot,
      onDataFocus,
      plotSizes,
      vertGuideLine,
      horGuideLine,
      dots,
      x
    );
  }, [data, plotSizes, plotColor, dotRadius, linesColor]);

  return (
    <svg
      data-testid="linePlot"
      ref={svgRef}
      width={plotSizes.W}
      height={plotSizes.H}
    />
  );
}
