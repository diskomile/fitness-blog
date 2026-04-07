import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950 py-20 sm:py-28">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f97316 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <div className="mb-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-sm font-medium text-orange-400">
          Evidence-Based Fitness
        </div>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Train Smarter.{' '}
          <span className="text-orange-400">Get Results.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
          Science-backed workout guides, honest supplement reviews, and gear
          roundups to help you build the body you want — without the guesswork.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/blog"
            className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
          >
            Read Latest Articles
          </Link>
          <Link
            href="/category/workouts"
            className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-orange-400"
          >
            Browse Workouts
          </Link>
        </div>
      </div>
    </section>
  )
}
