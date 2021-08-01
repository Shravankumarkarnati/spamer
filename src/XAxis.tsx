import React from "react";
import { Dimensions } from "./App";

interface Props {
  positions: { 1: Dimensions; 2: Dimensions };
}

export const XAxis = ({
  positions: {
    1: { x: x1, y: y1 },
    2: { x: x2, y: y2 }
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
