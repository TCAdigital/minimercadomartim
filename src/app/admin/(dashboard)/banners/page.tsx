import { getHeroSlides } from "@/app/admin/actions";
import { BannerList } from "./BannerList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BannersPage() {
  let slides: any[] = [];
  let isAdmin = false;

  try {
    const cookieStore = await cookies();
    isAdmin = cookieStore.get("admin_session")?.value === "true";
  } catch (error) {
    console.error("Erro ao verificar cookies em banners:", error);
  }

  if (!isAdmin) {
    redirect("/admin/login");
  }

  try {
    slides = await getHeroSlides();
  } catch (error) {
    console.error("Erro ao carregar banners na página admin:", error);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)]">Gerenciamento de Banners</h1>
        <p className="text-gray-500 mt-2">Personalize os slides da página principal (Hero Section).</p>
      </header>

      <BannerList initialSlides={slides || []} />
    </div>
  );
}
