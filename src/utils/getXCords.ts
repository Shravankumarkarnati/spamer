import { Dimensions } from "../App";

export interface INode {
  id: string;
  dataDefId: string;
  initials: string;
  color: string;
  step: number;
  labelText: string;
  position: Dimensions;
  labelPosition: Dimensions;
  direction: "left" | "right" | null;
}

const mapper = {
  years: 365,
  months: 30,
  weeks: 7,
  days: 1
};

const getDays = (
  text: "years" | "months" | "weeks" | "days" | null,
  number: number
) => {
  if (text === null) return 0;
  return number * mapper[text];
};

const calcCordX = (axisWidth: number, maxTime: number, time: number) => {
  const axisUnit = (axisWidth - axisWidth * 0.15) / (maxTime * 2);
  const cordX = axisUnit * time;
  const sign = Math.sign(cordX);
  return sign ? cordX + axisWidth / 2 : cordX * sign;
};

export const getXCords = (nodes: INode[], axisWidth: number) => {
  const allTimes = nodes.map((cur) => {
    const [number, text] = cur.labelText.split(" ") as [
      string,
      "years" | "months" | "weeks" | "days" | null
    ];
    const time = getDays(text, parseInt(number, 10));
    return time;
  });

  const maxTime = Math.max(...allTimes);
  const xCords: Record<string, number> = {};
  nodes.forEach((cur) => {
    const [number, text] = cur.labelText.split(" ") as [
      string,
      "years" | "months" | "weeks" | "days" | null
    ];

    const time = getDays(text, parseInt(number, 10));
    let cordX;
    if (cur.direction === "left") {
      cordX = calcCordX(axisWidth, maxTime, -time);
    } else {
      cordX = calcCordX(axisWidth, maxTime, time);
    }
    xCords[cur.id] = cordX;
  });
  return xCords;
};
