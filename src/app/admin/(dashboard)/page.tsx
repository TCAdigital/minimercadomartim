import { getProducts } from "@/app/admin/actions";
import { ProductList } from "./ProductList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin Test Mode</h1>
      <p>Se você está vendo isso, o problema é nos cookies ou no banco de dados.</p>
    </div>
  );
}
