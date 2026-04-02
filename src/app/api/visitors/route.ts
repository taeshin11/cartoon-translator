// ---------------------------------------------------------------------------
// In-memory visitor counter
//
// NOTE: This resets whenever the server process restarts and is NOT shared
// across multiple serverless function instances. It is intentionally simple —
// replace the storage layer with Vercel KV (or similar) for production use.
// ---------------------------------------------------------------------------

interface CounterState {
  total: number;
  today: number;
  /** ISO date string of the day "today" counts belong to, e.g. "2026-04-02" */
  date: string;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

// Module-level singleton — persists for the lifetime of the Node.js process.
const state: CounterState = {
  total: 0,
  today: 0,
  date: todayISO(),
};

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export const dynamic = "force-dynamic"; // Always run at request time.

export async function GET(): Promise<Response> {
  const now = todayISO();

  // Reset the daily counter if the date has changed.
  if (state.date !== now) {
    state.today = 0;
    state.date = now;
  }

  state.today += 1;
  state.total += 1;

  return Response.json(
    { today: state.today, total: state.total },
    {
      headers: {
        // Prevent the browser / CDN from caching visitor counts.
        "Cache-Control": "no-store",
      },
    }
  );
}
