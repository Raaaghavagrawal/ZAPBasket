"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Replace Project type and API fetch with static favorite products for shopping website

type FavoriteProduct = {
    name: string;
    description: string;
    image: string;
    price: number;
};

const favorites: FavoriteProduct[] = [
    {
        name: "Deluxe Espresso Machine",
        description: "Brew barista-quality coffee at home with one-touch controls and a sleek design.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
        price: 349,
    },
    {
        name: "Wireless Earbuds Pro",
        description: "Enjoy crystal-clear sound and all-day comfort with noise cancellation.",
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=900&q=80",
        price: 129,
    },
    {
        name: "Smart LED TV 55''",
        description: "Transform your living room with vibrant 4K visuals and built-in streaming apps.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80",
        price: 699,
    },
    {
        name: "Premium Yoga Mat",
        description: "Stay fit and comfortable with this non-slip, eco-friendly yoga mat.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
        price: 39,
    },
    {
        name: "Kids' Adventure Book Set",
        description: "Inspire young minds with beautifully illustrated stories for all ages.",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
        price: 29,
    },
];

const Projectswiper = () => {
    return (
        <Swiper
            loop
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            slidesPerView={1}
            breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            modules={[Autoplay]}
            className="mySwiper"
        >
            {favorites.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="flex flex-col items-center bg-white dark:bg-darkblack rounded-2xl shadow-xl p-8 mx-2">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-72 h-72 object-contain mb-6 rounded-xl shadow-lg"
                        />
                        <h3 className="text-xl font-bold text-secondary dark:text-white mb-2 text-center">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2 text-center">{item.description}</p>
                        <span className="text-primary font-bold text-lg mb-2 text-center">${item.price}</span>
                        <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/80 transition">View Product</button>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Projectswiper;
