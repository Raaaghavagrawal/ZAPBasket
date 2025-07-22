const products = [
  { id: 1, name: "Ultra HD Smart TV", price: 799, description: "Experience cinema-quality visuals at home with vibrant 4K resolution and smart features.", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Wireless Noise-Canceling Headphones", price: 199, description: "Immerse yourself in music with crystal-clear sound and all-day comfort.", image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Smart Fitness Watch", price: 149, description: "Track your health, workouts, and notifications with a sleek, waterproof design.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Premium Cookware Set", price: 249, description: "Cook like a pro with this 10-piece non-stick, induction-ready cookware set.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Children's Adventure Book Set", price: 39, description: "Spark imagination with beautifully illustrated stories for young readers.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80" },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-white">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <img src={product.image} alt={product.name} className="w-80 h-80 object-contain mb-4 rounded-xl shadow-2xl" />
              <span className="font-medium text-xl mb-1 text-secondary dark:text-white text-center">{product.name}</span>
              <span className="text-gray-500 text-base mb-2 text-center">{product.description}</span>
              <span className="text-primary font-bold mb-2 text-center text-lg">${product.price}</span>
              <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/80 transition text-lg font-semibold">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 