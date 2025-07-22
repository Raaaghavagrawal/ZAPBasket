const deals = [
  { id: 1, name: "4K TV", price: 299, oldPrice: 499, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Bluetooth Speaker", price: 39, oldPrice: 79, image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Running Shoes", price: 49, oldPrice: 99, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
];

export default function TopDeals() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-white">Top Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="flex flex-col items-center">
              <img src={deal.image} alt={deal.name} className="w-44 h-44 object-contain mb-4 rounded-lg shadow-lg" />
              <span className="font-medium text-lg mb-1 text-secondary dark:text-white text-center">{deal.name}</span>
              <span className="text-gray-500 line-through text-center">${deal.oldPrice}</span>
              <span className="text-primary font-bold mb-2 text-center">${deal.price}</span>
              <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/80 transition">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 