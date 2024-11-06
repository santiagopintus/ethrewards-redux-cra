export type Block = {
  reward: number;
  date: {
    date: string;
  };
};

export type DateSpan = {
  since: string;
  till: string;
};

export type Measures = {
  L: number;
  T: number;
  R: number;
  B: number;
  W: number;
  H: number;
};

export type Scales = {
  x: d3.ScaleTime<number, number, never>;
  y: d3.ScaleLinear<number, number, never>;
};

export type GuideLine = d3.Selection<SVGLineElement, unknown, null, undefined>;

export type Dots = d3.Selection<
  d3.BaseType | SVGCircleElement,
  Block,
  SVGGElement,
  unknown
>;
