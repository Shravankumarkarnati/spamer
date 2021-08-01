import { useRef, useState } from "react";
import "./styles.css";
import { XAxis } from "./XAxis";
import { Node } from "./Node";

const dm1 = { x: 500, y: 500 };
const dm2 = { x: 400, y: 400 };

export default function App() {
  const [dataset, setDataSet] = useState(true);
  const [currentDS, setCurrentDS] = useState(dm1);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const onClick = () => {
    setCurrentDS(dataset ? dm2 : dm1);
    setDataSet((prev) => !prev);
  };

  return (
    <div className="App">
      <button onClick={onClick}>Change Dataset</button>
      <svg
        id="timeline-svg"
        width={currentDS.x}
        height={currentDS.y}
        ref={svgRef}
      >
        <XAxis dimensions={currentDS} />
        <Node
          color="blue"
          text="in"
          pivotNode
          dimensions={{ x: currentDS.x / 2, y: (currentDS.y * 3) / 4 }}
        />
      </svg>
    </div>
  );
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
