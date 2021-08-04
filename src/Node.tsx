import styled from "@emotion/styled";
import { Dimensions } from "./App";
import { NODE_RADIUS } from "./constants";

interface Props {
  readonly cords: Dimensions;
  readonly text: string;
  readonly color: string;
  readonly indexNode?: boolean;
}

interface NodeStyledProps {
  readonly color: string;
  readonly top: number;
  readonly left: number;
  readonly index?: boolean;
}

const NodeStyled = styled.div(
  ({ color, top, left, index = false }: NodeStyledProps) => ({
    backgroundColor: color,
    color: "#fff",
    fontSize: ".5rem",
    textTransform: "uppercase",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: index ? NODE_RADIUS * 2.5 : NODE_RADIUS * 2,
    height: index ? NODE_RADIUS * 2.5 : NODE_RADIUS * 2,
    borderRadius: index ? "5px" : "50%",

    position: "absolute",
    top,
    left,
    transform: "translate(-50%,-50%)"
  })
);

export const Node = ({ cords, text, color, indexNode = false }: Props) => {
  const nodeId = `timeline-node-${text}`;

  return (
    <NodeStyled
      id={nodeId}
      index={indexNode}
      color={color}
      top={cords.y}
      left={cords.x}
    >
      {text}
    </NodeStyled>
  );
};
