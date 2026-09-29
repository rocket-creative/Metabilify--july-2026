import { Resend } from "resend";
import { readEnv } from "@/lib/env";
import { siteConfig } from "@/lib/site";

const SEND_ERROR = "Unable to send your message right now.";

export async function sendNotification(input: {
  subject: string;
  text: string;
  replyTo: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return { ok: false, error: SEND_ERROR };
  }

  const resend = new Resend(apiKey);
  const from =
    readEnv("RESEND_FROM_EMAIL") ?? "Metablify <onboarding@resend.dev>";
  const to = readEnv("NOTIFY_EMAIL") ?? siteConfig.notifyEmail;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
  });

  if (error) {
    console.error("Resend error:", error);
    return { ok: false, error: SEND_ERROR };
  }

  return { ok: true };
}
