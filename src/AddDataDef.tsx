import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { TimelineStore } from "./Store";

export const AddDataDef = observer(() => {
  const [dataDefName, setDataDefName] = useState("");
  const [dataDefTime, setDataDefTime] = useState(0);
  const [dataDefTimeText, setDataDefTimeText] = useState("null");
  const [dataDefPosition, setDataDefPosition] = useState("null");

  const { addDataDef } = useContext(TimelineStore);

  return (
    <form
      className="btnContainer"
      onSubmit={(e) => {
        e.preventDefault();
        const dataDef = {
          name: dataDefName,
          timeNumber: dataDefTime,
          timeText:
            dataDefTimeText === "null" ? null : (dataDefTimeText as any),
          position: dataDefPosition === "null" ? null : (dataDefPosition as any)
        };
        setDataDefName("");
        setDataDefTime(0);
        setDataDefTimeText("null");
        setDataDefPosition("null");
        addDataDef(dataDef);
      }}
    >
      <label style={{ fontSize: ".5rem" }} htmlFor="select-dataDef-name">
        Select Datadef Name:
      </label>
      <input
        type="text"
        id="select-dataDef-name"
        required
        value={dataDefName}
        onChange={(e) => setDataDefName(e.target.value)}
      />
      <label style={{ fontSize: ".5rem" }} htmlFor="select-dataDef-timeNumber">
        Select Time Text:
      </label>
      <input
        type="number"
        id="select-dataDef-timeNumber"
        required
        value={dataDefTime}
        onChange={(e) => setDataDefTime(parseInt(e.target.value, 10))}
      />
      <label style={{ fontSize: ".5rem" }} htmlFor="select-dataDef-timeText">
        Select Time Text:
      </label>
      <select
        id="select-dataDef-timeText"
        value={dataDefTimeText}
        onChange={(e) => {
          const value = e.target.value;
          setDataDefTimeText(value);
        }}
      >
        <option value="null">null</option>
        <option value="years">Years</option>
        <option value="months">Months</option>
        <option value="weeks">Weeks</option>
        <option value="days">Days</option>
      </select>
      <label style={{ fontSize: ".5rem" }} htmlFor="select-dataDef-position">
        Select Datadef position:
      </label>
      <select
        id="select-dataDef-position"
        value={dataDefPosition}
        onChange={(e) => {
          const value = e.target.value;
          setDataDefPosition(value);
        }}
      >
        <option value="null">null</option>
        <option value="before">Before</option>
        <option value="after">After</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
});
