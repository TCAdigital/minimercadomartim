import { getPromoSlides } from "@/app/admin/actions";
import { PromoList } from "./PromoList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PromosPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const slides = await getPromoSlides();

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)]">Banners Promocionais</h1>
        <p className="text-gray-500 mt-2">Gerencie as ofertas e promoções que aparecem na página principal.</p>
      </header>

      <PromoList initialSlides={slides} />
    </div>
  );
}
