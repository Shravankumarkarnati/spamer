import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef } from "react";
import { Node } from "./Node";
import { RenderNodes } from "./RenderNodes";
import { TimelineStore } from "./Store";
import { XAxis } from "./XAxis";

const TimelineContainerStyled = styled.div({
  position: "relative"
});

export const Timeline = observer(() => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const {
    addTimelineDimensions,
    axisPositions,
    timelineDimensions,
    indexEvent
  } = useContext(TimelineStore);

  useEffect(() => {
    if (timelineRef.current) {
      const [x, y] = [
        timelineRef.current.clientWidth,
        timelineRef.current.clientHeight
      ];
      addTimelineDimensions(x, y);
    }
  }, [addTimelineDimensions]);

  return (
    <TimelineContainerStyled className="timeline-container" ref={timelineRef}>
      <XAxis
        axisPositions={axisPositions}
        timelineDimensions={timelineDimensions}
      />
      {indexEvent && (
        <Node
          indexNode={true}
          cords={indexEvent.position}
          color={indexEvent.color}
          text={indexEvent.initials}
        />
      )}
      {indexEvent && <RenderNodes />}
    </TimelineContainerStyled>
  );
});
