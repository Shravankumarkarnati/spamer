import { schemePaired } from "d3";
import { useEffect, useState } from "react";
import { Connect } from "./Connect";
import { Node } from "./Node";
import { getSteps } from "./getSteps";

const calculateMaxTime = (times: number[]) => {
  return Math.max(...times.map((cur) => Math.abs(cur)));
};

interface Datum {
  text: string;
  daysFromIndex: number;
  drawArrow: boolean;
}

interface Props {
  data: Datum[];
  axisWidth: number;
  yCord: number;
}

export interface NodeData {
  text: string;
  xCord: number;
  yCord: number;
  color: string;
  drawArrow: boolean;
  direction: "left" | "right";
  step: number;
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
  const maxTime = calculateMaxTime(data.map((cur) => cur.daysFromIndex));

  useEffect(() => {
    const temp = data.map((cur, index) => {
      const xCord = calcCordX(axisWidth, maxTime, cur.daysFromIndex);
      const direction = xCord < axisWidth / 2 ? "left" : "right";
      return {
        text: cur.text,
        yCord,
        xCord,
        color: schemePaired[index]!,
        drawArrow: cur.drawArrow,
        direction: direction as "left" | "right",
        step: 0
      };
    });

    setNodes(getSteps(temp, axisWidth));
  }, [data, axisWidth, yCord, maxTime]);

  return (
    <g>
      {nodes.map((cur, index) => (
        <g key={cur.text}>
          <Node
            cords={{ x: cur.xCord, y: cur.yCord }}
            indexNode={false}
            color={cur.color}
            text={cur.text}
          />
          {cur.drawArrow && (
            <Connect
              step={cur.step}
              direction={cur.direction}
              indexNodeX={axisWidth / 2}
              targetNodeX={cur.xCord}
              axisY={cur.yCord}
              color={cur.color}
              totalNumberOfConnections={nodes.reduce(
                (acc, cur) => acc + (cur.drawArrow ? 1 : 0),
                0
              )}
            />
          )}
        </g>
      ))}
    </g>
  );
};
