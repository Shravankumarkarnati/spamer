import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { XAxis } from "./XAxis";
import { Node } from "./Node";

export interface Dimensions {
  x: number;
  y: number;
}
const nodes1 = [
  { text: "jk", daysFromPivot: -3, drawArrow: true },
  { text: "mk", daysFromPivot: -5, drawArrow: true },
  { text: "ga", daysFromPivot: -6, drawArrow: true },
  { text: "qs", daysFromPivot: -20, drawArrow: true },
  { text: "sk", daysFromPivot: -23, drawArrow: true },
  { text: "gt", daysFromPivot: -26, drawArrow: true },
  { text: "oa", daysFromPivot: -29, drawArrow: true },
  { text: "pg", daysFromPivot: -39, drawArrow: true },
  { text: "sa", daysFromPivot: 13, drawArrow: true },
  { text: "qw", daysFromPivot: 26, drawArrow: true },
  { text: "fg", daysFromPivot: 33, drawArrow: true },
  { text: "pa", daysFromPivot: 39, drawArrow: true }
];

const nodes2 = [
  { text: "gp", daysFromPivot: -9, drawArrow: true },
  { text: "ms", daysFromPivot: -15, drawArrow: true },
  { text: "md", daysFromPivot: -22, drawArrow: true },
  { text: "po", daysFromPivot: -38, drawArrow: true },
  { text: "qq", daysFromPivot: 22, drawArrow: true },
  { text: "fa", daysFromPivot: 32, drawArrow: true },
  { text: "la", daysFromPivot: 40, drawArrow: true }
];

export default function App() {
  const [dataset, setDataSet] = useState(true);
  const [nodeSet, setNodeSet] = useState(nodes2);

  const [svgDimensions, setSvgDimensions] = useState<Dimensions>({
    x: 0,
    y: 0
  });

  const [axisPositions, setAxisPositions] = useState<{
    1: Dimensions;
    2: Dimensions;
  }>({
    1: {
      x: 0,
      y: 0
    },
    2: { x: 0, y: 0 }
  });

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      setSvgDimensions({
        x: svgRef.current.clientWidth,
        y: svgRef.current.clientHeight
      });
      setAxisPositions({
        1: {
          x: 0,
          y: svgRef.current.clientHeight * 0.75
        },
        2: {
          x: svgRef.current.clientWidth,
          y: svgRef.current.clientHeight * 0.75
        }
      });
    }
  }, []);

  const onClick = () => {
    setNodeSet(dataset ? nodes1 : nodes2);
    setDataSet((prev) => !prev);
  };

  return (
    <div className="App">
      <button onClick={onClick}>Change Dataset</button>
      <div className="timeline-container">
        <svg
          id="timeline-svg"
          width={svgDimensions.x}
          height={svgDimensions.y}
          ref={svgRef}
        >
          <XAxis positions={axisPositions} />
          <Node
            color="blue"
            text="in"
            pivotNode
            cords={{
              x: svgDimensions.x / 2,
              y: (svgDimensions.y * 3) / 4
            }}
          />
        </svg>
      </div>
    </div>
  );
}
