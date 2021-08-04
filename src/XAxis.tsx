import styled from "@emotion/styled";
import React from "react";
import { Dimensions } from "./App";
import {
  ARROW_HEAD_BUFFER_Y,
  ARROW_HEAD_BUFFER_X,
  AXIS_COLOR
} from "./constants";

interface Props {
  axisPositions: Dimensions;
  timelineDimensions: Dimensions;
}

const SvgStyled = styled.svg({
  position: "absolute",
  top: 0,
  left: 0
});

export const XAxis = ({
  axisPositions: { x, y },
  timelineDimensions
}: Props) => {
  const [x1, x2, y1, y2] = [0, x - ARROW_HEAD_BUFFER_X, y, y];

  const arrowHeadPoints = `${x2},${y1 - ARROW_HEAD_BUFFER_Y} ${x2},${
    y1 + ARROW_HEAD_BUFFER_Y
  } ${x2 + ARROW_HEAD_BUFFER_X},${y1}`;

  return (
    <SvgStyled
      id="timeline-axis"
      viewBox={`0 0 ${timelineDimensions.x} ${timelineDimensions.y}`}
    >
      <line
        stroke={AXIS_COLOR}
        strokeWidth="3"
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
      />
      <polygon points={arrowHeadPoints} fill={AXIS_COLOR} />
    </SvgStyled>
  );
};
