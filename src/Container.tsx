import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { TimelineStore } from "./Store";
import { Timeline } from "./Timeline";
import { AddDataDef } from "./AddDataDef";

const ContainerStyled = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  "& .btnContainer": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "1rem 0",

    "&>*": {
      margin: "0 .2rem"
    }
  }
});

export const Container = observer(() => {
  const { addIndexNode, timelineDimensions } = useContext(TimelineStore);

  return (
    <ContainerStyled>
      <Timeline />
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
      <AddDataDef />
    </ContainerStyled>
  );
});
