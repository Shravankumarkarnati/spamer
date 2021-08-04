import { interpolateNumber, scaleDiverging } from "d3";
import { Dimensions } from "../Context";
import { NODE_RADIUS } from "./constants";
import { getDays } from "./getDays";

interface Node {
  id: string;
  dataDefId: string;
  initials: string;
  position: Dimensions;
  color: string;
  step: number;
  labelText: string;
  labelPosition: Dimensions;
  direction: "left" | "right" | null;
}

const getXCordScale = (axisWidth: number, maxTime: number) => {
  return scaleDiverging()
    .domain([-maxTime, 0, maxTime])
    .interpolator(
      interpolateNumber(NODE_RADIUS * 2.5, axisWidth - NODE_RADIUS * 2.5)
    );
};

export const getXCords = (nodes: Node[], axisWidth: number) => {
  const allTimes = nodes.map((cur) => {
    const [number, text] = cur.labelText.split(" ") as [
      string,
      "years" | "months" | "weeks" | "days" | null
    ];
    const time = getDays(text, parseInt(number, 10));
    return time;
  });
  const maxTime = Math.max(...allTimes);
  const xScale = getXCordScale(axisWidth, maxTime);
  const newNodes = nodes.map((cur) => {
    const [number, text] = cur.labelText.split(" ") as [
      string,
      "years" | "months" | "weeks" | "days" | null
    ];
    const time = getDays(text, parseInt(number, 10));
    const nodeData = {
      ...cur,
      position: { ...cur.position, x: xScale(time) }
    };
    return nodeData;
  });
  return newNodes;
};
