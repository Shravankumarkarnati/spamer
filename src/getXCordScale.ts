import { interpolateNumber, scaleDiverging } from "d3";
import { NODE_RADIUS } from "./constants";

export const getXCordScale = (axisWidth: number, maxTime: number) => {
  return scaleDiverging()
    .domain([-maxTime, 0, maxTime])
    .interpolator(
      interpolateNumber(NODE_RADIUS * 2.5, axisWidth - NODE_RADIUS * 2.5)
    );
};
