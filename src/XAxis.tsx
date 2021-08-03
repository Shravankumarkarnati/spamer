import React from "react";
import { AxisPositions } from "./App";
import {
  ARROW_HEAD_BUFFER_Y,
  ARROW_HEAD_BUFFER_X,
  AXIS_COLOR
} from "./constants";

export interface Props {
  positions: AxisPositions;
}

export const XAxis = ({
  positions: {
    start: { x: x1, y: y1 },
    end: { x: x2, y: y2 }
  }
}: Props) => {
  const arrowHeadPoints = `${x2},${y1 - ARROW_HEAD_BUFFER_Y} ${x2},${
    y1 + ARROW_HEAD_BUFFER_Y
  } ${x2 + ARROW_HEAD_BUFFER_X},${y1}`;

  return (
    <g>
      <line
        id="popDef-timeline-line"
        stroke={AXIS_COLOR}
        strokeWidth="3"
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
      />
      <polygon points={arrowHeadPoints} fill={AXIS_COLOR} />
    </g>
  );
};
