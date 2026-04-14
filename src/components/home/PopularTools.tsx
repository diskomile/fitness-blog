import Link from 'next/link'

const tools = [
  { href: '/tools/tdee-calculator', label: 'TDEE Calculator', icon: '🔥', desc: 'Find your daily calorie needs' },
  { href: '/tools/macro-calculator', label: 'Macro Calculator', icon: '🥩', desc: 'Protein, carbs & fat targets' },
  { href: '/tools/one-rep-max-calculator', label: '1RM Calculator', icon: '🏋️', desc: 'Calculate your max lift' },
  { href: '/tools/strength-standards', label: 'Strength Standards', icon: '📊', desc: 'Are you beginner or elite?' },
  { href: '/tools/bmi-calculator', label: 'BMI Calculator', icon: '⚖️', desc: 'Body mass index with advice' },
  { href: '/tools/bulk-cut-timeline', label: 'Bulk & Cut Timeline', icon: '📅', desc: 'Plan your physique phases' },
]

export default function PopularTools() {
  return (
    <section className="border-t border-zinc-800 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Free Fitness Tools</h2>
            <p className="mt-1 text-sm text-zinc-500">Science-based calculators — no sign-up needed</p>
          </div>
          <Link
            href="/tools"
            className="hidden text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors sm:block"
          >
            All 12 tools →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center transition-all hover:border-orange-500/40 hover:bg-zinc-900"
            >
              <span className="mb-2 text-3xl">{tool.icon}</span>
              <span className="mb-1 text-sm font-semibold text-white group-hover:text-orange-400 transition-colors leading-snug">
                {tool.label}
              </span>
              <span className="text-xs text-zinc-500 leading-snug">{tool.desc}</span>
            </Link>
          ))}
        </div>

        <div className="mt-4 sm:hidden">
          <Link
            href="/tools"
            className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            See all 12 free tools →
          </Link>
        </div>
      </div>
    </section>
  )
}
