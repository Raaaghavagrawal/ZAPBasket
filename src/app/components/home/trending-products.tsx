const trending = [
  { id: 1, name: "Wireless Earbuds", price: 59, image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Smart Watch", price: 129, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Yoga Mat", price: 25, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
];

export default function TrendingProducts() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-white">Trending Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {trending.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-44 h-44 object-contain mb-4 rounded-lg shadow-lg" />
              <span className="font-medium text-lg mb-1 text-secondary dark:text-white text-center">{item.name}</span>
              <span className="text-primary font-bold mb-2 text-center">${item.price}</span>
              <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/80 transition">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 