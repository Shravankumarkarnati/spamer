import { NodeData } from "./RenderNodes";

export const getSteps = (temp: NodeData[], axisWidth: number) => {
  const orderedXCords = temp
    .map((cur) => ({ key: cur.text, xCord: cur.xCord }))
    .sort((a, b) => a.xCord - b.xCord);

  const mid = orderedXCords.findIndex((cur) => cur.xCord >= axisWidth / 2);

  const leftNodes = orderedXCords.slice(0, mid);
  const rightNodes = orderedXCords.slice(mid);

  leftNodes.sort((a, b) => b.xCord - a.xCord);

  leftNodes.forEach((cur, index) => {
    temp.forEach((t) => {
      if (t.text === cur.key) {
        t.step = index + 1;
      }
    });
  });

  rightNodes.forEach((cur, index) => {
    temp.forEach((t) => {
      if (t.text === cur.key) {
        t.step = index + 1;
      }
    });
  });

  return temp;
};
