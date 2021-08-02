import React from "react";
import { AxisPositions } from "./App";

export interface Props {
  positions: AxisPositions;
}

export const XAxis = ({
  positions: {
    start: { x: x1, y: y1 },
    end: { x: x2, y: y2 }
  }
}: Props) => {
  return (
    <line
      id="popDef-timeline-line"
      stroke="#eeeccc"
      strokeWidth="5"
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
    />
  );
};
