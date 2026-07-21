import Link from "next/link";
import { footerGroups, siteConfig } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone bg-neutral">
      <div className="px-5 py-14 md:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              An LC/MS platform built on the first principles of physics. See
              more in your LC/MS data.
            </p>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-6">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <p className="eyebrow mb-4">{group.title}</p>
                  <ul className="space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-stone pt-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Developed at the {siteConfig.origin}.</p>
        </div>
      </div>
    </footer>
  );
}
