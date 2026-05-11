import { getProducts } from "@/app/admin/actions";
import { ProductList } from "./ProductList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  try {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin_session")?.value === "true";

    if (!isAdmin) {
      redirect("/admin/login");
    }
  } catch (error: any) {
    // redirect throws a special error, we need to re-throw it
    if (error.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    console.error("Erro no Auth do Admin:", error);
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin Test Mode - Passo 2</h1>
      <p>O login foi verificado. Se você está vendo isso, o problema é 100% no Banco de Dados.</p>
    </div>
  );
}
