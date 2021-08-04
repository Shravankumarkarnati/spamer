import { createContext } from "react";

export interface DataDef {
  id: string;
  fullName: string;
  position: "after" | "before" | "none";
  time: [number, "years" | "months" | "weeks" | "days"];
}

export interface Dimensions {
  x: number;
  y: number;
}

export interface Node {
  id: string;
  initials: string;
  position: Dimensions;
  color: string;
  direction: "left" | "right" | null;
  drawArrow: boolean;
  step: number;
  labelPosition: Dimensions;
}

export interface IndexEvent {
  id: string;
  initials: string;
  color: string;
  position: Dimensions;
}

export interface IAppContext {
  changeContext: (newContext: IAppContext) => void;
  dataDefs: DataDef[];
  indexEvent: IndexEvent | null;
  nodes: Node[];
  timelineDimensions: Dimensions;
  axisPositions: Dimensions;
  totalNumberOfConnections: number;
}

export const AppContext = createContext<IAppContext>({
  changeContext: (newContext) => {},
  dataDefs: [],
  nodes: [],
  indexEvent: null,
  timelineDimensions: { x: 0, y: 0 },
  axisPositions: { x: 0, y: 0 },
  totalNumberOfConnections: 0
});
