import styled from "@emotion/styled";
import { Dimensions } from "./RenderAxis";

const textFontSize = 12;
const circleRadius = 20;

interface Props {
  readonly dimensions: Dimensions;
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
  fontSize: `${textFontSize}px`
});

export const Node = ({ dimensions, text, color, pivotNode = false }: Props) => {
  const nodeId = `timeline-node-${text}`;

  return (
    <g>
      {pivotNode ? (
        <PivotNodeStyled
          width={circleRadius * 2}
          height={circleRadius * 2}
          color={color}
          x={dimensions.x - circleRadius}
          y={dimensions.y - circleRadius}
          rx={5}
        />
      ) : (
        <NodeStyled
          id={nodeId}
          color={color}
          cx={dimensions.x}
          cy={dimensions.y}
          r={circleRadius}
        />
      )}
      <TextStyled
        x={dimensions.x - textFontSize / 2}
        y={dimensions.y + textFontSize / 4}
      >
        {text}
      </TextStyled>
    </g>
  );
};
