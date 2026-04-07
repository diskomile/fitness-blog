import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const prev = currentPage > 1 ? currentPage - 1 : null
  const next = currentPage < totalPages ? currentPage + 1 : null

  function pageHref(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`
  }

  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
      {prev ? (
        <Link
          href={pageHref(prev)}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-orange-400"
        >
          ← Previous
        </Link>
      ) : (
        <span className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-600 cursor-not-allowed">
          ← Previous
        </span>
      )}

      <span className="px-3 text-sm text-zinc-500">
        {currentPage} / {totalPages}
      </span>

      {next ? (
        <Link
          href={pageHref(next)}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-orange-400"
        >
          Next →
        </Link>
      ) : (
        <span className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-600 cursor-not-allowed">
          Next →
        </span>
      )}
    </nav>
  )
}
