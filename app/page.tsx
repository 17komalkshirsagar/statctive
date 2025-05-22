simport { HeroSection } from '@/components/sections/hero-section';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { CategoriesShowcase } from '@/components/sections/categories-showcase';
import { NewArrivals } from '@/components/sections/new-arrivals';
import { NewsletterSection } from '@/components/sections/newsletter-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <CategoriesShowcase />
      <NewArrivals />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}