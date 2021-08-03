import {
  CONNECT_STEP_GUTTER,
  NODE_RADIUS,
  CONNECT_ARC_RADIUS
} from "./constants";

interface Props {
  step: number;
  direction: "left" | "right";
  indexNodeX: number;
  targetNodeX: number;
  axisY: number;
  color: string;
  totalNumberOfConnections: number;
}

export const Connect = ({
  step,
  direction,
  indexNodeX,
  targetNodeX,
  axisY,
  color,
  totalNumberOfConnections
}: Props) => {
  const stepMargin = step * CONNECT_STEP_GUTTER;
  const headMargin = (step * NODE_RADIUS) / (totalNumberOfConnections / 2 + 1); // nodes.length / 2 + 1

  const indexHead =
    direction === "left"
      ? indexNodeX - NODE_RADIUS + headMargin
      : indexNodeX + NODE_RADIUS - headMargin;

  const targetHead = targetNodeX;
  const yCord = axisY - NODE_RADIUS;

  const verticalLength = stepMargin;
  const horizontalLength =
    targetHead -
    indexHead +
    CONNECT_ARC_RADIUS * 2 * (direction === "left" ? 1 : -1);

  const arcs =
    direction === "left"
      ? [
          `a${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS} 0 0 0 -${CONNECT_ARC_RADIUS},-${CONNECT_ARC_RADIUS}`,
          `a${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS} 0 0 0 -${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS}`
        ]
      : [
          `a${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS} 0 0 1 ${CONNECT_ARC_RADIUS},-${CONNECT_ARC_RADIUS}`,
          `a${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS} 0 0 1 ${CONNECT_ARC_RADIUS},${CONNECT_ARC_RADIUS}`
        ];

  // indexNodeHead -> indexNodeHead-step
  // indexNodeHead-step -> targetNode-step
  // targetNode-step -> targetNode

  const pathD = `M${indexHead},${yCord}  v${-verticalLength} 
  ${arcs[0]}
  h${horizontalLength}
  ${arcs[1]}
  v${verticalLength}`;

  return (
    <svg>
      <path d={pathD} fill="none" stroke={color} strokeWidth={2} />
      {/* {color === "#e31a1c" && (
        <>
          <rect
            x={horizontalLength / 2 + indexHead - 16}
            y={yCord - verticalLength - 16}
            width={80}
            height={20}
            rx={10}
            fill={color}
          />
          <text
            x={horizontalLength / 2 + indexHead}
            y={yCord - verticalLength}
            fontSize="0.5rem"
            fill="white"
          >
            {color}
          </text>
        </>
      )} */}
    </svg>
  );
};
