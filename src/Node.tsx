import styled from "@emotion/styled";
import { useState } from "react";
import { NODE_RADIUS } from "./utils/constants";

interface Dimensions {
  x: number;
  y: number;
}

interface Props {
  readonly cords: Dimensions;
  readonly text: string;
  readonly color: string;
  readonly labelDimensions?: Dimensions;
  readonly labelText?: string;
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
    zIndex: 2,
    transform: "translate(-50%,-50%)",
    cursor: "pointer",

    "&:hover": {
      transform: "translate(-50%,-50%) scale(1.1)",
      zIndex: 100
    }
  })
);

interface LabelStyledProps {
  top: number;
  left: number;
  color: string;
}

const LabelStyled = styled.span(({ top, left, color }: LabelStyledProps) => ({
  position: "absolute",
  top,
  left,
  fontSize: ".5rem",
  color: "white",
  backgroundColor: color,
  padding: ".2rem .5rem",
  borderRadius: ".5rem",
  transform: "translate(-50%,-140%)",
  zIndex: 3
}));

export const Node = ({
  cords,
  text,
  color,
  labelDimensions,
  labelText,
  indexNode = false
}: Props) => {
  const nodeId = `timeline-node-${text}`;
  const [focused, setFocused] = useState(false);

  return (
    <>
      <NodeStyled
        id={nodeId}
        index={indexNode}
        color={color}
        top={cords.y}
        left={cords.x}
        onMouseEnter={() => {
          setFocused(true);
        }}
        onMouseLeave={() => {
          setFocused(false);
        }}
      >
        {text}
      </NodeStyled>
      {labelDimensions && focused && (
        <LabelStyled
          id="node-label"
          top={labelDimensions.y}
          left={labelDimensions.x}
          color={color}
        >
          {labelText}
        </LabelStyled>
      )}
    </>
  );
};
