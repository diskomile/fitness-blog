import Link from 'next/link'
import type { PostMeta } from '@/types/post'
import PostGrid from '@/components/blog/PostGrid'

interface FeaturedPostsProps {
  posts: PostMeta[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-white">Latest Articles</h2>
        <Link
          href="/blog"
          className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
        >
          View all →
        </Link>
      </div>
      <PostGrid posts={posts} />
    </section>
  )
}
