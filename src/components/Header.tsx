"use client";

import { useCartStore } from "@/store/useCartStore";
import { Search, ShoppingBag, Menu, User, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Header() {
  const { items, toggleCart } = useCartStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
    }`}>
      <div className="border-b border-[var(--color-brand-border)]/50">
        <div className="container-custom flex items-center justify-between py-4 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <img 
              src="/mini-mercado-martin.png" 
              alt="Mini Mercado Martin" 
              className="h-10 md:h-12 w-auto object-contain transform transition-transform group-hover:scale-105"
              onError={(e) => {
                // Fallback visual in case logo.png is not found yet
                const target = e.target as HTMLElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback Text Logo */}
            <div className="hidden flex items-center gap-2">
              <div className="flex gap-0.5 transform transition-transform group-hover:scale-105">
                <span className="w-2 h-4 bg-[var(--color-brand-orange)] rounded-tl-full rounded-br-full -rotate-[20deg]" />
                <span className="w-2 h-4 bg-[var(--color-brand-green)] rounded-tl-full rounded-br-full rotate-[10deg] -translate-y-[3px]" />
              </div>
              <span className="font-serif font-bold text-2xl text-[var(--color-brand-dark)] tracking-tight">
                Mini Mercado <span className="text-[var(--color-brand-green)]">Martin</span>
              </span>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md relative group">
            <input 
              type="text" 
              placeholder="Busque por produtos, categorias..." 
              className="w-full bg-gray-50 border border-gray-200 text-sm rounded-full py-2.5 pl-5 pr-12 outline-none focus:border-[var(--color-brand-green)] focus:ring-2 focus:ring-[var(--color-brand-green)]/20 transition-all"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-[var(--color-brand-green)] text-white w-9 rounded-full flex items-center justify-center hover:bg-[var(--color-brand-green-dark)] transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden lg:flex items-center gap-3 border-r border-gray-200 pr-5">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[var(--color-brand-orange)] bg-orange-50/50">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Entrega</span>
                <span className="text-sm font-bold text-[var(--color-brand-orange)]">GRÁTIS</span>
              </div>
            </div>

            <Link href="/admin" className="p-2 text-gray-600 hover:text-[var(--color-brand-orange)] transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </Link>

            <button 
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-[var(--color-brand-green)] transition-colors group"
            >
              <div className="absolute inset-0 bg-green-50 rounded-full scale-0 group-hover:scale-100 transition-transform -z-10" />
              <ShoppingBag className="w-6 h-6" />
              {isMounted && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-brand-orange)] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>

      {/* Categories Nav - Hidden on mobile */}
      <nav className="hidden md:block bg-[#faf7f3] border-b border-[var(--color-brand-border)]/50">
        <div className="container-custom flex items-center justify-between">
          <ul className="flex items-center">
            <li>
              <Link 
                href="/#vitrine" 
                className="block py-3 px-5 text-sm font-bold text-[var(--color-brand-green)] uppercase tracking-wide flex items-center gap-2"
              >
                Produtos em Destaque
                <span className="bg-[var(--color-brand-orange)] text-white text-[9px] px-1.5 py-0.5 rounded-sm">HOT</span>
              </Link>
            </li>
            {["Hortifruti", "Mercearia", "Carnes", "Padaria", "Bebidas", "Limpeza"].map((cat) => (
              <li key={cat}>
                <Link 
                  href={`/?categoria=${cat}#vitrine`} 
                  className="block py-3 px-5 text-sm font-medium text-[var(--color-brand-dark)] uppercase tracking-wide hover:text-[var(--color-brand-orange)] hover:bg-orange-50/50 transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
