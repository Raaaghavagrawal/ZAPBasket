"use client";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-12">
      <div className="container mx-auto max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-secondary dark:text-white">Subscribe to our Newsletter</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border rounded text-black dark:text-white bg-white dark:bg-darkblack"
            required
          />
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80">
            Subscribe
          </button>
        </form>
        {submitted && <p className="text-green-600 mt-2 text-center">Thank you for subscribing!</p>}
      </div>
    </section>
  );
} 