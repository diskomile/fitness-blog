import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPostsMeta } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Beginner Fitness Guides — Start Your Fitness Journey',
  description: 'New to the gym? Start here. Evidence-based beginner guides covering workouts, nutrition, supplements, and everything you need to get started.',
}

const starterGuides = [
  {
    title: 'How to Start Going to the Gym',
    description: 'Everything you need to know before your first gym session. Equipment, etiquette, and your first workout plan.',
    href: '/blog/how-to-start-going-to-the-gym',
    icon: '🏋️',
    tag: 'Start Here',
  },
  {
    title: 'TDEE Calculator',
    description: 'Find out exactly how many calories you need to eat to lose fat or build muscle.',
    href: '/tools/tdee-calculator',
    icon: '🔢',
    tag: 'Tool',
  },
  {
    title: 'Macro Calculator',
    description: 'Calculate your ideal protein, carbs, and fat targets based on your goal.',
    href: '/tools/macro-calculator',
    icon: '🥗',
    tag: 'Tool',
  },
  {
    title: 'Best Whey Protein 2026',
    description: 'Which protein powder is worth buying? We compare 6 options by price, quality, and taste.',
    href: '/supplements/best-whey-protein',
    icon: '💊',
    tag: 'Supplements',
  },
  {
    title: 'Best Creatine Supplements',
    description: 'Creatine is the most research-backed supplement available. Here\'s what to buy.',
    href: '/supplements/best-creatine',
    icon: '⚡',
    tag: 'Supplements',
  },
  {
    title: '1RM Calculator',
    description: 'Calculate your one-rep max to set training weights and track strength progress.',
    href: '/tools/one-rep-max-calculator',
    icon: '📊',
    tag: 'Tool',
  },
]

const steps = [
  {
    step: '1',
    title: 'Calculate your calories',
    description: 'Use our TDEE calculator to find your maintenance calories, then adjust up (bulk) or down (cut) based on your goal.',
    href: '/tools/tdee-calculator',
    cta: 'Calculate TDEE →',
  },
  {
    step: '2',
    title: 'Set your macros',
    description: 'Hit 0.8–1g of protein per lb of bodyweight. Use our macro calculator to split the rest into carbs and fats.',
    href: '/tools/macro-calculator',
    cta: 'Calculate Macros →',
  },
  {
    step: '3',
    title: 'Pick a workout plan',
    description: 'Start with a full-body 3-day program. Consistency beats complexity — stick to the basics for your first 3 months.',
    href: '/workout-plans',
    cta: 'View Plans →',
  },
  {
    step: '4',
    title: 'Add one supplement',
    description: 'Creatine monohydrate is the only supplement proven to directly improve strength. Start there. Skip the rest for now.',
    href: '/supplements/best-creatine',
    cta: 'Best Creatine →',
  },
  {
    step: '5',
    title: 'Track your progress',
    description: 'Log your workouts and measurements weekly. Progress you can see keeps you motivated.',
    href: '/workout-log',
    cta: 'Start Logging →',
  },
]

export default async function BeginnersPage() {
  const allPosts = getAllPostsMeta()
  const beginnerPosts = allPosts
    .filter((p) =>
      p.title.toLowerCase().includes('beginner') ||
      p.title.toLowerCase().includes('start') ||
      p.title.toLowerCase().includes('how to')
    )
    .slice(0, 6)

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-400">
          New to fitness? Start here
        </div>
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
          Your <span className="text-orange-400">Beginner's</span> Guide to Fitness
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          No fluff, no overwhelm. A clear, evidence-based roadmap to get you from zero to your first real results.
        </p>
      </div>

      {/* 5-Step Plan */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-extrabold text-white">The 5-Step Starter Plan</h2>
        <div className="space-y-4">
          {steps.map((s) => (
            <div key={s.step} className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-extrabold text-white">
                {s.step}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{s.description}</p>
              </div>
              <Link
                href={s.href}
                className="hidden shrink-0 items-center text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors sm:flex"
              >
                {s.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Starter Guides */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-extrabold text-white">Essential Starter Resources</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {starterGuides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-orange-500/40"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-2xl">{g.icon}</span>
                <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-400">
                  {g.tag}
                </span>
              </div>
              <h3 className="mb-2 font-bold text-white">{g.title}</h3>
              <p className="flex-1 text-sm text-zinc-400">{g.description}</p>
              <span className="mt-4 text-sm font-semibold text-orange-400">Read more →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Beginner Articles */}
      {beginnerPosts.length > 0 && (
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-extrabold text-white">Beginner Articles</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beginnerPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-orange-500/40"
              >
                <span className="mb-2 inline-block rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold capitalize text-zinc-400">
                  {post.category}
                </span>
                <h3 className="mt-2 font-bold leading-snug text-white">{post.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{post.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/blog" className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors">
              View all articles →
            </Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section>
        <h2 className="mb-6 text-2xl font-extrabold text-white">Common Beginner Questions</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { q: 'How many days per week should I train?', a: '3 days per week is ideal for beginners. It gives you enough frequency to build the habit and see progress, while allowing enough recovery between sessions.' },
            { q: 'Do I need to take protein powder?', a: 'No. Protein powder is convenient, not essential. If you can hit your protein target (0.8–1g per lb bodyweight) through food, you don\'t need supplements.' },
            { q: 'Should I do cardio?', a: 'For beginners focused on building muscle, cardio is optional. 2x20 min of moderate cardio per week is enough to maintain cardiovascular health without hurting recovery.' },
            { q: 'How long before I see results?', a: 'Strength gains begin within 2–3 weeks. Visible muscle changes take 8–12 weeks of consistent training and proper nutrition. The scale is a poor measure — track lifts and photos instead.' },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-semibold text-white">{q}</p>
              <p className="mt-2 text-sm text-zinc-400">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
