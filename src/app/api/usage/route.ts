import type { NextRequest } from "next/server";

const FREE_DAILY_LIMIT = 5;

// Shared in-memory store (same as translate route — in production, use Redis/KV)
const usageStore = new Map<string, number>();

function getUsageKey(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `usage_${today}`;
}

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const key = `${getUsageKey()}_${ip}`;
  const current = usageStore.get(key) || 0;

  return Response.json({
    used: current,
    remaining: Math.max(0, FREE_DAILY_LIMIT - current),
    limit: FREE_DAILY_LIMIT,
  });
}
