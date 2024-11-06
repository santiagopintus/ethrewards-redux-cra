import {
  Block,
  Dots,
  GuideLine,
  Measures,
  Scales,
} from "../model/model.interface";
import * as d3 from "d3";
import { SetStateAction } from "react";

type Plot = d3.Selection<SVGSVGElement, unknown, null, undefined>;

/** Creates the appropriate scales for each axis of the plot according to the given data and measures
 * @param data - The data to be plotted
 * @param measures - The measures of the plot
 */
export const createScales = (data: Block[], measures: Measures): Scales => {
  /* Time scale for x-axis */
  const parsedDates = data.map((d) => new Date(d.date.date));
  const x = d3
    .scaleTime()
    .domain([d3.min(parsedDates) as Date, d3.max(parsedDates) as Date])
    .range([measures.L, measures.W - measures.R])
    .nice();

  /* Linear scale for y-axis */
  const y = d3
    .scaleLinear(
      [0, d3.max(data, (d) => d.reward) as number],
      [measures.H - measures.B, measures.T]
    )
    .nice();

  return { x, y };
};

/** Draws the x and y axes according to the given measures of the plot
 * @param plot - The plot selection
 * @param x - The x scale
 * @param y - The y scale
 * @param measures - The measures of the plot
 */
export const drawAxes = (
  plot: Plot,
  x: Scales["x"],
  y: Scales["y"],
  measures: Measures
) => {
  // Draw x-axis
  plot
    .append("g")
    .attr("transform", `translate(0,${measures.H - measures.B})`)
    .call(d3.axisBottom(x).ticks(getXTicksAmount(measures.W)));

  // Draw y-axis
  plot
    .append("g")
    .attr("transform", `translate(${measures.L},0)`)
    .call(d3.axisLeft(y).ticks(measures.H / 40))
    .call((g) =>
      g //Add horizontal lines
        .selectAll(".tick line")
        .clone()
        .attr("x2", measures.W - measures.R)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g //Add y-axis label
        .append("text")
        .attr("x", -measures.L)
        .attr("y", 15)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-size", 16)
        .text("Daily Rewards (USD)")
    );
};

const getXTicksAmount = (w: number) => {
  return w > 1000 ? w / 60 : w / 120;
};

export const drawLine = (
  svgPlot: Plot,
  data: Block[],
  x: Scales["x"],
  y: Scales["y"],
  plotColor: string
) => {
  const line = d3
    .line<Block>()
    .x((d) => x(new Date(d.date.date)) as number)
    .y((d) => y(d.reward));

  // Draw main line
  svgPlot
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("data-testid", "mainLine")
    .attr("stroke", plotColor)
    .attr("stroke-width", 1.5)
    .attr("d", line(data));
};

export const drawDots = (
  svgPlot: Plot,
  data: Block[],
  x: Scales["x"],
  y: Scales["y"],
  dotRadius: number,
  dotsColor: string
) => {
  return svgPlot
    .append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => x(new Date(d.date.date)) as number)
    .attr("cy", (d) => y(d.reward))
    .attr("r", dotRadius)
    .attr("fill", dotsColor)
    .attr("style", `filter: drop-shadow(0 0 5px ${dotsColor});`) //A little of glowing
    .style("opacity", 0); //Hide by default
};

/** Finds the closest dot to the left of the cursor and shows it
 * @param mouseX - The x coordinate of the cursor
 * @param dots - The selection of dots
 * @param x - The x scale
 */
export const highlightApropriateDot = (
  mouseX: number,
  dots: Dots,
  x: Scales["x"]
) => {
  let closestDot: SVGCircleElement | null = null;
  let closestX = -Infinity;
  let dataAboutClosestDot: Block | null = null;

  /* Find the closest dot to the left of the cursor */
  dots.each(function (d) {
    const cx = x(new Date(d.date.date));
    if (cx < mouseX && cx > closestX) {
      closestX = cx;
      closestDot = this as SVGCircleElement;
      dataAboutClosestDot = d;
    }
  });

  /* Show only the closest dot to the left */
  dots.style("opacity", 0);
  if (closestDot) {
    d3.select(closestDot).style("opacity", 1);
  }
  return dataAboutClosestDot;
};

/* GUIDELINES */
/** Helper function to create a guide line */
export const createGuideLine = (svgPlot: Plot, linesColor: string) =>
  svgPlot
    .append("line")
    .attr("stroke", linesColor)
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "5, 5")
    .style("opacity", 0); // Initially hidden

const getSafeX = (mouseX: number, measures: Measures) =>
  Math.max(measures.L, Math.min(mouseX, measures.W));

const getSafeY = (mouseY: number, measures: Measures) =>
  Math.max(measures.T, Math.min(mouseY, measures.H - measures.B));

/** Determines the position of the guide lines according to the mouse position and calls moveGuideLine to move them */
export const handleGuidelinesPositions = (
  mouseX: number,
  mouseY: number,
  measures: Measures,
  vertGuideLine: GuideLine,
  horGuideLine: GuideLine
) => {
  /* Avoid going out of plot */
  const vertXpos = getSafeX(mouseX, measures);
  const horYpos = getSafeY(mouseY, measures);
  /* Update vertical guideline postion */
  moveGuideLine(
    vertGuideLine,
    vertXpos,
    measures.T,
    vertXpos,
    measures.H - measures.B
  );
  /* Update horizontal guideline postion */
  moveGuideLine(horGuideLine, measures.L, horYpos, measures.W, horYpos);
};

/** Updates the position of the guide line according to the given coordinates */
const moveGuideLine = (
  guideLine: GuideLine,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  guideLine
    .attr("x1", x1)
    .attr("x2", x2)
    .attr("y1", y1)
    .attr("y2", y2)
    .style("opacity", 1);
};

export const listenMouseEvents = (
  svgPlot: Plot,
  onDataFocus: (b: Block | null) => void,
  measures: Measures,
  vertGuideLine: GuideLine,
  horGuideLine: GuideLine,
  dots: Dots,
  x: Scales["x"]
) => {
  svgPlot.on("mousemove", (e) =>
    onMouseMove(e, onDataFocus, measures, vertGuideLine, horGuideLine, dots, x)
  );
  svgPlot.on("mouseleave", () => {
    /* Reset guide lines and highlighted dot */
    highlightApropriateDot(-Infinity, dots, x);
    onDataFocus(null);
    horGuideLine.style("opacity", 0);
    vertGuideLine.style("opacity", 0);
  });
};

const onMouseMove = (
  e: any,
  onDataFocus: (b: Block | null) => void,
  measures: Measures,
  vertGuideLine: GuideLine,
  horGuideLine: GuideLine,
  dots: Dots,
  x: Scales["x"]
) => {
  const [mouseX, mouseY] = d3.pointer(e);
  onDataFocus(highlightApropriateDot(mouseX, dots, x));
  handleGuidelinesPositions(
    mouseX,
    mouseY,
    measures,
    vertGuideLine,
    horGuideLine
  );
};
