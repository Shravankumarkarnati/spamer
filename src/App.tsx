import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { XAxis } from "./XAxis";
import { Node } from "./Node";
import { RenderNodes } from "./RenderNodes";
import {
  nodes1,
  nodes2,
  initial_axis_positions,
  initial_svg_dimensions,
  ARROW_HEAD_BUFFER_X
} from "./constants";

import { generateNode } from "./generateNode";

export interface Dimensions {
  x: number;
  y: number;
}

export interface AxisPositions {
  start: Dimensions;
  end: Dimensions;
}

export default function App() {
  const [dataset, setDataSet] = useState(true);
  const [nodeSet, setNodeSet] = useState(nodes2);

  const [svgDimensions, setSvgDimensions] = useState<Dimensions>(
    initial_svg_dimensions
  );

  const [axisPositions, setAxisPositions] = useState<AxisPositions>(
    initial_axis_positions
  );

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      setSvgDimensions({
        x: svgRef.current.clientWidth - ARROW_HEAD_BUFFER_X,
        y: svgRef.current.clientHeight
      });
      setAxisPositions({
        start: {
          x: 0,
          y: svgRef.current.clientHeight * 0.75
        },
        end: {
          x: svgRef.current.clientWidth - ARROW_HEAD_BUFFER_X,
          y: svgRef.current.clientHeight * 0.75
        }
      });
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

  return (
    <div className="App">
      <div className="btnContainer">
        <button onClick={onClickDataset}>Change Dataset</button>
        <button onClick={onClickAddNode}>Add Node</button>
        <button onClick={onClickRemoveNode}>Remove Node</button>
      </div>
      <div className="timeline-container">
        <svg
          id="timeline-svg"
          width={svgDimensions.x}
          height={svgDimensions.y}
          ref={svgRef}
        >
          <XAxis positions={axisPositions} />
          <RenderNodes
            data={nodeSet}
            axisWidth={svgDimensions.x}
            yCord={axisPositions.end.y}
          />
          <Node
            color="blue"
            text="in"
            pivotNode
            cords={{
              x: svgDimensions.x / 2,
              y: axisPositions.end.y
            }}
          />
        </svg>
      </div>
    </div>
  );
}
