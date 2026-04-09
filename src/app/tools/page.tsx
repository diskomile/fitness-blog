import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Fitness Calculators & Tools',
  description:
    'Free fitness tools: TDEE calculator, macro calculator, 1RM calculator, strength standards, heart rate zones, bulk/cut timeline, and supplement timing guide.',
}

const tools = [
  {
    href: '/tools/tdee-calculator',
    title: 'TDEE Calculator',
    description: 'Calculate your Total Daily Energy Expenditure and get calorie targets for cutting, maintaining, or bulking.',
    icon: '🔥',
    badge: 'Most Popular',
  },
  {
    href: '/tools/macro-calculator',
    title: 'Macro Calculator',
    description: 'Get your personalized protein, carbs, and fat targets based on your goal.',
    icon: '🥩',
    badge: null,
  },
  {
    href: '/tools/one-rep-max-calculator',
    title: '1-Rep Max Calculator',
    description: 'Calculate your one-rep max for any lift and see a full percentage table.',
    icon: '🏋️',
    badge: null,
  },
  {
    href: '/tools/strength-standards',
    title: 'Strength Standards',
    description: 'See if your squat, bench, deadlift and OHP are beginner, intermediate, advanced or elite.',
    icon: '📊',
    badge: 'New',
  },
  {
    href: '/tools/heart-rate-zones',
    title: 'Heart Rate Zones',
    description: 'Calculate your 5 training heart rate zones — from fat burn to max effort — based on your age.',
    icon: '❤️',
    badge: 'New',
  },
  {
    href: '/tools/bulk-cut-timeline',
    title: 'Bulk & Cut Timeline',
    description: 'Set your goal weight and target date. Get a realistic plan with monthly milestones and daily calorie targets.',
    icon: '📅',
    badge: 'New',
  },
  {
    href: '/tools/supplement-timing',
    title: 'Supplement Timing',
    description: 'When to take creatine, protein, caffeine and more — personalised to your workout schedule.',
    icon: '💊',
    badge: 'New',
  },
  {
    href: '/tools/exercise-substitution',
    title: 'Exercise Substitution',
    description: 'No barbell, injury, or home gym only? Find the best substitute for any exercise instantly.',
    icon: '🔄',
    badge: 'New',
  },
  {
    href: '/tools/deload-planner',
    title: 'Deload Week Planner',
    description: 'Find out if you need a deload and get a full 7-day protocol based on your fatigue and training age.',
    icon: '😴',
    badge: 'New',
  },
  {
    href: '/tools/bmi-calculator',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index with a visual gauge and personalised category advice.',
    icon: '⚖️',
    badge: 'New',
  },
  {
    href: '/tools/water-intake',
    title: 'Water Intake Calculator',
    description: 'How much water should you drink daily? Get a personalised target and hourly schedule.',
    icon: '💧',
    badge: 'New',
  },
  {
    href: '/tools/sleep-calculator',
    title: 'Sleep Calculator',
    description: 'Calculate the best times to sleep or wake up based on 90-minute sleep cycles.',
    icon: '🌙',
    badge: 'New',
  },
]

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Free Fitness Tools
        </h1>
        <p className="mt-3 text-zinc-400">
          Science-based calculators and guides to optimise your training and nutrition.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-orange-500/50"
          >
            {tool.badge && (
              <span className={`absolute right-4 top-4 rounded-full px-2 py-0.5 text-xs font-semibold ${tool.badge === 'New' ? 'bg-green-600 text-white' : 'bg-orange-500 text-white'}`}>
                {tool.badge}
              </span>
            )}
            <span className="mb-3 text-4xl">{tool.icon}</span>
            <h2 className="mb-2 text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              {tool.title}
            </h2>
            <p className="flex-1 text-sm text-zinc-400">{tool.description}</p>
            <span className="mt-4 text-sm font-semibold text-orange-400">
              Open tool →
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
