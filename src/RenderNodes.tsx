import { schemePaired } from "d3";
import { useEffect, useState } from "react";
import { Connect } from "./Connect";
import { Node } from "./Node";
import { getSteps } from "./getSteps";
import { getXCordScale } from "./getXCordScale";
import React from "react";
import { Dimensions } from "./App";

export const calculateMaxTime = (times: number[]) => {
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

type TLabelPoints = Record<string, Dimensions>;

export const RenderNodes = ({ data, axisWidth, yCord }: Props) => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [labelPoints, SetLabelPoints] = useState<TLabelPoints>({});

  const maxTime = calculateMaxTime(data.map((cur) => cur.daysFromIndex));
  const xCordScale = getXCordScale(axisWidth, maxTime);

  useEffect(() => {
    const temp = data.map((cur, index) => {
      const xCord = xCordScale(cur.daysFromIndex);

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
    const nodes = getSteps(temp, axisWidth);
    setNodes(nodes);

    // eslint-disable-next-line
  }, [data, axisWidth, yCord, maxTime]);

  return (
    <>
      {nodes.map((cur) => (
        <React.Fragment key={cur.color}>
          <Node
            cords={{ x: cur.xCord, y: cur.yCord }}
            indexNode={false}
            color={cur.color}
            text={cur.text}
            key={cur.text}
            labelDimensions={labelPoints[cur.text] || null}
          />
          {cur.drawArrow && (
            <Connect
              axisWidth={axisWidth}
              step={cur.step}
              direction={cur.direction}
              indexNodeX={axisWidth / 2}
              targetNodeX={cur.xCord}
              axisY={cur.yCord}
              color={cur.color}
              text={cur.text}
              SetLabelPoints={SetLabelPoints}
              totalNumberOfConnections={nodes.reduce(
                (acc, cur) => acc + (cur.drawArrow ? 1 : 0),
                0
              )}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};
