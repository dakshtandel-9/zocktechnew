import { NextResponse } from "next/server";

/**
 * Receives enquiries from the contact form and appends them to the Google Sheet
 * via a Google Apps Script web app. The script URL + secret stay server-side.
 */
export async function GET() {
  return NextResponse.json({ ok: true, message: "Lead API is working" });
}

export async function POST(req: Request) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return NextResponse.json({ ok: false }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
  const lead = {
    secret: process.env.LEAD_WEBHOOK_SECRET ?? "",
    name: str(body.name, 120),
    phone: str(body.phone, 40),
    services: Array.isArray(body.services) ? body.services.map((s) => str(s, 60)).join(", ") : "",
    details: str(body.details, 2000),
    consent: body.consent ? "Yes" : "No",
    offers: body.offers ? "Yes" : "No",
    via: str(body.via, 20),
    page: str(body.page, 200),
  };
  if (!lead.name || !lead.phone) return NextResponse.json({ ok: false }, { status: 400 });

  try {
    // Apps Script answers with a redirect to the result; fetch follows it.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(lead),
    });
    return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
