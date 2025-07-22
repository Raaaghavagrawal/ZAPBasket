const features = [
  { id: 1, icon: "🚚", title: "Fast & Free Delivery", desc: "Get your orders delivered quickly, with free shipping on all purchases." },
  { id: 2, icon: "💳", title: "Secure Payments", desc: "Shop confidently with encrypted, hassle-free payment options." },
  { id: 3, icon: "🔄", title: "Easy Returns", desc: "Not satisfied? Enjoy a 7-day easy return policy on all products." },
  { id: 4, icon: "⭐", title: "Top-Rated Support", desc: "Our friendly team is here 24/7 to help you with any questions." },
  { id: 5, icon: "🎁", title: "Exclusive Deals", desc: "Unlock special offers and discounts every week!" },
];

export default function WhyShopWithUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-secondary dark:text-white">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((f) => (
            <div key={f.id} className="flex flex-col items-center p-6 rounded-xl bg-white dark:bg-darkblack shadow-lg">
              <span className="text-5xl mb-4">{f.icon}</span>
              <span className="font-semibold text-lg mb-2 text-secondary dark:text-white text-center">{f.title}</span>
              <p className="text-gray-700 dark:text-gray-300 text-center">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 