import styled from "@emotion/styled";
import { Dimensions } from "./App";
import { NODE_TEXT_FONT_SIZE, NODE_RADIUS } from "./constants";

interface Props {
  readonly cords: Dimensions;
  readonly text: string;
  readonly color: string;
  readonly indexNode?: boolean;
}

interface NodeSVGStyledProps {
  readonly color: string;
}

const NodeStyled = styled.circle(({ color }: NodeSVGStyledProps) => ({
  textTransform: "uppercase",
  fill: color
}));

const IndexNodeStyled = styled.rect(({ color }: NodeSVGStyledProps) => ({
  textTransform: "uppercase",
  fill: color
}));

const TextStyled = styled.text({
  textTransform: "uppercase",
  fill: "white",
  fontSize: `${NODE_TEXT_FONT_SIZE}px`
});

export const Node = ({ cords, text, color, indexNode = false }: Props) => {
  const nodeId = `timeline-node-${text}`;

  return (
    <g>
      {indexNode ? (
        <IndexNodeStyled
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
