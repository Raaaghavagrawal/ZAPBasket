"use client";
import { useCart } from '../../components/cart/CartContext';
import { useState, useEffect, useRef } from 'react';
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
  const [showPopup, setShowPopup] = useState(false);
  const popupTimeout = useRef<NodeJS.Timeout | null>(null);
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
      setShowPopup(true);
      clearCart();
      if (popupTimeout.current) clearTimeout(popupTimeout.current);
      popupTimeout.current = setTimeout(() => {
        setShowPopup(false);
        router.push('/shop');
      }, 2500);
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
          setShowPopup(true);
          if (popupTimeout.current) clearTimeout(popupTimeout.current);
          popupTimeout.current = setTimeout(() => {
            setShowPopup(false);
            router.push('/shop');
          }, 2500);
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
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-darkblack rounded-3xl shadow-2xl p-12 flex flex-col items-center max-w-lg w-full border-4 border-green-400 animate-fade-in">
            <div className="mb-6">
              <svg className="w-28 h-28 text-green-500 animate-tick-pop" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="6" fill="none" />
                <path className="tick-path" d="M30 53 L45 68 L70 38" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">Order placed successfully!</h2>
            <p className="text-lg text-center text-secondary dark:text-white mb-2">You will receive tracking details on your email and contact number.</p>
          </div>
          <style jsx>{`
            .animate-fade-in { animation: fadeIn 0.3s; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .animate-tick-pop { animation: tickPop 0.7s cubic-bezier(.68,-0.55,.27,1.55); }
            @keyframes tickPop { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); } }
            .tick-path { stroke-dasharray: 60; stroke-dashoffset: 60; animation: tickDraw 0.7s 0.2s forwards; }
            @keyframes tickDraw { to { stroke-dashoffset: 0; } }
          `}</style>
        </div>
      )}
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