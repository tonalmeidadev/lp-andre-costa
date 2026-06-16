import { NextRequest, NextResponse } from "next/server";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

type UserData = {
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string;
  fbp?: string;
};

type EventPayload = {
  event_name: string;
  event_id: string;
  event_source_url: string;
  user_data?: UserData;
};

export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ error: "Missing config" }, { status: 500 });
  }

  const body: EventPayload = await req.json();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    undefined;

  const userAgent = req.headers.get("user-agent") ?? undefined;

  const event = {
    event_name: body.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.event_id,
    event_source_url: body.event_source_url,
    action_source: "website",
    user_data: {
      client_ip_address: ip,
      client_user_agent: userAgent,
      ...body.user_data,
    },
  };

  const res = await fetch(`${CAPI_URL}?access_token=${ACCESS_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [event] }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json({ ok: true });
}
