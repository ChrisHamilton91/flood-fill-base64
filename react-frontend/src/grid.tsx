import { FC, useMemo } from "react";
import numberToHexString from "./color-utils/number-to-hex-string";
import { useGridCtx } from "./grid-ctx";

const Grid: FC = () => {
  const { grid } = useGridCtx();

  return useMemo(
    () => (
      <div className="grid">
        {grid.map((column, x) => (
          <div className="grid-column" key={x}>
            {column.map((color, y) => (
              <GridCell key={y} color={color} x={x} y={y} />
            ))}
          </div>
        ))}
      </div>
    ),
    [grid]
  );
};

type GridCellProps = {
  color: number;
  x: number;
  y: number;
};

const GridCell: FC<GridCellProps> = ({ color, x, y }) => {
  const { handleCellClick } = useGridCtx();

  return useMemo(() => {
    return (
      <div
        key={x}
        className="grid-cell"
        style={{ backgroundColor: numberToHexString(color) }}
        onClick={() => handleCellClick(x, y)}
      ></div>
    );
  }, [color, x, y, handleCellClick]);
};

export default Grid;
