import { schemePaired } from "d3";
import sample from "lodash/sample";

export const getColor = () => {
  const colors = schemePaired;
  return sample(colors)!;
};
