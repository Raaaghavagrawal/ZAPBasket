"use client";
import { useCart } from '../../components/cart/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-16 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-secondary dark:text-white">Your Cart is Empty</h1>
        <Link href="/shop" className="bg-primary text-black font-semibold px-6 py-2 rounded-full hover:bg-primary/80 transition mt-4">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-center text-secondary dark:text-white mt-[100px]">Shopping Cart</h1>
      <div className="bg-white dark:bg-darkblack rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <table className="w-full mb-8 text-base">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-3 text-secondary dark:text-white">Product</th>
              <th className="pb-3 text-secondary dark:text-white">Price</th>
              <th className="pb-3 text-secondary dark:text-white">Quantity</th>
              <th className="pb-3 text-secondary dark:text-white">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={item.id} className={`border-t align-middle ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-darkblack/80' : 'bg-white dark:bg-darkblack'}` }>
                <td className="py-4 flex items-center gap-4">
                  <img src={item.image.replace('/public', '')} alt={item.name} className="w-16 h-16 object-cover rounded shadow" />
                  <span className="font-semibold text-secondary dark:text-white">{item.name}</span>
                </td>
                <td className="text-center text-primary font-bold">${item.price}</td>
                <td className="text-center">
                  <input
                    type="number"
                    min={1}
                    max={item.stock}
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 text-center text-black dark:text-white bg-white dark:bg-darkblack"
                  />
                </td>
                <td className="text-center font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="text-center">
                  <button
                    className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 px-3 py-1 rounded font-semibold transition"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-white/10 pt-6 mt-6">
          <button className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 px-4 py-2 rounded font-semibold transition" onClick={clearCart}>Clear Cart</button>
          <span className="text-2xl font-bold text-secondary dark:text-white">Total: ${total.toFixed(2)}</span>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4">
          <Link href="/shop" className="bg-primary text-black font-semibold px-8 py-3 rounded-full hover:bg-primary/80 transition text-lg shadow">Shop More</Link>
          <Link href="/checkout" className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition text-lg font-semibold shadow">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
} 