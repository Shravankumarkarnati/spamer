import styled from "@emotion/styled";
import { useContext } from "react";
import { INDEX_NODE_COLOR } from "./constants";
import { AppContext } from "./Context";
import { Timeline } from "./Timeline";
import { v4 as uuidv4 } from "uuid";
import { getInitials } from "./getInitials";

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

export const Container = () => {
  const context = useContext(AppContext);

  return (
    <ContainerStyled>
      <div className="btnContainer">
        <label style={{ fontSize: ".5rem" }} htmlFor="select-index">
          Select Index Event:
        </label>
        <select
          id="select-index"
          defaultValue="null"
          onChange={(e) => {
            const value = e.target.value;
            const indexEvent =
              value === "null"
                ? null
                : {
                    id: uuidv4(),
                    color: INDEX_NODE_COLOR,
                    initials: getInitials(value),
                    position: {
                      y: context.axisPositions.y,
                      x: context.axisPositions.x / 2
                    }
                  };
            context.changeContext({
              ...context,
              indexEvent: indexEvent
            });
          }}
        >
          <option value="null">null</option>
          <option value="Intervention">Intervention</option>
          <option value="Atrial Fibrillation">Atrial Fibrillation</option>
          <option value="Apple Pineapple">Apple Pineapple</option>
        </select>
      </div>
      <Timeline />
    </ContainerStyled>
  );
};
