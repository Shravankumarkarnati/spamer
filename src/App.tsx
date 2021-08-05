import "./styles.css";
import { Container } from "./Container";

export interface Dimensions {
  x: number;
  y: number;
}

export default function App() {
  return (
    <div className="App">
      <Container />
    </div>
  );
}
