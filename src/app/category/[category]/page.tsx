import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByCategory } from '@/lib/posts'
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories'
import PostGrid from '@/components/blog/PostGrid'
import CategoryBadge from '@/components/blog/CategoryBadge'

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) return {}
  return {
    title: cat.label,
    description: cat.description,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) notFound()

  const posts = getPostsByCategory(category)

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <div className="mb-3">
          <CategoryBadge category={category} linked={false} />
        </div>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{cat.label}</h1>
        <p className="mt-2 text-zinc-400">{cat.description}</p>
      </div>
      <PostGrid posts={posts} />
      {posts.length === 0 && (
        <p className="text-center text-zinc-500 py-12">
          No articles yet in this category. Check back soon!
        </p>
      )}
    </main>
  )
}
