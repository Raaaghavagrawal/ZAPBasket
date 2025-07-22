'use client';
import { products as baseProducts } from '../../../lib/products';
import type { Product } from '../../../lib/products';
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import { useState } from 'react';
import { useCart } from '../../components/cart/CartContext';

// Add more products for a fuller grid
const products = [
  ...baseProducts,
  {
    id: '7',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life.',
    price: 25,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    category: 'Electronics',
    stock: 50,
  },
  {
    id: '8',
    name: 'Coffee Maker',
    description: 'Brew the perfect cup every time with this modern coffee maker.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    category: 'Home & Kitchen',
    stock: 30,
  },
  {
    id: '9',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with deep bass and long battery life.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
    category: 'Electronics',
    stock: 40,
  },
  {
    id: '10',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for all types of workouts.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    category: 'Sports',
    stock: 60,
  },
  {
    id: '11',
    name: 'Classic Novel',
    description: 'A must-read classic for every book lover.',
    price: 12,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    category: 'Books',
    stock: 100,
  },
  {
    id: '12',
    name: 'Kids Toy Car',
    description: 'Fun and safe toy car for kids.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    category: 'Toys',
    stock: 80,
  },
];

// Group products by category
const productsByCategory = products.reduce((acc: Record<string, Product[]>, product) => {
  if (!acc[product.category]) acc[product.category] = [];
  acc[product.category].push(product);
  return acc;
}, {} as Record<string, Product[]>);

const categories = [
  'All Products',
  ...Object.keys(productsByCategory)
];

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const { addToCart } = useCart();

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  // Filter products to show
  const productsToShow =
    selectedCategory === 'All Products'
      ? products
      : productsByCategory[selectedCategory] || [];

  return (
    <>
      <Header />
      <div className="container mx-auto py-12 mt-60 min-h-screen bg-lightgray dark:bg-secondary rounded-xl shadow-lg mb-20">
        <h1 className="text-4xl font-bold mb-10 text-center text-secondary dark:text-white mt-[100px]">Shop</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full font-semibold border transition text-secondary dark:text-white ${selectedCategory === cat ? 'bg-primary border-primary text-black' : 'bg-white dark:bg-darkblack border-gray-300 dark:border-gray-700 hover:bg-primary/20'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {productsToShow.map((product) => (
            <div key={product.id} className="border rounded-2xl p-6 flex flex-col items-center bg-white dark:bg-darkblack shadow hover:shadow-lg transition">
              <img src={product.image.replace('/public', '')} alt={product.name} className="w-48 h-48 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-2 text-center text-secondary dark:text-white">{product.name}</h3>
              <p className="mb-2 text-center text-gray-700 dark:text-gray-300">{product.description}</p>
              <span className="font-bold text-lg mb-2 text-primary">${product.price}</span>
              <button
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                onClick={() => handleOpenModal(product)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        {/* Modal Popup */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backdropFilter: 'blur(8px)' }}>
            <div className="bg-white dark:bg-darkblack rounded-3xl shadow-2xl p-12 max-w-3xl w-full relative flex flex-col items-center text-black dark:text-white">
              <button
                className="absolute top-6 right-6 text-3xl text-gray-500 hover:text-primary"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <img src={selectedProduct.image.replace('/public', '')} alt={selectedProduct.name} className="w-80 h-80 object-cover mb-6 rounded-xl" />
              <h2 className="text-3xl font-bold mb-2 text-center text-secondary dark:text-white">{selectedProduct.name}</h2>
              <p className="mb-4 text-center text-gray-700 dark:text-gray-300">{selectedProduct.description}</p>
              <span className="block font-bold text-2xl mb-2 text-primary text-center">${selectedProduct.price}</span>
              <span className="block mb-2 text-center">Category: {selectedProduct.category}</span>
              <span className="block mb-6 text-center">In Stock: {selectedProduct.stock}</span>
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-2xl font-bold flex items-center justify-center hover:bg-primary hover:text-white transition"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  max={selectedProduct.stock}
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, Math.min(selectedProduct.stock, Number(e.target.value))))}
                  className="w-16 text-center border rounded px-2 py-1 text-lg text-black dark:text-white bg-white dark:bg-darkblack"
                />
                <button
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-2xl font-bold flex items-center justify-center hover:bg-primary hover:text-white transition"
                  onClick={() => setQuantity(q => Math.min(selectedProduct.stock, q + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition text-lg font-semibold block mx-auto"
                onClick={() => {
                  if (selectedProduct) {
                    addToCart(selectedProduct, quantity);
                    setSelectedProduct(null);
                  }
                }}
              >
                Add {quantity} to Cart
              </button>
            </div>
          </div>
        )}
        <div className="h-20" />
      </div>
    </>
  );
} 