// See .env.development and .env.production for the respective API urls
const apiUrl = import.meta.env.VITE_API_URL;

const apiRoutes = {
  ping: apiUrl + "ping",
  floodFill: apiUrl + "flood-fill",
} as const;

// Sanity checks
try {
  if (!apiUrl) throw "No API url found! Ensure the environment variable exists!";
  else
    ping().then((res) => {
      if (!res) throw "Failed to ping API at url: " + apiUrl;
    });
} catch (e) {
  console.error(e);
  alert(e);
}

async function ping(): Promise<boolean> {
  try {
    const res = await fetch(apiRoutes.ping);
    return res.ok;
  } catch (e) {
    console.error(e);
    alert(e);
    return false;
  }
}

export type FloodFillParams = { grid: string[][]; x: number; y: number; color: string };
export async function floodFill(params: FloodFillParams): Promise<string[][] | null> {
  try {
    const res = await fetch(apiRoutes.floodFill, {
      method: "POST",
      body: encodeFloodFillParams(params),
      signal: AbortSignal.timeout(1e4), // 10 second timeout
    });
    if (!res.ok) throw await res.text();
    return decodeGrid(await res.arrayBuffer(), params.grid.length, params.grid[0].length);
  } catch (e) {
    console.error(e);
    alert(e);
    return null;
  }
}

/** Format: [color (8 bytes), x (8 bytes), y (8 bytes), xSize (8 bytes), ySize (8 bytes), grid colors (3 bytes each) {(0,0), (0,1), (0,2), ...}] */
function encodeFloodFillParams(params: FloodFillParams): ArrayBuffer {
  const xSize = params.grid.length;
  const ySize = params.grid[0].length;
  const buffer = new ArrayBuffer(35 + 3 * xSize * ySize);
  const view = new DataView(buffer);

  let i = 0;

  // color (3 bytes)
  colorToArray(params.color).forEach((byte) => view.setUint8(i++, byte));

  // x, y, xSize, ySize (8 bytes each = 32 bytes)
  [params.x, params.y, xSize, ySize].forEach((int) => {
    view.setBigUint64(i, BigInt(int));
    i += 8;
  });

  // grid
  params.grid.forEach((column) =>
    column.forEach((color) => colorToArray(color).forEach((byte) => view.setUint8(i++, byte)))
  );

  return buffer;
}

function decodeGrid(buffer: ArrayBuffer, xSize: number, ySize: number) {
  const bytes = new Uint8Array(buffer);
  const grid: string[][] = [];
  for (let x = 0; x < xSize; x++) {
    grid[x] = [];
    const columnStart = x * ySize * 3;
    for (let y = 0; y < ySize; y++) {
      const start = columnStart + y * 3;
      grid[x][y] =
        "#" +
        bytes[start].toString(16) +
        bytes[start + 1].toString(16) +
        bytes[start + 2].toString(16);
    }
  }
  return grid;
}

/** Expects color in #ffffff format */
function colorToArray(color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return [r, g, b];
}
