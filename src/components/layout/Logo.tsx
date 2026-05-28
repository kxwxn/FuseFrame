import Link from "next/link";

export function Logo() {
  return (
    <Link aria-label="FuseFrame home" className="flex items-center gap-3" href="/">
      <span className="relative grid size-9 place-items-center overflow-hidden border border-ink bg-ink text-lg font-black text-volt shadow-sm">
        F
        <span className="absolute bottom-1 right-1 size-2 bg-ember" />
      </span>
      <span className="font-mono text-2xl font-black tracking-normal text-ink">FuseFrame</span>
    </Link>
  );
}
