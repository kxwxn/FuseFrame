import Link from "next/link";

export function SetupRequired({
  title,
  description,
  missing,
}: {
  title: string;
  description: string;
  missing: string[];
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <div className="rounded-lg border border-line bg-white p-8 shadow-sm">
        <p className="font-mono text-sm font-bold uppercase text-cobalt">Setup required</p>
        <h1 className="mt-4 font-mono text-4xl font-black leading-tight text-ink">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{description}</p>

        <div className="mt-8 rounded-lg border border-line bg-slate-50 p-5">
          <h2 className="font-mono text-lg font-black text-ink">Missing environment variables</h2>
          <ul className="mt-4 grid gap-2 font-mono text-sm text-muted sm:grid-cols-2">
            {missing.map((key) => (
              <li className="rounded-md border border-line bg-white px-3 py-2" key={key}>
                {key}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link className="primary-button" href="/docs">
            Open setup docs -&gt;
          </Link>
          <Link className="secondary-button" href="/">
            Back to landing -&gt;
          </Link>
        </div>
      </div>
    </section>
  );
}
