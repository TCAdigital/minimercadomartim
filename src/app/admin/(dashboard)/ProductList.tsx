"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { createProduct, updateProduct, deleteProduct } from "./actions";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice: number | null;
  image: string;
  category: string;
}

export function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData);
    } else {
      await createProduct(formData);
    }
    
    // Simple way to refresh: reload page or use useTransition
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteProduct(id);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Pesquisar produtos..." 
            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-12 pr-4 outline-none focus:border-[var(--color-brand-green)] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-[var(--color-brand-green)] hover:bg-[var(--color-brand-green-dark)] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-900/10"
        >
          <Plus className="w-5 h-5" />
          Novo Produto
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Produto</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg p-1 border border-gray-100 overflow-hidden shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-sm text-[var(--color-brand-dark)]">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-[var(--color-brand-orange)]">{formatCurrency(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-[10px] text-gray-400 line-through">{formatCurrency(product.oldPrice)}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setEditingProduct(product);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-gray-400 hover:text-[var(--color-brand-green)] hover:bg-green-50 rounded-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <ShoppingBag className="w-12 h-12 opacity-10 mb-4" />
            <p>Nenhum produto encontrado</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-[var(--color-brand-dark)]">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="grid gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome do Produto</label>
                <input 
                  name="name" 
                  defaultValue={editingProduct?.name} 
                  required 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[var(--color-brand-green)] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preço (R$)</label>
                  <input 
                    name="price" 
                    type="number" 
                    step="0.01" 
                    defaultValue={editingProduct?.price} 
                    required 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[var(--color-brand-green)] transition-all"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preço Antigo (Opcional)</label>
                  <input 
                    name="oldPrice" 
                    type="number" 
                    step="0.01" 
                    defaultValue={editingProduct?.oldPrice || ""} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[var(--color-brand-green)] transition-all"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Categoria</label>
                <select 
                  name="category" 
                  defaultValue={editingProduct?.category || "Hortifruti"}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[var(--color-brand-green)] transition-all"
                >
                  {["Hortifruti", "Mercearia", "Carnes", "Padaria", "Bebidas", "Limpeza"].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">URL da Imagem</label>
                <input 
                  name="image" 
                  defaultValue={editingProduct?.image} 
                  required 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[var(--color-brand-green)] transition-all"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all uppercase tracking-wider text-xs"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-[var(--color-brand-green)] hover:bg-[var(--color-brand-green-dark)] shadow-lg shadow-green-900/20 transition-all uppercase tracking-wider text-xs"
                >
                  {editingProduct ? "Salvar Alterações" : "Criar Produto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
