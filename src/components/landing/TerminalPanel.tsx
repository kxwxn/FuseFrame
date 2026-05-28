const instructions = [
  "Add Auth Block (email + magic link)",
  "Add Stripe Block (checkout + subscriptions)",
  "Add Webhook Block (Stripe events)",
  "Add Dashboard Block (MRR, signups)",
  "Add Attribution Block (revenue by source)",
];

export function TerminalPanel() {
  return (
    <div className="rounded-lg bg-[#080d11] p-6 font-mono text-sm text-white shadow-terminal">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-volt">AI INSTRUCTION</span>
        <span className="flex gap-2">
          <span className="size-3 rounded-full bg-slate-600" />
          <span className="size-3 rounded-full bg-slate-600" />
          <span className="size-3 rounded-full bg-volt" />
        </span>
      </div>
      <p className="leading-6 text-slate-200">
        Use <span className="text-volt">FuseFrame</span> to scaffold a SaaS backend with auth, Stripe billing,
        webhook handling, dashboard metrics, and revenue attribution.
      </p>
      <ul className="mt-4 space-y-2">
        {instructions.map((item) => (
          <li className="flex gap-3 text-slate-200" key={item}>
            <span className="text-volt">+</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-7 text-white">&gt; Generate _</p>
    </div>
  );
}
