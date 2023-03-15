// See .env.development and .env.production for the respective API urls
const apiUrl: string | undefined = import.meta.env.VITE_API_URL;

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

export type FloodFillParams = { grid: number[][]; x: number; y: number; color: number };
export async function floodFill(params: FloodFillParams): Promise<number[][] | null> {
  try {
    const res = await fetch(apiRoutes.floodFill, {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(1e4), // 10 second timeout
    });
    if (!res.ok) throw await res.text();
    return await res.json();
  } catch (e) {
    console.error(e);
    alert(e);
    return null;
  }
}
