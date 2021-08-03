import { CONNECT_STEP_GUTTER, NODE_RADIUS } from "./constants";

interface Props {
  step: number;
  direction: "left" | "right";
  pivotNodeX: number;
  targetNodeX: number;
  axisY: number;
  color: string;
  totalNumberOfConnections: number;
}

export const Connect = ({
  step,
  direction,
  pivotNodeX,
  targetNodeX,
  axisY,
  color,
  totalNumberOfConnections
}: Props) => {
  const stepMargin = step * CONNECT_STEP_GUTTER;
  const headMargin = (step * NODE_RADIUS) / (totalNumberOfConnections / 2 + 1); // nodes.length / 2 + 1

  const pivotHead =
    direction === "left"
      ? pivotNodeX - NODE_RADIUS + headMargin
      : pivotNodeX + NODE_RADIUS - headMargin;

  const targetHead = targetNodeX;
  const yCord = axisY - NODE_RADIUS;

  // pivotNodeHead -> pivotNodeHead-step
  // pivotNodeHead-step -> targetNode-step
  // targetNode-step -> targetNode

  const points = `${pivotHead},${yCord} ${pivotHead},${
    yCord - stepMargin
  } ${targetHead},${yCord - stepMargin} ${targetHead},${yCord}`;

  return (
    <polyline points={points} fill="none" stroke={color} strokeWidth={2} />
  );
};
