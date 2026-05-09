import { NextResponse } from "next/server";

import { fetchWorkText } from "../../../lib/work-text";
import { WORKS } from "../../../lib/works-manifest";

type RouteContext = { params: Promise<{ gutenbergId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { gutenbergId: raw } = await context.params;
  const id = Number(raw);
  if (!Number.isFinite(id) || raw === "") {
    return NextResponse.json({ error: "invalid gutenbergId" }, { status: 400 });
  }
  const item = WORKS.find((w) => w.gutenbergId === id);
  if (!item) {
    return NextResponse.json({ error: "unknown work" }, { status: 404 });
  }

  try {
    const text = await fetchWorkText(item);
    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    );
  }
}
