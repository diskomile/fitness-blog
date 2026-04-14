import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllSlugs, getPostBySlug } from '@/lib/posts'
import { SITE_URL } from '@/lib/constants'
import { getCategoryBySlug, getCategoryColor } from '@/lib/categories'
import AffiliateBox from '@/components/mdx/AffiliateBox'
import ProTip from '@/components/mdx/ProTip'
import CategoryBadge from '@/components/blog/CategoryBadge'
import FtcDisclosure from '@/components/blog/FtcDisclosure'
import ArticleSchema from '@/components/seo/ArticleSchema'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      tags: post.tags,
    },
  }
}

const mdxComponents = {
  AffiliateBox,
  ProTip,
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const category = getCategoryBySlug(post.category)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <ArticleSchema
        title={post.title}
        description={post.description ?? ''}
        slug={post.slug}
        date={post.date}
        tags={post.tags}
      />
      <header className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <CategoryBadge category={post.category} />
          <span className="text-sm text-zinc-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          {post.readingTime && (
            <span className="text-sm text-zinc-500">
              · {post.readingTime} min read
            </span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 text-lg text-zinc-400">{post.description}</p>
        )}
      </header>

      <FtcDisclosure />

      <div className="prose prose-invert prose-orange max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-orange-400 prose-strong:text-white prose-code:text-orange-300 prose-th:text-white prose-td:text-zinc-300">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </article>
  )
}
