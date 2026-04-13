export async function GET() {
  return Response.json({
    used: 0,
    remaining: Infinity,
    limit: Infinity,
    unlimited: true,
  });
}
