import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { INDEX_NODE_COLOR, nodes1, nodes2 } from "./constants";
import { generateNode } from "./generateNode";
import { Node } from "./Node";
import { RenderNodes } from "./RenderNodes";
import "./styles.css";
import { XAxis } from "./XAxis";

export interface Dimensions {
  x: number;
  y: number;
}

export default function App() {
  const [dataset, setDataSet] = useState(true);
  const [nodeSet, setNodeSet] = useState(nodes2);

  const [timelineDimensions, setTimelineDimensions] = useState<Dimensions>({
    x: 0,
    y: 0
  });
  const [axisPositions, setAxisPositions] = useState<Dimensions>({
    x: 0,
    y: 0
  });

  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (timelineRef.current) {
      const [x, y] = [
        timelineRef.current.clientWidth,
        timelineRef.current.clientHeight
      ];
      setTimelineDimensions({
        x,
        y
      });

      setAxisPositions({ x, y: (y * 3) / 4 });
    }
  }, []);

  const onClickDataset = () => {
    setNodeSet(dataset ? nodes1 : nodes2);
    setDataSet((prev) => !prev);
  };

  const onClickAddNode = () => {
    let newSet = [];
    const newNode = generateNode();

    if (dataset) {
      newSet = [...nodes2, newNode];
    } else {
      newSet = [...nodes1, newNode];
    }
    setNodeSet(newSet);
  };

  const onClickRemoveNode = () => {
    const remEle = Math.round(Math.random() * nodeSet.length);
    const newNodeSet = [...nodeSet];
    newNodeSet.splice(remEle, 1);
    setNodeSet(newNodeSet);
  };

  const TimelineContainerStyled = styled.div({
    position: "relative"
  });

  return (
    <div className="App">
      <div className="btnContainer">
        <button onClick={onClickDataset}>Change Dataset</button>
        <button onClick={onClickAddNode}>Add Node</button>
        <button onClick={onClickRemoveNode}>Remove Node</button>
      </div>
      <TimelineContainerStyled className="timeline-container" ref={timelineRef}>
        <XAxis
          axisPositions={axisPositions}
          timelineDimensions={timelineDimensions}
        />
        <RenderNodes
          data={nodeSet}
          axisWidth={axisPositions.x}
          yCord={axisPositions.y}
        />
        <Node
          color={INDEX_NODE_COLOR}
          text="in"
          indexNode
          cords={{ x: axisPositions.x / 2, y: axisPositions.y }}
          labelDimensions={null}
        />
      </TimelineContainerStyled>
    </div>
  );
}
