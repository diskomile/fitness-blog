import type { Metadata } from 'next'
import { getPaginatedPosts } from '@/lib/posts'
import { SITE_NAME } from '@/lib/constants'
import PostGrid from '@/components/blog/PostGrid'
import Pagination from '@/components/blog/Pagination'

export const metadata: Metadata = {
  title: 'Blog',
  description: `All fitness articles, guides, and reviews from ${SITE_NAME}.`,
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page ?? '1', 10) || 1)
  const { posts, totalPages } = getPaginatedPosts(currentPage)

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">All Articles</h1>
        <p className="mt-2 text-zinc-400">
          Evidence-based fitness guides, gear reviews, and training tips.
        </p>
      </div>
      <PostGrid posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/blog"
      />
    </main>
  )
}
