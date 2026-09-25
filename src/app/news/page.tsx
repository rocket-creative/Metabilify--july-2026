import type { Metadata } from "next";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { newsItems } from "@/content/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Milestones and announcements from Metablify, including Arch Grants selection and recognition as a St. Louis INNO Startup to Watch.",
  alternates: { canonical: "/news" },
};

/**
 * One card per article: image, headline, date, read link — the layout the CEO
 * pointed at on the Spearhead site. Links and dates come from the client;
 * until then a card shows its year and a "link needed" note rather than a
 * made-up URL.
 */
export default function NewsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "News", href: "/news" },
        ]}
      />

      <PageHero
        eyebrow="Company updates"
        title="News & Insights"
        lead="Milestones, recognition, and announcements from Metablify."
        image={{
          src: "/images/about/danforth-building.jpg",
          alt: "The Donald Danforth Plant Science Center",
          width: 1024,
          height: 768,
        }}
      />

      <section className="section">
        <div className="news-grid">
          {newsItems.map((item, i) => (
            <Reveal key={item.slug} delay={i * 80}>
              <article className="news-card">
                <div className="news-card-media">
                  {item.photo ? (
                    <Photo
                      shape="card"
                      src={item.photo.src}
                      alt={item.photo.alt}
                      width={item.photo.width}
                      height={item.photo.height}
                      objectPosition={item.photo.objectPosition}
                      sizes="(min-width: 810px) 24rem, 90vw"
                    />
                  ) : item.logo ? (
                    <span className="news-card-logo">
                      <Image
                        src={item.logo.src}
                        alt={item.logo.alt}
                        width={item.logo.width}
                        height={item.logo.height}
                        sizes="16rem"
                      />
                    </span>
                  ) : (
                    <ImagePlaceholder ratio="3/2" label={item.image} />
                  )}
                </div>
                <div className="news-card-body">
                  <h2 className="news-card-title">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h2>
                  <p className="news-card-date">
                    {item.date ?? item.year} · {item.source}
                  </p>
                  <p className="news-card-excerpt">{item.body}</p>
                  {item.href ? (
                    <a
                      className="arrow-link news-card-link"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read article <span className="arrow-ne">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <p className="news-card-pending">Article link — to be added</p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </section>
    </>
  );
}
