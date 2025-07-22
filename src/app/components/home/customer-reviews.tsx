const reviews = [
  { id: 1, name: "Amit", review: "Great shopping experience! Fast delivery and quality products." },
  { id: 2, name: "Priya", review: "Amazing deals and a huge variety. Will shop again!" },
  { id: 3, name: "Rahul", review: "Customer support was very helpful. Highly recommend." },
];

export default function CustomerReviews() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-white">Customer Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="flex flex-col items-center bg-white dark:bg-darkblack rounded-lg shadow p-6">
              <span className="text-lg font-semibold mb-2 text-secondary dark:text-white">{r.name}</span>
              <p className="text-gray-700 dark:text-gray-300 italic">"{r.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 