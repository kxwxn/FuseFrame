import { BlockIcon } from "@/components/landing/BlockIcon";

export type LandingBlock = {
  name: string;
  version: string;
  description: string;
  tags: string[];
  icon: string;
  tone: "teal" | "blue" | "violet";
};

export function BlockCard({ block }: { block: LandingBlock }) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <BlockIcon label={block.icon} tone={block.tone} />
        <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-cobalt">{block.version}</span>
      </div>
      <h3 className="mt-6 font-mono text-lg font-black text-ink">{block.name}</h3>
      <p className="mt-3 min-h-12 text-sm leading-6 text-muted">{block.description}</p>
      <p className="mt-5 font-mono text-xs text-muted">{block.tags.join(" / ")}</p>
    </article>
  );
}
