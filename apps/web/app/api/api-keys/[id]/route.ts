import { NextResponse } from "next/server";
import { revokeApiKey } from "@/lib/api";

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await revokeApiKey(Number(params.id));
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
