import { SvgStyled } from "./XAxis";
import {
  CONNECT_STEP_GUTTER,
  NODE_RADIUS,
  CONNECT_ARC_RADIUS,
  CONNECT_PATH_STROKE_WIDTH
} from "./utils/constants";
import React, { useEffect, useMemo } from "react";

interface Dimensions {
  x: number;
  y: number;
}

interface Props {
  step: number;
  direction: "left" | "right";
  indexNodeX: number;
  targetNodeX: number;
  axisY: number;
  color: string;
  totalNumberOfConnections: number;
  axisWidth: number;
  text: string;
  SetLabelPoints: React.Dispatch<
    React.SetStateAction<Record<string, Dimensions>>
  >;
}

export const Connect = ({
  step,
  direction,
  indexNodeX,
  targetNodeX,
  axisY,
  color,
  totalNumberOfConnections,
  axisWidth,
  SetLabelPoints,
  text
}: Props) => {
  const stepMargin = step * CONNECT_STEP_GUTTER;
  const headMargin = (step * NODE_RADIUS) / (totalNumberOfConnections / 2 + 1); // nodes.length / 2 + 1

  const indexHead =
    direction === "left"
      ? indexNodeX - NODE_RADIUS + headMargin
      : indexNodeX + NODE_RADIUS - headMargin;

  const targetHead = targetNodeX;
  const yCord = axisY - NODE_RADIUS;

  const verticalLength = stepMargin;
  const horizontalLength =
    targetHead -
    indexHead +
    CONNECT_ARC_RADIUS * 2 * (direction === "left" ? 1 : -1);

  const arcs =
    direction === "left"
      ? [
          `a${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS} 0 0 0 -${CONNECT_ARC_RADIUS},-${CONNECT_ARC_RADIUS}`,
          `a${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS} 0 0 0 -${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS}`
        ]
      : [
          `a${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS} 0 0 1 ${CONNECT_ARC_RADIUS},-${CONNECT_ARC_RADIUS}`,
          `a${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS} 0 0 1 ${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS}`
        ];

  // indexNodeHead -> indexNodeHead-step
  // indexNodeHead-step -> targetNode-step
  // targetNode-step -> targetNode
  const labelPoints = useMemo(
    () => ({
      text: {
        x: targetHead - horizontalLength / 2,
        y: yCord - verticalLength
      }
    }),
    [horizontalLength, verticalLength, yCord, targetHead]
  );

  useEffect(() => {
    SetLabelPoints((prev) => {
      const newObj = { ...prev };
      newObj[text] = labelPoints.text;
      return newObj;
    });
  }, [labelPoints, SetLabelPoints, text]);

  const pathD = `M${indexHead},${yCord}  v${-verticalLength} 
  ${arcs[0]}
  h${horizontalLength}
  ${arcs[1]}
  v${verticalLength}`;

  return (
    <SvgStyled viewBox={`0 0 ${axisWidth} ${yCord}`}>
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={CONNECT_PATH_STROKE_WIDTH}
      />
    </SvgStyled>
  );
};
