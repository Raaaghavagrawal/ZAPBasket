const products = [
  { id: 1, name: "Smartphone", price: 499, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Headphones", price: 99, image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Sneakers", price: 79, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Cookware Set", price: 120, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Children's Book", price: 15, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-white">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center bg-white dark:bg-darkblack rounded-lg shadow p-4">
              <img src={product.image} alt={product.name} className="w-24 h-24 object-contain mb-2" />
              <span className="font-medium text-lg mb-1 text-secondary dark:text-white">{product.name}</span>
              <span className="text-primary font-bold mb-2">${product.price}</span>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 