import type { Metadata } from 'next'
import Link from 'next/link'
import { getPaginatedPosts, getPostsByCategory } from '@/lib/posts'
import { SITE_NAME } from '@/lib/constants'
import { CATEGORIES } from '@/lib/categories'
import PostGrid from '@/components/blog/PostGrid'
import Pagination from '@/components/blog/Pagination'

export const metadata: Metadata = {
  title: 'Blog',
  description: `All fitness articles, guides, and reviews from ${SITE_NAME}.`,
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>
}) {
  const { page, category } = await searchParams
  const currentPage = Math.max(1, parseInt(page ?? '1', 10) || 1)

  const filteredPosts = category ? getPostsByCategory(category) : null
  const { posts, totalPages } = filteredPosts
    ? { posts: filteredPosts, totalPages: 1 }
    : getPaginatedPosts(currentPage)

  const activeCategory = CATEGORIES.find((c) => c.slug === category)

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">All Articles</h1>
        <p className="mt-2 text-zinc-400">
          Evidence-based fitness guides, gear reviews, and training tips.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            !category
              ? 'border-orange-500 bg-orange-500/10 text-orange-400'
              : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog?category=${cat.slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              category === cat.slug
                ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {activeCategory && (
        <p className="mb-6 text-sm text-zinc-500">{activeCategory.description}</p>
      )}

      <PostGrid posts={posts} />

      {!category && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/blog"
        />
      )}

      {posts.length === 0 && (
        <p className="py-12 text-center text-zinc-500">No articles in this category yet.</p>
      )}
    </main>
  )
}
