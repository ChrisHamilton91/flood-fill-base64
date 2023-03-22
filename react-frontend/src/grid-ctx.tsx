import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { floodFill } from "./utils/api";
import useForceRender from "./utils/force-render";
import randomColor from "./utils/random-color";

// Keeping colors as numbers to reduce payload when passing grid over network
type GridCtxProps = {
  gridColorsState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  rowsState: [string, React.Dispatch<React.SetStateAction<string>>];
  columnsState: [string, React.Dispatch<React.SetStateAction<string>>];
  fillColorState: [string, (value: string) => void];
  grid: string[][];
  generateGrid: () => void;
  gridLoading: boolean;
  handleCellClick: (x: number, y: number) => void;
};

const GridCtx = createContext<GridCtxProps>(null as any);

const numColors = 3 as const;
const defaultRows = 40 as const;
const defaultColumns = 40 as const;
export const minRows = 3 as const;
export const minColumns = 3 as const;
export const maxRows = 400 as const;
export const maxColumns = 400 as const;

export const GridCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  const [gridColors, setGridColors] = useState<string[]>(
    new Array(numColors).fill(0).map(randomColor)
  );
  const [rows, setRows] = useState<string>(defaultRows.toString());
  const [columns, setColumns] = useState<string>(defaultColumns.toString());
  const [gridLoading, setGridLoading] = useState<boolean>(false);

  // These are refs so we can change them without changing the onClick function of every cell (handleCellClick),
  // which would cause the entire grid to be rerendered on every change
  const forceRender = useForceRender();
  const fillColor = useRef<string>(randomColor());
  const setFillColor = (value: string) => {
    fillColor.current = value;
    forceRender();
  };
  const grid = useRef<string[][]>([]);
  const setGrid = (value: string[][]) => {
    grid.current = value;
    forceRender();
  };

  const handleCellClick = useCallback((x: number, y: number) => {
    setGridLoading(true);

    floodFill({ grid: grid.current, x, y, color: fillColor.current })
      .then((newGrid) => {
        if (newGrid) setGrid(newGrid);
      })
      .finally(() => setGridLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(generateGrid, []);

  function generateGrid() {
    setGridLoading(true);

    let numRows = parseInt(rows);
    let numColumns = parseInt(columns);

    // Keeps rows and columns between min and max
    if (!numRows || numRows < minRows) numRows = minRows;
    if (!numColumns || numColumns < minColumns) numColumns = minColumns;
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

    // Push grid render to back of event queue so the loading overlay can pop up
    setTimeout(() => {
      setGrid(grid);
      setGridLoading(false);
    });
  }

  return (
    <GridCtx.Provider
      value={{
        gridColorsState: [gridColors, setGridColors],
        rowsState: [rows, setRows],
        columnsState: [columns, setColumns],
        fillColorState: [fillColor.current, setFillColor],
        grid: grid.current,
        generateGrid,
        gridLoading,
        handleCellClick,
      }}
    >
      {children}
    </GridCtx.Provider>
  );
};

export const useGridCtx = () => useContext(GridCtx);
