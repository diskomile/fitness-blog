import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Post, PostMeta } from '@/types/post'
import { POSTS_PER_PAGE } from './constants'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function slugFromFilename(filename: string): string {
  // Strip date prefix: "2026-04-07-best-pre-workouts.mdx" -> "best-pre-workouts"
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '')
}

function getAllPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .sort()
    .reverse()
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllPostFiles().map((filename) => {
    const filePath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const slug = (data.slug as string) || slugFromFilename(filename)
    const stats = readingTime(content)
    return {
      ...(data as Omit<PostMeta, 'slug' | 'readingTime'>),
      slug,
      readingTime: Math.ceil(stats.minutes),
    }
  })
}

export function getPostBySlug(slug: string): Post | null {
  const files = getAllPostFiles()
  const filename = files.find((f) => {
    const fileSlug = slugFromFilename(f)
    return fileSlug === slug
  })
  if (!filename) return null

  const filePath = path.join(POSTS_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const stats = readingTime(content)
  return {
    ...(data as Omit<Post, 'slug' | 'readingTime' | 'content'>),
    slug,
    content,
    readingTime: Math.ceil(stats.minutes),
  }
}

export function getAllSlugs(): string[] {
  return getAllPostFiles().map((f) => slugFromFilename(f))
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.category === category)
}

export function getPaginatedPosts(page: number): {
  posts: PostMeta[]
  totalPages: number
  currentPage: number
} {
  const all = getAllPostsMeta()
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * POSTS_PER_PAGE
  return {
    posts: all.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    currentPage,
  }
}

export function getFeaturedPosts(count: number): PostMeta[] {
  return getAllPostsMeta().slice(0, count)
}

export function getRelatedPosts(currentSlug: string, category: string, count = 3): PostMeta[] {
  const all = getAllPostsMeta()
  // Same category, excluding current post
  const sameCat = all.filter((p) => p.category === category && p.slug !== currentSlug)
  if (sameCat.length >= count) return sameCat.slice(0, count)
  // Fill remaining with latest posts from other categories
  const others = all.filter((p) => p.category !== category && p.slug !== currentSlug)
  return [...sameCat, ...others].slice(0, count)
}
