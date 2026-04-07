import Link from 'next/link'
import { getCategoryBySlug, getCategoryColor } from '@/lib/categories'

interface CategoryBadgeProps {
  category: string
  linked?: boolean
}

export default function CategoryBadge({ category, linked = true }: CategoryBadgeProps) {
  const cat = getCategoryBySlug(category)
  const colorClasses = getCategoryColor(category)
  const label = cat?.label ?? category

  const badge = (
    <span
      className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${colorClasses}`}
    >
      {label}
    </span>
  )

  if (linked) {
    return <Link href={`/category/${category}`}>{badge}</Link>
  }
  return badge
}
