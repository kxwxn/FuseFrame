import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/layout/Logo";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7 lg:px-8">
      <Logo />
      <nav aria-label="Primary navigation" className="hidden items-center gap-12 font-mono text-base text-ink md:flex">
        {siteConfig.nav.map((item) => (
          <Link className="transition hover:text-cobalt" href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
