import { NextRequest, NextResponse } from "next/server";
import { listEvents } from "@/lib/api";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const contractId = Number(params.id);
  const limitParam = request.nextUrl.searchParams.get("limit");
  const cursorParam = request.nextUrl.searchParams.get("cursor");

  try {
    const events = await listEvents(contractId, {
      limit: limitParam ? Number(limitParam) : undefined,
      cursor: cursorParam ? Number(cursorParam) : undefined
    });
    return NextResponse.json(events);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
