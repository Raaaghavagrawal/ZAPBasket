"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import ScrollToTop from "../scroll-to-top";
import { CartProvider } from '../cart/CartContext';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    fetch(pathname, { method: "HEAD" }).then((res) => {
      setIs404(res.status === 404);
    });
  }, [pathname]);

  const excludedRoutes = ["/signin", "/signup", "/forgot-password", "/documentation"];
  const hideLayout = excludedRoutes.includes(pathname) || is404;

  return (
    <CartProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
          {!hideLayout && <Header />}
          {children}
          {!hideLayout && <Footer />}
          <ScrollToTop />
        </ThemeProvider>
      </SessionProvider>
    </CartProvider>
  );
} 