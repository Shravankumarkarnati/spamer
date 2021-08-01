import React from "react";

export interface Dimensions {
  x: number;
  y: number;
}

interface Props {
  dimensions: Dimensions;
}

export const XAxis = ({ dimensions }: Props) => {
  return (
    <line
      id="popDef-timeline-line"
      stroke="red"
      strokeWidth="5"
      x1={0}
      x2={dimensions.x}
      y1={dimensions.y * 0.75}
      y2={dimensions.y * 0.75}
    />
  );
};
