import { useCallback, useState } from "react";
import { floodFill } from "./api";
import Grid from "./grid";
import randomColor from "./random-color";
import Sidebar from "./sidebar";

const numColors = 3 as const;
const defaultRows = 50 as const;
const defaultColumns = 50 as const;

function App() {
  const [gridColors, setGridColors] = useState<string[]>(
    new Array(numColors).fill("").map(randomColor)
  );
  const [rows, setRows] = useState<string>(defaultRows.toString());
  const [columns, setColumns] = useState<string>(defaultColumns.toString());
  const [fillColor, setFillColor] = useState<string>(randomColor());
  const [grid, setGrid] = useState<string[][]>([]);

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      floodFill({ grid, x, y, color: fillColor }).then((newGrid) => {
        if (newGrid) setGrid(newGrid);
      });
    },
    [grid, fillColor]
  );

  return (
    <div className="app-container">
      <Sidebar
        gridColorsState={[gridColors, setGridColors]}
        rowsState={[rows, setRows]}
        columnsState={[columns, setColumns]}
        fillColorState={[fillColor, setFillColor]}
        setGrid={setGrid}
      />
      <Grid grid={grid} onCellClick={handleCellClick} />
    </div>
  );
}

export default App;
