const categories = [
  { name: "Electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" },
  { name: "Fashion", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { name: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
  { name: "Toys", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
];

export default function Categories() {
  return (
    <section className="py-12 ">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-white">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center">
              <img src={cat.image} alt={cat.name} className="w-44 h-44 object-contain mb-4 rounded-lg shadow-lg" />
              <span className="font-medium text-lg text-secondary dark:text-white text-center">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 