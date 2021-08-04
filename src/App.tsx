import { useContext, useState } from "react";
import { AppContext, IAppContext } from "./Context";
import "./styles.css";
import { Container } from "./Container";

export interface Dimensions {
  x: number;
  y: number;
}

export default function App() {
  const context = useContext(AppContext);
  const [state, setState] = useState(context);
  const changeContext = (newContext: IAppContext) => {
    setState(newContext);
  };

  return (
    <AppContext.Provider value={{ ...state, changeContext }}>
      <div className="App">
        <Container />
      </div>
    </AppContext.Provider>
  );
}
