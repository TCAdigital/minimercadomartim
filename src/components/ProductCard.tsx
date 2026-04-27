"use client";

import { Product } from "@/store/useCartStore";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";
import { Plus, Check } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCartStore();
  const [added, setAdded] = useState(false);

  const cartItem = items.find((item) => item.id === product.id);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
      {product.oldPrice && (
        <span className="absolute top-3 left-3 bg-[var(--color-brand-green)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md z-10">
          Oferta
        </span>
      )}
      
      <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-xl bg-gray-50/50 p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-1 text-center">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
          {product.category}
        </span>
        <h3 className="font-medium text-[var(--color-brand-dark)] text-sm mb-2 flex-1 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-end justify-center gap-2 mb-4">
          <span className="font-bold text-lg text-[var(--color-brand-orange)]">
            {formatCurrency(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through mb-1">
              {formatCurrency(product.oldPrice)}
            </span>
          )}
        </div>

        <button 
          onClick={handleAdd}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            added 
              ? "bg-green-100 text-green-700" 
              : "bg-gray-50 text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-green)] hover:text-white border border-gray-100"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Adicionado
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Adicionar {cartItem ? `(${cartItem.quantity})` : ""}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
