import Link from 'next/link'
import type { PostMeta } from '@/types/post'
import CategoryBadge from './CategoryBadge'

interface PostCardProps {
  post: PostMeta
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-orange-500/50">
      <div className="mb-3 flex items-center gap-2">
        <CategoryBadge category={post.category} />
        {post.readingTime && (
          <span className="text-xs text-zinc-500">{post.readingTime} min read</span>
        )}
      </div>
      <h2 className="mb-2 text-lg font-bold leading-snug text-white group-hover:text-orange-400 transition-colors">
        <Link href={`/blog/${post.slug}`} className="stretched-link">
          {post.title}
        </Link>
      </h2>
      <p className="mb-4 line-clamp-2 flex-1 text-sm text-zinc-400">
        {post.description}
      </p>
      <div className="flex items-center justify-between">
        <time className="text-xs text-zinc-600" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </time>
        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
