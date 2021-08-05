import { INode } from "./getXCords";

export const getSteps = (nodes: INode[], axisWidth: number) => {
  const steps: Record<string, number> = {};

  const leftNodes = nodes
    .filter((cur) => cur.position.x < axisWidth / 2)
    .sort((a, b) => b.position.x - a.position.x);
  const rightNodes = nodes
    .filter((cur) => cur.position.x >= axisWidth / 2)
    .sort((a, b) => a.position.x - b.position.x);

  leftNodes.forEach((cur, index) => {
    steps[cur.id] = index + 1;
  });

  rightNodes.forEach((cur, index) => {
    steps[cur.id] = index + 1;
  });

  return steps;
};
