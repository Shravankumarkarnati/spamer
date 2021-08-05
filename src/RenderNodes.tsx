import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Node } from "./Node";
import { TimelineStore } from "./Store";

export const RenderNodes = observer(() => {
  const { nodes } = useContext(TimelineStore);
  return (
    <>
      {nodes.map((cur) => (
        <React.Fragment key={cur.id}>
          <Node cords={cur.position} color={cur.color} text={cur.initials} />
          {/* {cur.drawArrow && (
            <Connect
              axisWidth={axisWidth}
              step={cur.step}
              direction={cur.direction}
              indexNodeX={axisWidth / 2}
              targetNodeX={cur.xCord}
              axisY={cur.yCord}
              color={cur.color}
              text={cur.text}
              SetLabelPoints={SetLabelPoints}
              totalNumberOfConnections={nodes.reduce(
                (acc, cur) => acc + (cur.drawArrow ? 1 : 0),
                0
              )}
            />
          )} */}
        </React.Fragment>
      ))}
    </>
  );
});
