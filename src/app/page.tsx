import HeroSection from "./components/home/hero";
import Categories from "./components/home/categories";
import FeaturedProducts from "./components/home/featured-products";
import CustomerReviews from "./components/home/customer-reviews";
import NewsletterSignup from "./components/home/newsletter-signup";
import Portfolio from "./components/home/portfolio";
import StatsFacts from "./components/home/stats-facts";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <StatsFacts />
      <FeaturedProducts />
      <Portfolio />
      <CustomerReviews />
      <NewsletterSignup />
    </>
  );
}
