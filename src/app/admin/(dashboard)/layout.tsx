import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, LogOut, Home, Image, Tag, MessageCircle } from "lucide-react";

// Support WhatsApp number (dev company)
const SUPPORT_WHATSAPP = "https://wa.me/5511999999999?text=Olá!%20Preciso%20de%20suporte%20com%20o%20painel%20do%20Mini%20Mercado%20Martin.";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-brand-dark)] text-white flex flex-col hidden md:flex">
        <div className="p-8 pb-4">
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

        {/* Support WhatsApp - fixed at bottom */}
        <div className="p-4 border-t border-white/5">
          <a
            href={SUPPORT_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366]"
          >
            <MessageCircle className="w-5 h-5" />
            <div className="leading-tight">
              <span className="block text-xs font-bold">Suporte Técnico</span>
              <span className="block text-[10px] text-[#25D366]/70">Falar com a equipe</span>
            </div>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header with Ver Site + Sair prominently */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm">
          <h1 className="font-serif text-xl font-bold text-[var(--color-brand-dark)]">Gerenciamento</h1>

          <div className="flex items-center gap-3">
            {/* Support on mobile */}
            <a
              href={SUPPORT_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-[#25D366]/10 text-[#25D366] font-bold text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              Suporte
            </a>

            {/* Ver Site */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
            >
              <Home className="w-4 h-4" />
              Ver Site
            </Link>

            {/* Sair */}
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-100 text-red-500 font-bold text-sm hover:bg-red-100 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </form>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
