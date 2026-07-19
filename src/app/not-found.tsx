import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section wash-botanical text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="display display-lg mb-4">Page not found</h1>
      <p className="lead mx-auto mb-10">
        That page does not exist. Return home or discuss a project with us.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn btn-primary">
          <span>Home</span>
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <Link href="/discuss" className="btn btn-secondary">
          <span>Discuss a Project</span>
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
