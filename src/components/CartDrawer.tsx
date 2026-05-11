"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";
import { X, Minus, Plus, ShoppingBag, Send } from "lucide-react";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { isCartOpen, toggleCart, items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleCheckout = () => {
    if (!name || !address) {
      setShowForm(true);
      return;
    }

    const phoneNumber = "5517992246094"; 
    const message = `*NOVO PEDIDO - MINI MERCADO MARTIN*\n\n` +
      `*Cliente:* ${name}\n` +
      `*Endereço:* ${address}\n\n` +
      `*ITENS:* \n${items
        .map((item) => `• ${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}`)
        .join("\n")}\n\n` +
      `*TOTAL DO PEDIDO: ${formatCurrency(getCartTotal())}*`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[var(--color-brand-orange)]" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[var(--color-brand-dark)]">Sua Cesta</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Mini Mercado Martin</p>
            </div>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[#faf7f3]/30">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 opacity-20" />
              </div>
              <p className="font-medium">Sua cesta está vazia</p>
              <button 
                onClick={toggleCart}
                className="text-[var(--color-brand-green)] font-bold text-sm hover:underline"
              >
                Voltar para as compras
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 shrink-0 border border-gray-50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-sm text-[var(--color-brand-dark)] leading-tight">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-gray-50 rounded-lg p-0.5">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-white hover:shadow-sm text-gray-600 rounded-md transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-white hover:shadow-sm text-gray-600 rounded-md transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-[var(--color-brand-orange)]">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            
            {showForm && (
              <div className="mb-6 space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-[var(--color-brand-dark)] uppercase tracking-wider">Dados para Entrega</h4>
                  <button onClick={() => setShowForm(false)} className="text-[10px] font-bold text-gray-400 hover:text-gray-600">OCULTAR</button>
                </div>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Seu Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[var(--color-brand-green)] transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="Endereço de Entrega (Rua, Número, Bairro)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[var(--color-brand-green)] transition-all"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Subtotal</span>
                <span className="text-2xl font-bold text-[var(--color-brand-dark)]">
                  {formatCurrency(getCartTotal())}
                </span>
              </div>
              {!showForm && (
                <button 
                  onClick={() => setShowForm(true)}
                  className="text-xs font-bold text-[var(--color-brand-green)] border-b-2 border-[var(--color-brand-green)]/30 hover:border-[var(--color-brand-green)] transition-all"
                >
                  PREENCHER DADOS
                </button>
              )}
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-[var(--color-brand-green)] hover:bg-[var(--color-brand-green-dark)] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-900/10"
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <span className="uppercase tracking-wider text-sm">Enviar Pedido via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
