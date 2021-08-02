interface Props {
  step: number;
  direction: number;
  pivotNodeX: number;
  targetNodeX: number;
  axisY: number;
}

export const Connect = ({
  step,
  direction,
  pivotNodeX,
  targetNodeX,
  axisY
}: Props) => {
  return <polyline />;
};
