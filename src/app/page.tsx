import { getFeaturedPosts } from '@/lib/posts'
import HeroSection from '@/components/home/HeroSection'
import FeaturedPosts from '@/components/home/FeaturedPosts'
import CategoryGrid from '@/components/home/CategoryGrid'
import PopularTools from '@/components/home/PopularTools'
import NewsletterForm from '@/components/newsletter/NewsletterForm'

export default function HomePage() {
  const featured = getFeaturedPosts(6)

  return (
    <>
      <HeroSection />
      <FeaturedPosts posts={featured} />
      <PopularTools />
      <CategoryGrid />
      <section className="mx-auto max-w-2xl px-4 py-16">
        <NewsletterForm />
      </section>
    </>
  )
}
