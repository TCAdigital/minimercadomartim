import { getProducts } from "@/app/admin/actions";
import { ProductList } from "./ProductList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let products: any[] = [];
  let isAdmin = false;

  try {
    const cookieStore = await cookies();
    isAdmin = cookieStore.get("admin_session")?.value === "true";
  } catch (error) {
    console.error("Erro ao verificar cookies:", error);
  }

  if (!isAdmin) {
    redirect("/admin/login");
  }

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Erro ao carregar produtos na página admin:", error);
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)]">Bem-vindo, Martin</h2>
          <p className="text-gray-500 mt-1">Gerencie seu estoque e preços de forma simples e rápida.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 min-w-[140px]">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-1">Total de Produtos</span>
            <span className="text-2xl font-bold text-[var(--color-brand-orange)]">{products?.length || 0}</span>
          </div>
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100 min-w-[140px]">
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest block mb-1">Status do Site</span>
            <span className="text-2xl font-bold text-[var(--color-brand-green)]">Online</span>
          </div>
        </div>
      </div>

      <ProductList initialProducts={products || []} />
    </div>
  );
}
