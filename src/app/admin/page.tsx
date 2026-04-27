"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, LogOut, Package, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

// Mock data
const initialProducts = [
  { id: "1", name: "Tomate Carmem Selecionado (kg)", price: 6.99, oldPrice: 8.99, category: "Hortifruti", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80" },
  { id: "2", name: "Banana Prata Orgânica (kg)", price: 5.49, category: "Hortifruti", image: "https://images.unsplash.com/photo-1571501474554-25b0f4439169?w=400&q=80" },
];

const initialBanners = [
  { id: "1", type: "Hero Slider", title: "O melhor hortifruti", status: "Ativo", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=400&auto=format&fit=crop" },
  { id: "2", type: "Hero Slider", title: "Frescor orgânico", status: "Ativo", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop" },
  { id: "3", type: "Banner Duplo", title: "Cesta Básica", status: "Ativo", image: "https://images.unsplash.com/photo-1543168256-4154204ceaff?q=80&w=400&auto=format&fit=crop" },
  { id: "4", type: "Promo Slider", title: "Compras acima de R$ 150", status: "Ativo", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop" },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"produtos" | "banners">("produtos");
  
  const [products] = useState(initialProducts);
  const [banners] = useState(initialBanners);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-[var(--color-brand-dark)]">Acesso Restrito</h1>
            <p className="text-gray-500 mt-2 text-sm">Painel do Mini Mercado Martin</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-green)]"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-[var(--color-brand-dark)] text-white font-bold py-3 rounded-xl hover:bg-black transition-colors">
              Entrar no Painel
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-[var(--color-brand-orange)] text-sm font-medium hover:underline">
              Voltar para a Loja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200">
          <span className="font-serif font-bold text-xl text-[var(--color-brand-dark)]">Painel Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("produtos")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === "produtos" 
                ? "bg-[var(--color-brand-green)]/10 text-[var(--color-brand-green-dark)]" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Package className="w-5 h-5" />
            Produtos
          </button>
          <button 
            onClick={() => setActiveTab("banners")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === "banners" 
                ? "bg-[var(--color-brand-green)]/10 text-[var(--color-brand-green-dark)]" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Banners e Sliders
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl font-medium w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === "produtos" ? "Gerenciar Produtos" : "Gerenciar Banners"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === "produtos" 
                ? "Adicione, edite ou remova produtos da loja" 
                : "Controle as imagens e textos de destaque na página inicial"}
            </p>
          </div>
          <button className="bg-[var(--color-brand-green)] hover:bg-[var(--color-brand-green-dark)] text-white px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            {activeTab === "produtos" ? "Novo Produto" : "Novo Banner"}
          </button>
        </header>

        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            
            {activeTab === "produtos" ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Produto</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Preço</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 p-1 flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <span className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{formatCurrency(product.price)}</span>
                          {product.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">{formatCurrency(product.oldPrice)}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-[var(--color-brand-orange)] transition-colors rounded-lg hover:bg-orange-50">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Banner</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Localização (Tipo)</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {banners.map((banner) => (
                    <tr key={banner.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-gray-900 text-sm line-clamp-2">{banner.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                          {banner.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs font-medium">
                          {banner.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-[var(--color-brand-orange)] transition-colors rounded-lg hover:bg-orange-50">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
          </div>
          
          <div className="mt-8 bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-4 text-[var(--color-brand-orange)]">
            <div className="mt-1 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div>
              <h3 className="font-bold mb-1">Aviso sobre o Banco de Dados</h3>
              <p className="text-sm opacity-90">
                Atualmente, este painel é uma demonstração visual (Mockup). Como o projeto será hospedado na Vercel (arquitetura Serverless), você precisará conectar um banco de dados real (como Vercel Postgres, Supabase ou Firebase) para que as alterações nos produtos e banners sejam salvas permanentemente e afetem a página inicial. 
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
