import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-7xl font-black text-zinc-800">404</div>
      <h1 className="mb-3 text-2xl font-extrabold text-white">Page not found</h1>
      <p className="mb-8 max-w-md text-zinc-400">
        That page doesn&apos;t exist or has been moved. Try one of these instead:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-400 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
        >
          All Articles
        </Link>
        <Link
          href="/tools"
          className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
        >
          Free Tools
        </Link>
        <Link
          href="/supplements"
          className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
        >
          Supplements
        </Link>
      </div>
    </main>
  )
}
