"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-black text-orange-800 italic font-headline tracking-tight">
          KQ Foods
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-orange-800 font-bold border-b-2 border-orange-600 font-headline text-sm tracking-tight transition-all duration-300" href="/">
            Home
          </Link>
          <Link className="text-zinc-600 hover:text-orange-700 font-headline text-sm tracking-tight transition-all duration-300" href="/marketplace">
            Market
          </Link>
          <Link className="text-zinc-600 hover:text-orange-700 font-headline text-sm tracking-tight transition-all duration-300" href="/orders">
            Orders
          </Link>
          <Link className="text-zinc-600 hover:text-orange-700 font-headline text-sm tracking-tight transition-all duration-300" href="/vendors">
            Vendors
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-orange-50 transition-all duration-300 rounded-full active:scale-95 text-orange-700">
            <span className="material-symbols-outlined">location_on</span>
          </button>
          <div className="flex items-center gap-2">
            <Link href="/cart" className="p-2 hover:bg-orange-50 transition-all rounded-full active:scale-95 relative group">
              <span className="material-symbols-outlined text-zinc-600 group-hover:text-primary transition-colors">shopping_cart</span>
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link href="/auth/login" className="hidden md:flex bg-primary text-on-primary px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-orange-900/10 hover:brightness-110 active:scale-95 transition-all">
              Login
            </Link>
          </div>
          <button className="p-2 hover:bg-orange-50 transition-all duration-300 rounded-full active:scale-95 text-orange-700">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
