import { getFeaturedPosts } from '@/lib/posts'
import HeroSection from '@/components/home/HeroSection'
import FeaturedPosts from '@/components/home/FeaturedPosts'
import CategoryGrid from '@/components/home/CategoryGrid'

export default function HomePage() {
  const featured = getFeaturedPosts(6)

  return (
    <>
      <HeroSection />
      <FeaturedPosts posts={featured} />
      <CategoryGrid />
    </>
  )
}
