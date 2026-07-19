import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="section-wide border-b border-stone bg-white"
    >
      <div className="mx-auto max-w-[80rem] px-5 py-4 md:px-10">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-faint">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {last ? (
                  <span className="text-muted" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-ink"
                  >
                    {item.name}
                  </Link>
                )}
                {!last ? <span aria-hidden="true">/</span> : null}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
