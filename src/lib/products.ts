// Simple in-memory product data for MVP. Replace with DB integration for production.
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 99.99,
    image: '/public/images/home/portfolio/portfolio_img_1.png',
    category: 'Electronics',
    stock: 20,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smart watch with health tracking.',
    price: 149.99,
    image: '/public/images/home/portfolio/portfolio_img_2.png',
    category: 'Electronics',
    stock: 15,
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Comfortable and durable running shoes for all terrains.',
    price: 79.99,
    image: '/public/images/home/portfolio/portfolio_img_3.png',
    category: 'Footwear',
    stock: 30,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
} 