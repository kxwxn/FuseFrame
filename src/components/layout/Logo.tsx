import Link from "next/link";

export function Logo() {
  return (
    <Link aria-label="SourceLaunch home" className="flex items-center gap-3" href="/">
      <span className="grid size-8 place-items-center border border-cyan bg-white text-lg font-black text-cyan shadow-sm">
        S
      </span>
      <span className="font-mono text-2xl font-black tracking-normal text-ink">SourceLaunch</span>
    </Link>
  );
}
