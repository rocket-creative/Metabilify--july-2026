import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";
import { leadSchema } from "@/lib/validations";

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

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot tripped: pretend success and drop.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const qualifiers: [string, string | undefined][] = [
    ["Research area", data.researchArea],
    ["Instrument vendor", data.instrumentVendor],
    ["Instrument model", data.instrumentModel],
    ["Samples per study", data.samplesPerStudy],
    ["Sample matrix", data.sampleMatrix],
    ["Data volume", data.dataVolume],
    ["Current software", data.currentSoftware],
    ["Timeline", data.timeline],
  ];

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("lead_assessments").insert({
      name: data.name,
      email: data.email,
      organization: data.organization,
      research_area: data.researchArea || null,
      instrument_vendor: data.instrumentVendor || null,
      instrument_model: data.instrumentModel || null,
      samples_per_study: data.samplesPerStudy || null,
      sample_matrix: data.sampleMatrix || null,
      data_volume: data.dataVolume || null,
      current_software: data.currentSoftware || null,
      timeline: data.timeline || null,
      message: data.message,
      ip,
    });

    if (error) {
      console.error("Supabase lead insert error:", error.message);
      // Do not hard fail on storage; still try email below.
    }
  } else {
    console.warn("Supabase not configured. Lead logged only:", data.email);
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
        subject: `Metablify dataset assessment request: ${data.organization}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Organization: ${data.organization}`,
          ...qualifiers
            .filter(([, v]) => v && v.length > 0)
            .map(([label, v]) => `${label}: ${v}`),
          "",
          data.message,
        ].join("\n"),
      });
    } catch (err) {
      console.error("Resend error:", err);
      if (!supabase) {
        return NextResponse.json(
          { error: "Unable to send your request right now." },
          { status: 500 },
        );
      }
    }
  }

  return NextResponse.json({ ok: true });
}
