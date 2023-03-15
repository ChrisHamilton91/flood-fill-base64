import { FC } from "react";
import { maxColumns, maxRows, minColumns, minRows, useGridCtx } from "./grid-ctx";
import hexStringToNumber from "./utils/hex-string-to-number";
import numberToHexString from "./utils/number-to-hex-string";

const Sidebar: FC = () => {
  const {
    gridColorsState: [gridColors, setGridColors],
    rowsState: [rows, setRows],
    columnsState: [columns, setColumns],
    fillColorState: [fillColor, setFillColor],
    generateGrid,
  } = useGridCtx();

  function handleColorChange(i: number, color: number) {
    setGridColors((prev) => {
      const next = [...prev];
      next[i] = color;
      return next;
    });
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
              value={numberToHexString(color)}
              onChange={(e) => handleColorChange(i, hexStringToNumber(e.target.value))}
            />
          </label>
        ))}
        <label>
          Rows ({minRows}-{maxRows}):
          <br />
          <input type="number" value={rows} onChange={(e) => setRows(e.target.value)} />
        </label>
        <label>
          Columns ({minColumns}-{maxColumns}): <br />
          <input type="number" value={columns} onChange={(e) => setColumns(e.target.value)} />
        </label>
        <button onClick={generateGrid}>Generate Grid</button>
      </form>
      <label>
        Fill Color:{" "}
        <input
          type="color"
          value={numberToHexString(fillColor)}
          onChange={(e) => setFillColor(hexStringToNumber(e.target.value))}
        />
      </label>
    </>
  );
};

export default Sidebar;
