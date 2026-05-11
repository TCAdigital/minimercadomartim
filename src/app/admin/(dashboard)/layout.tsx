import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, LogOut, Home, Image, Tag } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-brand-dark)] text-white flex flex-col hidden md:flex">
        <div className="p-8">
          <img src="/mini-mercado-martin-v2.png" alt="Logo" className="h-10 w-auto invert brightness-0" />
          <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Painel Admin</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl font-medium transition-colors hover:bg-white/20">
            <LayoutDashboard className="w-5 h-5 text-[var(--color-brand-orange)]" />
            Dashboard
          </Link>
          <Link href="/admin/banners" className="flex items-center gap-3 px-4 py-3 text-gray-400 rounded-xl font-medium transition-colors hover:bg-white/10 hover:text-white">
            <Image className="w-5 h-5" />
            Banners Hero
          </Link>
          <Link href="/admin/promos" className="flex items-center gap-3 px-4 py-3 text-gray-400 rounded-xl font-medium transition-colors hover:bg-white/10 hover:text-white">
            <Tag className="w-5 h-5" />
            Banners Promoção
          </Link>
          <Link href="/admin/produtos" className="flex items-center gap-3 px-4 py-3 text-gray-400 rounded-xl font-medium transition-colors hover:bg-white/10 hover:text-white">
            <ShoppingBag className="w-5 h-5" />
            Produtos
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 rounded-xl font-medium transition-colors hover:bg-white/10 hover:text-white">
            <Home className="w-5 h-5" />
            Ver Site
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 rounded-xl font-medium transition-colors hover:bg-red-500/10 hover:text-red-300">
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <h1 className="font-serif text-2xl font-bold text-[var(--color-brand-dark)]">Gerenciamento</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[var(--color-brand-dark)]">Administrador</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Mini Mercado Martin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--color-brand-orange)] flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
