import styled from "@emotion/styled";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "./Context";
import { Node } from "./Node";
import { XAxis } from "./XAxis";

const TimelineContainerStyled = styled.div({
  position: "relative"
});

export const Timeline = () => {
  const context = useContext(AppContext);

  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (timelineRef.current) {
      const { changeContext } = context;

      const [x, y] = [
        timelineRef.current.clientWidth,
        timelineRef.current.clientHeight
      ];

      changeContext({
        ...context,
        timelineDimensions: { x, y },
        axisPositions: { x, y: (y * 3) / 4 }
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <TimelineContainerStyled className="timeline-container" ref={timelineRef}>
      <XAxis
        axisPositions={context.axisPositions}
        timelineDimensions={context.timelineDimensions}
      />
      {context.indexEvent && (
        <Node
          indexNode={true}
          cords={context.indexEvent.position}
          color={context.indexEvent.color}
          text={context.indexEvent.initials}
        />
      )}
    </TimelineContainerStyled>
  );
};
