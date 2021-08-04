import { values } from "mobx";
import { types } from "mobx-state-tree";
import { getInitials } from "./getInitials";
import { v4 as uuid } from "uuid";
import { createContext } from "react";

const DataDefTime = types.model({
  number: types.number,
  type: types.union(
    types.literal("years"),
    types.literal("months"),
    types.literal("weeks"),
    types.literal("days")
  )
});

const Dimensions = types.model({
  x: types.number,
  y: types.number
});

const Node = types.model({
  id: types.string,
  initials: types.string,
  position: Dimensions,
  color: types.string,
  direction: types.union(
    types.literal("left"),
    types.literal("right"),
    types.null
  ),
  drawArrow: types.boolean,
  step: types.number,
  labelPosition: Dimensions
});

const IndexEvent = types.model({
  id: types.string,
  initials: types.string,
  color: types.string,
  position: Dimensions
});

const DataDef = types.model({
  id: types.string,
  fullName: types.string,
  position: types.union(
    types.literal("after"),
    types.literal("before"),
    types.null
  ),
  time: DataDefTime
});

export const RootStore = types
  .model({
    dataDefs: types.array(DataDef),
    nodes: types.array(Node),
    indexEvent: types.union(IndexEvent, types.null),
    timelineDimensions: Dimensions
  })
  .views((self) => ({
    get totalNumberOfConnections() {
      return values(self.nodes).reduce(
        (acc, node) => acc + (node.drawArrow ? 1 : 0),
        0
      );
    },
    get axisPositions() {
      const { x, y } = self.timelineDimensions;
      return { x, y: y * 0.75 };
    }
  }))
  .actions((self) => ({
    addTimelineDimensions(x: number, y: number) {
      self.timelineDimensions = {
        x,
        y
      };
    },
    addIndexNode(name: string) {
      if (name === "null") self.indexEvent = null;
      else {
        const initials = getInitials(name);
        const { x, y } = self.axisPositions;
        const indexEventPos = { x: x / 2, y };
        self.indexEvent = {
          position: indexEventPos,
          initials,
          id: uuid(),
          color: "#2bb1a7"
        };
      }
    }
  }));

const instance = RootStore.create({
  indexEvent: null,
  timelineDimensions: { x: 0, y: 0 },
  dataDefs: [],
  nodes: []
});

export const TimelineStore = createContext(instance);
