import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/notify";
import { getSupabaseAdmin } from "@/lib/supabase";
import { discussSchema, interestLabels } from "@/lib/validations";

export const runtime = "nodejs";

const rateMap = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = discussSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const sent = await sendNotification({
    replyTo: data.email,
    subject: `Metablify project inquiry: ${interestLabels[data.interest]}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Organization: ${data.organization}`,
      `Interest: ${interestLabels[data.interest]}`,
      "",
      data.message,
    ].join("\n"),
  });

  if (!sent.ok) {
    return NextResponse.json({ error: sent.error }, { status: 500 });
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("project_inquiries").insert({
      name: data.name,
      email: data.email,
      organization: data.organization,
      interest: data.interest,
      message: data.message,
      ip,
    });

    if (error) {
      console.error("Supabase insert error:", error.message);
    }
  }

  return NextResponse.json({ ok: true });
}
