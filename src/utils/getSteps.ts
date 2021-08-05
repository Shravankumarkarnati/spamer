import { INode } from "./getXCords";

export const getSteps = (nodes: INode[], axisWidth: number) => {
  const orderedXCords = nodes
    .map((cur) => ({
      id: cur.id,
      xCord: cur.position.x,
      step: cur.step,
      initials: cur.initials
    }))
    .sort((a, b) => a.xCord - b.xCord);

  const mid = orderedXCords.findIndex((cur) => cur.xCord >= axisWidth / 2);

  const leftNodes = orderedXCords.slice(0, mid);
  const rightNodes = orderedXCords.slice(mid);

  leftNodes.sort((a, b) => b.xCord - a.xCord);

  const steps: Record<string, number> = {};

  leftNodes.forEach((cur, index) => {
    steps[cur.id] = index + 1;
  });

  rightNodes.forEach((cur, index) => {
    steps[cur.id] = index + 1;
  });

  return steps;
};
