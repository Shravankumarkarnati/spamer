import styled from "@emotion/styled";
import { Dimensions } from "./App";

const NODE_TEXT_FONT_SIZE = 12;
const NODE_RADIUS = 20;

interface Props {
  readonly cords: Dimensions;
  readonly text: string;
  readonly color: string;
  readonly pivotNode?: boolean;
}

interface NodeSVGStyledProps {
  readonly color: string;
}

const NodeStyled = styled.circle(({ color }: NodeSVGStyledProps) => ({
  textTransform: "uppercase",
  fill: color
}));

const PivotNodeStyled = styled.rect(({ color }: NodeSVGStyledProps) => ({
  textTransform: "uppercase",
  fill: color
}));

const TextStyled = styled.text({
  textTransform: "uppercase",
  fill: "white",
  fontSize: `${NODE_TEXT_FONT_SIZE}px`
});

export const Node = ({ cords, text, color, pivotNode = false }: Props) => {
  const nodeId = `timeline-node-${text}`;

  return (
    <g>
      {pivotNode ? (
        <PivotNodeStyled
          width={NODE_RADIUS * 2}
          height={NODE_RADIUS * 2}
          color={color}
          x={cords.x - NODE_RADIUS}
          y={cords.y - NODE_RADIUS}
          rx={5}
        />
      ) : (
        <NodeStyled
          id={nodeId}
          color={color}
          cx={cords.x}
          cy={cords.y}
          r={NODE_RADIUS}
        />
      )}
      <TextStyled
        x={cords.x - NODE_TEXT_FONT_SIZE / 2}
        y={cords.y + NODE_TEXT_FONT_SIZE / 4}
      >
        {text}
      </TextStyled>
    </g>
  );
};
