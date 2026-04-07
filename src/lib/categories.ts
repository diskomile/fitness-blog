export interface Category {
  slug: string
  label: string
  color: string
  description: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'workouts',
    label: 'Workouts',
    color: 'orange',
    description: 'Training programs, exercise guides, and workout routines',
  },
  {
    slug: 'nutrition',
    label: 'Nutrition',
    color: 'green',
    description: 'Meal plans, diet tips, and healthy eating guides',
  },
  {
    slug: 'supplements',
    label: 'Supplements',
    color: 'blue',
    description: 'Reviews and guides on protein, creatine, pre-workouts, and more',
  },
  {
    slug: 'gear',
    label: 'Gear & Equipment',
    color: 'purple',
    description: 'Home gym equipment, apparel, and fitness gear reviews',
  },
  {
    slug: 'weight-loss',
    label: 'Weight Loss',
    color: 'red',
    description: 'Fat loss strategies, cardio tips, and transformation guides',
  },
  {
    slug: 'muscle-building',
    label: 'Muscle Building',
    color: 'yellow',
    description: 'Hypertrophy training, progressive overload, and bulking guides',
  },
]

export const CATEGORY_COLOR_MAP: Record<string, string> = {
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  green: 'bg-green-500/20 text-green-400 border-green-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  red: 'bg-red-500/20 text-red-400 border-red-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getCategoryColor(slug: string): string {
  const category = getCategoryBySlug(slug)
  if (!category) return CATEGORY_COLOR_MAP.orange
  return CATEGORY_COLOR_MAP[category.color] ?? CATEGORY_COLOR_MAP.orange
}
