import { useEffect, useState } from "react";
import { floodFill } from "./api";
import { Grid } from "./grid";
import { randomColor } from "./random-color";

const numColors = 3 as const;
const defaultRows = 50 as const;
const defaultColumns = 50 as const;
const maxRows = 200 as const;
const maxColumns = 200 as const;

function App() {
  const [gridColors, setGridColors] = useState<string[]>(
    new Array(numColors).fill("").map(randomColor)
  );
  const [fillColor, setFillColor] = useState(randomColor());
  const [rows, setRows] = useState<string>(defaultRows.toString());
  const [columns, setColumns] = useState<string>(defaultColumns.toString());
  const [grid, setGrid] = useState<string[][]>([]);

  useEffect(generateGrid, []);

  function generateGrid() {
    let numRows = parseInt(rows);
    let numColumns = parseInt(columns);
    if (!numRows) numRows = 1;
    if (!numColumns) numColumns = 1;
    if (numRows > maxRows) numRows = maxRows;
    if (numColumns > maxColumns) numColumns = maxColumns;
    setRows(numRows.toString());
    setColumns(numColumns.toString());

    const grid: string[][] = [];
    for (let column = 0; column < numColumns; column++) {
      grid.push([]);
      for (let row = 0; row < numRows; row++) {
        grid[column].push(gridColors[Math.floor(Math.random() * gridColors.length)]);
      }
    }
    setGrid(grid);
  }

  function handleColorChange(i: number, color: string) {
    setGridColors((prev) => {
      const next = [...prev];
      next[i] = color;
      return next;
    });
  }

  async function handleCellClick(x: number, y: number) {
    const newGrid = await floodFill({ grid, x, y, color: fillColor });
    if (newGrid) setGrid(newGrid);
  }

  return (
    <>
      {gridColors.map((color, i) => (
        <label key={i}>
          Color {i + 1}:
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(i, e.target.value)}
          />
        </label>
      ))}

      <label>
        Rows: <input type="number" value={rows} onChange={(e) => setRows(e.target.value)} />
      </label>
      <label>
        Columns:
        <input type="number" value={columns} onChange={(e) => setColumns(e.target.value)} />
      </label>
      <button onClick={generateGrid}>Regenerate Grid</button>
      <label>
        Fill Color:
        <input type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} />
      </label>
      <Grid grid={grid} onCellClick={handleCellClick} />
    </>
  );
}

export default App;
