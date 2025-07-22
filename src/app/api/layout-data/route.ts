import { NextResponse } from "next/server";

const MenuData = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Shop",
    path: "/shop",
    newTab: false,
  },
  {
    id: 3,
    title: "Cart",
    path: "/cart",
    newTab: false,
  },
  {
    id: 4,
    title: "Orders",
    path: "/orders",
    newTab: false,
  },
  {
    id: 6,
    title: "Contact",
    path: "/contact",
    newTab: false,
  }
];


const footerData = {
    name: "ZAPBASKET",
    tagline: "Build something together?",
    info: [
        {
            icon: "/images/footer/email-arrow.svg",
            link: "info@wrappixel.com",
            href: "https://www.wrappixel.com/"
        },
        {
            icon: "/images/footer/Location.svg",
            link: "Zwolle Netherlands",
            href: "https://maps.app.goo.gl/hpDp81fqzGt5y4bC8"
        }
    ],
    links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/#services" },
        { name: "Work", href: "/projects" },
        { name: "Terms", href: "/terms-and-conditions" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Error 404", href: "/not-found" }
    ],
    socialLinks: [
        { name: "Facebook", href: "https://www.facebook.com/" },
        { name: "Instagram", href: "https://www.instagram.com/" },
        { name: "Twitter", href: "https://x.com/" }
    ],
    copyright: "© ZAPBASKET copyright 2025"
};

export const GET = async () => {
    return NextResponse.json({
        footerData,
        MenuData
    });
};