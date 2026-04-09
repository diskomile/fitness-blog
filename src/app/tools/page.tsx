import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Fitness Calculators',
  description:
    'Free fitness calculators: TDEE calculator, macro calculator, and 1-rep max calculator. Get personalized results instantly.',
}

const tools = [
  {
    href: '/tools/tdee-calculator',
    title: 'TDEE Calculator',
    description:
      'Calculate your Total Daily Energy Expenditure — how many calories you need to maintain, lose, or gain weight.',
    icon: '🔥',
    badge: 'Most Popular',
  },
  {
    href: '/tools/macro-calculator',
    title: 'Macro Calculator',
    description:
      'Get your personalized protein, carbs, and fat targets based on your goal — bulking, cutting, or maintenance.',
    icon: '🥩',
    badge: null,
  },
  {
    href: '/tools/one-rep-max-calculator',
    title: '1-Rep Max Calculator',
    description:
      'Calculate your one-rep max for any lift. Track your strength progress and set new PRs.',
    icon: '🏋️',
    badge: null,
  },
]

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Free Fitness Calculators
        </h1>
        <p className="mt-3 text-zinc-400">
          Science-based tools to optimize your training and nutrition.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-orange-500/50"
          >
            {tool.badge && (
              <span className="absolute right-4 top-4 rounded-full bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
                {tool.badge}
              </span>
            )}
            <span className="mb-3 text-4xl">{tool.icon}</span>
            <h2 className="mb-2 text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-zinc-400">{tool.description}</p>
            <span className="mt-4 text-sm font-semibold text-orange-400">
              Use calculator →
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
