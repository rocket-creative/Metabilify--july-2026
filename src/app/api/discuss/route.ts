import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";
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
      return NextResponse.json(
        { error: "Unable to save your inquiry right now." },
        { status: 500 },
      );
    }
  } else {
    console.warn(
      "Supabase not configured. Inquiry logged only:",
      data.email,
      data.interest,
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const from =
      process.env.RESEND_FROM_EMAIL ?? "Metablify <onboarding@resend.dev>";
    const to = process.env.NOTIFY_EMAIL ?? siteConfig.notifyEmail;

    try {
      await resend.emails.send({
        from,
        to: [to],
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
    } catch (err) {
      console.error("Resend error:", err);
      if (!supabase) {
        return NextResponse.json(
          { error: "Unable to send your inquiry right now." },
          { status: 500 },
        );
      }
    }
  }

  return NextResponse.json({ ok: true });
}
