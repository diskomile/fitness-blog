import type { PostMeta } from '@/types/post'
import PostCard from './PostCard'

interface PostGridProps {
  posts: PostMeta[]
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-zinc-500">No posts found.</p>
    )
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
