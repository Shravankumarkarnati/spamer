import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Connect } from "./Connect";
import { Node } from "./Node";
import { TimelineStore } from "./Store";

export const RenderNodes = observer(() => {
  const {
    nodes,
    axisPositions: { x: axisWidth }
  } = useContext(TimelineStore);
  return (
    <>
      {nodes.map((cur) => (
        <React.Fragment key={cur.id}>
          <Node
            labelDimensions={cur.labelPosition}
            labelText={cur.labelText}
            cords={cur.position}
            color={cur.color}
            text={cur.initials}
          />
          {cur.direction !== null && (
            <Connect
              axisWidth={axisWidth}
              step={cur.step}
              direction={cur.direction}
              indexNodeX={axisWidth / 2}
              targetNodeX={cur.position.x}
              axisY={cur.position.y}
              color={cur.color}
              text={cur.initials}
              totalNumberOfConnections={nodes.length}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
});
