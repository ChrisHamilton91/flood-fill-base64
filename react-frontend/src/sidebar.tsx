import { FC, useEffect, useState } from "react";

const maxRows = 200 as const;
const maxColumns = 200 as const;

type SideBarProps = {
  gridColorsState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  rowsState: [string, React.Dispatch<React.SetStateAction<string>>];
  columnsState: [string, React.Dispatch<React.SetStateAction<string>>];
  fillColorState: [string, React.Dispatch<React.SetStateAction<string>>];
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
};

const Sidebar: FC<SideBarProps> = ({
  gridColorsState: [gridColors, setGridColors],
  rowsState: [rows, setRows],
  columnsState: [columns, setColumns],
  fillColorState: [fillColor, setFillColor],
  setGrid,
}) => {
  function handleColorChange(i: number, color: string) {
    setGridColors((prev) => {
      const next = [...prev];
      next[i] = color;
      return next;
    });
  }

  useEffect(generateGrid, []);

  function generateGrid() {
    let numRows = parseInt(rows);
    let numColumns = parseInt(columns);

    // Keeps rows and columns between 1 and max
    if (!numRows) numRows = 1;
    if (!numColumns) numColumns = 1;
    if (numRows > maxRows) numRows = maxRows;
    if (numColumns > maxColumns) numColumns = maxColumns;

    // Update UI inputs
    setRows(numRows.toString());
    setColumns(numColumns.toString());

    // Generate grid where each cell is a random color from gridColors
    const grid: string[][] = [];
    for (let column = 0; column < numColumns; column++) {
      grid.push([]);
      for (let row = 0; row < numRows; row++) {
        grid[column].push(gridColors[Math.floor(Math.random() * gridColors.length)]);
      }
    }

    setGrid(grid);
  }

  return (
    <>
      <form className="grid-form" onSubmit={(e) => e.preventDefault()}>
        {gridColors.map((color, i) => (
          <label key={i}>
            Color {i + 1}:
            <br />
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(i, e.target.value)}
            />
          </label>
        ))}
        <label>
          Rows (1-{maxRows}):
          <br />
          <input type="number" value={rows} onChange={(e) => setRows(e.target.value)} />
        </label>
        <label>
          Columns (1-{maxColumns}): <br />
          <input type="number" value={columns} onChange={(e) => setColumns(e.target.value)} />
        </label>
        <button onClick={generateGrid}>Regenerate Grid</button>
      </form>
      <label>
        Fill Color:{" "}
        <input type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} />
      </label>
    </>
  );
};

export default Sidebar;
