import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { TimelineStore } from "./Store";
import { Timeline } from "./Timeline";

const ContainerStyled = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  "& btnContainer": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export const Container = observer(() => {
  const { addIndexNode, timelineDimensions } = useContext(TimelineStore);
  return (
    <ContainerStyled>
      {timelineDimensions.x && timelineDimensions.y && (
        <div className="btnContainer">
          <label style={{ fontSize: ".5rem" }} htmlFor="select-index">
            Select Index Event:
          </label>
          <select
            id="select-index"
            defaultValue="null"
            onChange={(e) => {
              const value = e.target.value;
              addIndexNode(value);
            }}
          >
            <option value="null">null</option>
            <option value="Intervention">Intervention</option>
            <option value="Atrial Fibrillation">Atrial Fibrillation</option>
            <option value="Apple Pineapple">Apple Pineapple</option>
          </select>
        </div>
      )}
      <Timeline />
    </ContainerStyled>
  );
});
