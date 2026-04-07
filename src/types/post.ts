export interface AffiliateProduct {
  name: string
  url: string
  price?: string
  badge?: string
  network: 'amazon' | 'clickbank'
}

export interface PostMeta {
  title: string
  slug: string
  date: string
  category: string
  description: string
  tags: string[]
  coverImage?: string
  affiliate_products?: AffiliateProduct[]
  readingTime?: number
}

export interface Post extends PostMeta {
  content: string
}
