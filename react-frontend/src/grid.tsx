import { FC, memo } from "react";

type GridProps = { grid: string[][]; onCellClick(x: number, y: number): void };

const Grid: FC<GridProps> = memo(({ grid, onCellClick }) => {
  return (
    <div className="grid">
      {grid.map((row, y) => (
        <GridColumn key={y} column={row} x={y} onCellClick={onCellClick} />
      ))}
    </div>
  );
});

type GridColumnProps = { column: string[]; x: number; onCellClick(x: number, y: number): void };

const GridColumn: FC<GridColumnProps> = memo(({ column, x, onCellClick }) => {
  return (
    <div className="grid-column">
      {column.map((color, y) => (
        <GridCell key={y} color={color} x={x} y={y} onCellClick={onCellClick} />
      ))}
    </div>
  );
});

type GridCellProps = {
  color: string;
  x: number;
  y: number;
  onCellClick(x: number, y: number): void;
};

const GridCell: FC<GridCellProps> = memo(({ color, x, y, onCellClick }) => {
  return (
    <div
      key={x}
      className="grid-cell"
      style={{ backgroundColor: color }}
      onClick={() => onCellClick(x, y)}
    ></div>
  );
});

export default Grid;
