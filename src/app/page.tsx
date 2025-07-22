import HeroSection from "./components/home/hero";
import Categories from "./components/home/categories";
import FeaturedProducts from "./components/home/featured-products";
import TopDeals from "./components/home/top-deals";
import TrendingProducts from "./components/home/trending-products";
import CustomerReviews from "./components/home/customer-reviews";
import NewsletterSignup from "./components/home/newsletter-signup";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <TopDeals />
      <TrendingProducts />
      <CustomerReviews />
      <NewsletterSignup />
    </>
  );
}
