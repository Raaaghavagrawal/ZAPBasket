"use client";
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-16 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-secondary dark:text-white font-poppins mt-[100px]">No Orders Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 min-h-screen flex flex-col items-center pb-24">
      <div className="max-w-3xl w-full mb-24">
        <h1 className="text-3xl font-bold mb-10 text-center text-secondary dark:text-white font-poppins mt-[100px]">Your Orders</h1>
        <ul className="space-y-8">
          {orders.map((order, idx) => (
            <li key={idx} className="bg-white dark:bg-darkblack rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-white/10">
              <div className="mb-2 font-semibold text-primary">Order Date: <span className="text-secondary dark:text-white font-normal">{new Date(order.date).toLocaleString()}</span></div>
              <div className="mb-2 text-secondary dark:text-white">Name: <span className="font-medium">{order.name}</span></div>
              <div className="mb-2 text-secondary dark:text-white">Address: <span className="font-medium">{order.address}, {order.city}, {order.zip}</span></div>
              <div className="mb-2 text-secondary dark:text-white">Phone: <span className="font-medium">{order.phone}</span></div>
              <div className="mb-2 text-secondary dark:text-white">Email: <span className="font-medium">{order.email}</span></div>
              <div className="mb-2 text-secondary dark:text-white">Payment: <span className="font-medium capitalize">{order.paymentMethod || 'N/A'}</span></div>
              <div className="mb-4 text-secondary dark:text-white">Total: <span className="font-bold text-primary">${order.total}</span></div>
              <div>
                <span className="font-semibold text-secondary dark:text-white">Items:</span>
                <ul className="ml-4 mt-2 divide-y divide-gray-100 dark:divide-white/10">
                  {order.cart.map((item: any, i: number) => (
                    <li key={item.id} className={`flex justify-between py-2 ${i % 2 === 0 ? 'bg-gray-50 dark:bg-darkblack/80' : 'bg-white dark:bg-darkblack'}`}>
                      <span className="text-secondary dark:text-white">{item.name} x {item.quantity}</span>
                      <span className="text-primary font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 