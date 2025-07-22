import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="bg-secondary pt-6 md:pt-10 xl:pt-16">
        <div className="container">
          <div className="flex flex-col xl:flex-row gap-10 xl:gap-0 justify-between items-start">
            {/* Logo and About */}
            <div className="flex flex-col gap-6 xl:max-w-md w-full">
              <Link href="/" className="mb-4 inline-block">
                <Image src="/images/logo/WhiteLogo.svg" alt="ZAPBASKET Logo" width={180} height={32} />
              </Link>
              <p className="text-white/80 text-lg max-w-md">
                ZAPBASKET is your one-stop online shop for electronics, fashion, home essentials, books, toys, and more. Enjoy fast delivery, top brands, and unbeatable deals every day!
              </p>
            </div>
            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 w-full xl:w-auto">
              <div>
                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                <ul className="flex flex-col gap-2">
                  <li><Link href="/shop" className="text-white/80 hover:text-primary">Shop</Link></li>
                  <li><Link href="/cart" className="text-white/80 hover:text-primary">Cart</Link></li>
                  <li><Link href="/orders" className="text-white/80 hover:text-primary">Orders</Link></li>
                  <li><Link href="/contact" className="text-white/80 hover:text-primary">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Customer Service</h4>
                <ul className="flex flex-col gap-2">
                  <li><Link href="/privacy-policy" className="text-white/80 hover:text-primary">Privacy Policy</Link></li>
                  <li><Link href="/terms-and-conditions" className="text-white/80 hover:text-primary">Terms & Conditions</Link></li>
                  <li><Link href="/faq" className="text-white/80 hover:text-primary">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Follow Us</h4>
                <div className="flex gap-4 mt-2">
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">
                    <Image src="/images/socialIcon/linkedin-icon.svg" alt="Facebook" width={28} height={28} />
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
                    <Image src="/images/socialIcon/twitter-icon.svg" alt="Instagram" width={28} height={28} />
                  </a>
                  <a href="https://x.com/" target="_blank" rel="noopener" aria-label="Twitter">
                    <Image src="/images/socialIcon/linkedin-icon.svg" alt="Twitter" width={28} height={28} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/20 pt-6 text-center">
            <p className="text-white/60 text-sm">&copy; {new Date().getFullYear()} ZAPBASKET.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;