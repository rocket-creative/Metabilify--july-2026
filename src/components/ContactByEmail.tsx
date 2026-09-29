import { siteConfig } from "@/lib/site";

export function ContactByEmail({ note }: { note: string }) {
  return (
    <div className="border border-stone bg-neutral p-8 md:p-10">
      <p className="eyebrow mb-3">Email</p>
      <a
        href={`mailto:${siteConfig.email}`}
        className="arrow-link break-all text-base"
      >
        {siteConfig.email} <span className="arrow-ne">↗</span>
      </a>
      <p className="mt-6 text-sm leading-relaxed text-muted">{note}</p>
    </div>
  );
}
