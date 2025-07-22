"use client";
import { getProductById } from '../../../../lib/products';
import { notFound } from 'next/navigation';
import { useCart } from '../../../components/cart/CartContext';
import { useState, use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  if (!product) return notFound();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image.replace('/public', '')} alt={product.name} className="w-96 h-96 object-cover rounded" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="mb-4">{product.description}</p>
          <span className="block font-bold text-2xl mb-4">${product.price}</span>
          <span className="block mb-4">Category: {product.category}</span>
          <span className="block mb-4">In Stock: {product.stock}</span>
          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="quantity" className="mr-2">Qty:</label>
            <input id="quantity" type="number" min={1} max={product.stock} value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-16 border rounded px-2 py-1" />
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={() => addToCart(product, quantity)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 