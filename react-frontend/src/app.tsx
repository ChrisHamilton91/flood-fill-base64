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
  const [gridLoading, setGridLoading] = useState<boolean>(false);

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      setGridLoading(true);
      floodFill({ grid, x, y, color: fillColor })
        .then((newGrid) => {
          if (newGrid) setGrid(newGrid);
        })
        .finally(() => setGridLoading(false));
    },
    [grid, fillColor]
  );

  return (
    <div className="app-container">
      <div className="sidebar-container">
        <Sidebar
          gridColorsState={[gridColors, setGridColors]}
          rowsState={[rows, setRows]}
          columnsState={[columns, setColumns]}
          fillColorState={[fillColor, setFillColor]}
          setGrid={setGrid}
        />
      </div>
      <div className="grid-container">
        <Grid grid={grid} onCellClick={handleCellClick} loading={gridLoading} />
      </div>
    </div>
  );
}

export default App;
