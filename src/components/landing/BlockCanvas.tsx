import { BlockIcon } from "@/components/landing/BlockIcon";

const canvasBlocks = [
  {
    name: "Auth Block",
    description: "Users & sessions",
    icon: "A",
    tone: "teal",
    position: "left-[8%] top-[18%]",
  },
  {
    name: "Stripe Block",
    description: "Payments & billing",
    icon: "$",
    tone: "blue",
    position: "right-[5%] top-[18%]",
  },
  {
    name: "Webhook Block",
    description: "Events in",
    icon: "W",
    tone: "violet",
    position: "left-[35%] top-[42%]",
  },
  {
    name: "Dashboard Block",
    description: "Metrics & actions",
    icon: "D",
    tone: "teal",
    position: "left-[8%] bottom-[14%]",
  },
  {
    name: "Attribution Block",
    description: "Revenue source",
    icon: "N",
    tone: "blue",
    position: "right-[3%] bottom-[14%]",
  },
] as const;

export function BlockCanvas() {
  return (
    <div className="product-canvas relative min-h-[560px] overflow-hidden rounded-lg border border-line bg-white shadow-block">
      <div className="flex h-16 items-center justify-between border-b border-line bg-white px-5">
        <div className="flex items-center gap-4">
          <span className="grid size-10 place-items-center rounded-md bg-cobalt font-mono text-xl font-bold text-white">
            +
          </span>
          <span className="font-mono text-base font-semibold text-ink">My SaaS App</span>
          <span className="size-2 rounded-full bg-cyan" />
          <span className="text-sm text-muted">Production</span>
        </div>
        <span className="font-mono text-sm text-muted">blocks.json</span>
      </div>

      <div className="absolute left-0 top-16 hidden h-[calc(100%-4rem)] w-16 flex-col items-center gap-8 border-r border-line bg-white pt-6 text-ink md:flex">
        {["//", "[]", "<>", "==", "()"].map((item) => (
          <span className="font-mono text-lg" key={item}>
            {item}
          </span>
        ))}
        <span className="mt-auto pb-6 font-mono text-sm">&lt;/&gt;</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-16 bg-[radial-gradient(circle_at_1px_1px,#d9dee8_1px,transparent_0)] bg-[length:18px_18px] md:left-16" />
      <svg
        aria-hidden="true"
        className="absolute bottom-20 left-[17%] top-36 hidden h-[330px] w-[68%] overflow-visible md:block"
        viewBox="0 0 560 330"
      >
        <path className="canvas-line teal" d="M85 45 C120 45 120 100 120 130 C120 180 175 180 210 180" />
        <path className="canvas-line blue" d="M300 45 C380 45 410 45 455 45 C455 130 430 130 395 130" />
        <path className="canvas-line violet" d="M300 190 C300 235 200 235 145 235" />
        <path className="canvas-line violet" d="M300 190 C300 235 405 235 455 235" />
        <circle className="canvas-dot teal-fill" cx="85" cy="45" r="6" />
        <circle className="canvas-dot blue-fill" cx="300" cy="45" r="6" />
        <circle className="canvas-dot blue-fill" cx="210" cy="180" r="6" />
        <circle className="canvas-dot violet-fill" cx="300" cy="190" r="6" />
      </svg>

      {canvasBlocks.map((block) => (
        <div
          className={`absolute ${block.position} z-10 flex w-[210px] items-center gap-4 rounded-lg border border-line bg-white p-4 shadow-block`}
          key={block.name}
        >
          <BlockIcon label={block.icon} tone={block.tone} />
          <div>
            <p className="font-mono text-sm font-black text-ink">{block.name}</p>
            <p className="mt-1 text-xs text-muted">{block.description}</p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 right-6 z-20 hidden items-center gap-3 rounded-md border border-line bg-white px-4 py-3 font-mono text-sm text-ink shadow-sm md:flex">
        <span>-</span>
        <span>100%</span>
        <span>+</span>
        <span>[]</span>
      </div>
    </div>
  );
}
