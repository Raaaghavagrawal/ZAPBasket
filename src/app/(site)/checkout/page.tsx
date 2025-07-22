"use client";
import { useCart } from '../../components/cart/CartContext';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cod'>('stripe');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Prefill address from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('checkoutAddress');
    if (stored) setForm(JSON.parse(stored));
  }, []);

  // Update localStorage when address changes
  useEffect(() => {
    localStorage.setItem('checkoutAddress', JSON.stringify(form));
  }, [form]);

  // Handle Stripe redirect
  if (typeof window !== 'undefined') {
    if (params.get('success')) {
      setSuccess('Payment successful! Order placed.');
      clearCart();
      setTimeout(() => router.push('/shop'), 2000);
    }
    if (params.get('canceled')) {
      setError('Payment canceled.');
    }
  }

  // Save order to localStorage
  function saveOrder(order: any) {
    const prev = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([{ ...order, date: new Date(), cart }, ...prev]));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (Object.values(form).some((v) => !v)) {
      setError('Please fill all fields.');
      return;
    }
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    setLoading(true);
    try {
      if (paymentMethod === 'stripe') {
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart, form }),
        });
        const result = await res.json();
        if (result.url) {
          saveOrder({ ...form, total, paymentMethod, cart });
          window.location.href = result.url;
        } else {
          setError(result.error || 'Failed to start payment.');
        }
      } else {
        // Cash on Delivery
        const res = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, cart, total }),
        });
        const result = await res.json();
        if (result.success) {
          saveOrder({ ...form, total, paymentMethod, cart });
          clearCart();
          setSuccess('Order placed successfully!');
          setTimeout(() => router.push('/shop'), 2000);
        } else {
          setError(result.error || 'Failed to place order.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-16 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-darkblack rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-secondary dark:text-white font-poppins mt-[100px]">Checkout</h1>
        <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 gap-4">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="border rounded px-4 py-3 text-lg text-black dark:text-white bg-white dark:bg-darkblack" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border rounded px-4 py-3 text-lg text-black dark:text-white bg-white dark:bg-darkblack" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border rounded px-4 py-3 text-lg text-black dark:text-white bg-white dark:bg-darkblack" />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border rounded px-4 py-3 text-lg text-black dark:text-white bg-white dark:bg-darkblack" />
          <div className="flex gap-4">
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border rounded px-4 py-3 text-lg text-black dark:text-white bg-white dark:bg-darkblack w-1/2" />
            <input name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} className="border rounded px-4 py-3 text-lg text-black dark:text-white bg-white dark:bg-darkblack w-1/2" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-2">
            <label className="font-semibold text-secondary dark:text-white">Payment Method:</label>
            <label className="flex items-center gap-2"><input type="radio" name="paymentMethod" value="stripe" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} /> Card (Stripe)</label>
            <label className="flex items-center gap-2"><input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> Cash on Delivery</label>
          </div>
          {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
          {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
          <button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition text-lg font-semibold mt-2" disabled={loading}>{loading ? (paymentMethod === 'stripe' ? 'Redirecting...' : 'Placing Order...') : (paymentMethod === 'stripe' ? 'Pay Now' : 'Place Order')}</button>
        </form>
        <div className="border-t border-gray-200 dark:border-white/10 pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-secondary dark:text-white">Order Summary</h2>
          <ul className="mb-2 divide-y divide-gray-100 dark:divide-white/10">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between py-2">
                <span className="text-secondary dark:text-white">{item.name} x {item.quantity}</span>
                <span className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold text-lg text-right text-secondary dark:text-white">Total: ${total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
} 