// See .env.development and .env.production for the respective API urls
const apiUrl: string | undefined = import.meta.env.VITE_API_URL;

const apiRoutes = {
  ping: apiUrl + "ping",
  floodFill: apiUrl + "flood-fill",
} as const;

// Sanity checks
if (!apiUrl) console.error("No API url found! Ensure the environment variable exists!");
else
  ping().then((res) => {
    if (!res) console.error("Failed to ping API at url: ", apiUrl);
  });

async function ping(): Promise<boolean> {
  try {
    const res = await fetch(apiRoutes.ping);
    return res.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export type FloodFillParams = { grid: string[][]; x: number; y: number; color: string };
export async function floodFill(params: FloodFillParams) {
  try {
    const res = await fetch(apiRoutes.floodFill, {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw await res.text();
    return await res.text();
  } catch (e) {
    console.error(e);
    return null;
  }
}
