import { values } from "mobx";
import { cast, types } from "mobx-state-tree";
import { getInitials } from "./utils/getInitials";
import { getColor } from "./utils/getColor";
import { getXCords } from "./utils/getXCords";
import { v4 as uuid } from "uuid";
import { createContext } from "react";

type DataDefTimeText = "years" | "months" | "weeks" | "days" | null;
type DataDefPosition = "before" | "after" | null;

interface AddDataDefProps {
  name: string;
  timeNumber: number;
  timeText: DataDefTimeText;
  position: DataDefPosition;
}

const DataDefTime = types.model({
  number: types.number,
  type: types.union(
    types.literal("years"),
    types.literal("months"),
    types.literal("weeks"),
    types.literal("days"),
    types.null
  )
});

const Dimensions = types.model({
  x: types.number,
  y: types.number
});

const Node = types.model({
  id: types.string,
  dataDefId: types.string,
  initials: types.string,
  position: Dimensions,
  color: types.string,
  step: types.number,
  labelText: types.string,
  labelPosition: Dimensions,
  direction: types.union(
    types.literal("left"),
    types.literal("right"),
    types.null
  )
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
      return values(self.nodes).length;
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
    },
    addDataDef({ name, timeNumber, timeText, position }: AddDataDefProps) {
      if (timeText === null) {
        timeNumber = 0;
      }
      const newDataDef = DataDef.create({
        id: uuid(),
        fullName: name,
        position,
        time: { number: timeNumber, type: timeText }
      });

      const allDataDefs = [...values(self.dataDefs), newDataDef];
      self.dataDefs = cast(allDataDefs);
      let direction: "left" | "right" | null;
      if (position === "before") {
        direction = "left";
      } else if (position === "after") {
        direction = "right";
      } else {
        direction = null;
      }
      const newNode = Node.create({
        id: uuid(),
        dataDefId: newDataDef.id,
        labelText: `${newDataDef.time.number} ${newDataDef.time.type}`,
        initials: getInitials(name),
        position: { x: 0, y: self.axisPositions.y },
        labelPosition: { x: 0, y: 0 },
        color: getColor(),
        direction,
        step: 0
      });

      const allNodes = [...self.nodes, newNode];
      const newNodes = getXCords(allNodes, self.axisPositions.x / 2);
      console.log(allNodes, newNodes, ":(");

      self.nodes = cast([...newNodes]);
    }
  }));

const instance = RootStore.create({
  indexEvent: null,
  timelineDimensions: { x: 0, y: 0 },
  dataDefs: [],
  nodes: []
});

export const TimelineStore = createContext(instance);
