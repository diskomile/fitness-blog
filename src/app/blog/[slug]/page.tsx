import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { SITE_URL } from '@/lib/constants'
import AffiliateBox from '@/components/mdx/AffiliateBox'
import ProTip from '@/components/mdx/ProTip'
import CategoryBadge from '@/components/blog/CategoryBadge'
import FtcDisclosure from '@/components/blog/FtcDisclosure'
import ArticleSchema from '@/components/seo/ArticleSchema'
import RelatedPosts from '@/components/blog/RelatedPosts'
import ReadingProgressBar from '@/components/blog/ReadingProgressBar'
import ShareButtons from '@/components/blog/ShareButtons'

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

  const related = getRelatedPosts(slug, post.category)

  const postUrl = `${SITE_URL}/blog/${post.slug}`

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <ReadingProgressBar />
      <ArticleSchema
        title={post.title}
        description={post.description ?? ''}
        slug={post.slug}
        date={post.date}
        tags={post.tags}
      />
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-zinc-500" aria-label="Breadcrumb">
        <a href="/" className="hover:text-zinc-300 transition-colors">Home</a>
        <span>/</span>
        <a href="/blog" className="hover:text-zinc-300 transition-colors">Blog</a>
        <span>/</span>
        <a href={`/category/${post.category}`} className="capitalize hover:text-zinc-300 transition-colors">{post.category.replace('-', ' ')}</a>
        <span>/</span>
        <span className="text-zinc-400 truncate max-w-[200px]">{post.title}</span>
      </nav>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
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
        <div className="mt-5">
          <ShareButtons title={post.title} url={postUrl} />
        </div>
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

      <div className="mt-10 border-t border-zinc-800 pt-6">
        <ShareButtons title={post.title} url={postUrl} />
      </div>

      <RelatedPosts posts={related} />
    </article>
  )
}
