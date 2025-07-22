"use client";
import { products } from '../../../lib/products';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx} className="border-t">
                <td>{new Date(order.date).toLocaleString()}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.address}, {order.city}, {order.zip}</td>
                <td>${order.total}</td>
                <td>
                  <ul className="list-disc ml-4">
                    {order.cart.map((item: any) => (
                      <li key={item.id}>{item.name} x {item.quantity} (${item.price})</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
} 