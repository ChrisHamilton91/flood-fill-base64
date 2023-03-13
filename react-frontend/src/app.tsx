import { floodFill } from "./api";

const test = {
  grid: [
    ["111111", "000000", "111111", "000000", "000000", "000000"],
    ["000000", "111111", "111111", "000000", "000000", "000000"],
    ["000000", "000000", "111111", "000000", "000000", "000000"],
  ],
  x: 0,
  y: 1,
  color: "555555",
};

function App() {
  return <button onClick={() => floodFill(test).then(console.log)}>Test</button>;
}

export default App;
