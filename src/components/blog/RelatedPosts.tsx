import Link from 'next/link'
import type { PostMeta } from '@/types/post'
import CategoryBadge from './CategoryBadge'

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 border-t border-zinc-800 pt-10">
      <h2 className="mb-6 text-xl font-bold text-white">Related Articles</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-orange-500/40 hover:bg-zinc-800 transition-all"
          >
            <div className="mb-2 flex items-center gap-2">
              <CategoryBadge category={post.category} />
              {post.readingTime && (
                <span className="text-xs text-zinc-500">{post.readingTime} min</span>
              )}
            </div>
            <h3 className="text-sm font-semibold leading-snug text-zinc-200 group-hover:text-white transition-colors line-clamp-3">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
