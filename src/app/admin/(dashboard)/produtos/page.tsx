import { getProducts } from "@/app/admin/actions";
import { ProductList } from "../ProductList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProdutosPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const products = await getProducts();

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)]">Gerenciamento de Produtos</h1>
        <p className="text-gray-500 mt-2">Adicione, edite ou remova produtos do catálogo da loja.</p>
      </header>

      <ProductList initialProducts={products} />
    </div>
  );
}
