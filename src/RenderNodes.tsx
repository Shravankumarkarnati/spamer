import { schemePaired } from "d3";
import { useEffect, useState } from "react";
import { Node } from "./Node";

const calculateMaxTime = (times: number[]) => {
  return Math.max(...times.map((cur) => Math.abs(cur)));
};

interface Datum {
  text: string;
  daysFromPivot: number;
  drawArrow: boolean;
}

interface Props {
  data: Datum[];
  axisWidth: number;
  yCord: number;
}

interface NodeData {
  text: string;
  xCord: number;
  yCord: number;
  color: string;
}

const calcCordX = (axisWidth: number, maxTime: number, time: number) => {
  const axisUnit =
    axisWidth > 0 ? (axisWidth - axisWidth * 0.15) / (maxTime * 2) : 0;
  const cordX = axisUnit * time;
  const sign = Math.sign(cordX);
  return sign ? cordX + axisWidth / 2 : cordX * sign;
};

export const RenderNodes = ({ data, axisWidth, yCord }: Props) => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const maxTime = calculateMaxTime(data.map((cur) => cur.daysFromPivot));

  useEffect(() => {
    const temp = data.map((cur, index) => ({
      text: cur.text,
      yCord,
      xCord: calcCordX(axisWidth, maxTime, cur.daysFromPivot),
      color: schemePaired[index]!
    }));
    setNodes(temp);
  }, [data, axisWidth, yCord, maxTime]);

  return (
    <g>
      {nodes.map((cur) => (
        <Node
          cords={{ x: cur.xCord, y: cur.yCord }}
          pivotNode={false}
          color={cur.color}
          text={cur.text}
          key={cur.text}
        />
      ))}
    </g>
  );
};
