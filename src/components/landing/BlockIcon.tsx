type BlockIconProps = {
  label: string;
  tone: "teal" | "blue" | "violet";
};

const toneClasses = {
  teal: "from-cyan to-emerald-600",
  blue: "from-cobalt to-sky-500",
  violet: "from-ember to-orange-400",
} satisfies Record<BlockIconProps["tone"], string>;

export function BlockIcon({ label, tone }: BlockIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-11 place-items-center rounded-md bg-gradient-to-br ${toneClasses[tone]} font-mono text-xl font-black text-white shadow-sm`}
    >
      {label}
    </span>
  );
}
