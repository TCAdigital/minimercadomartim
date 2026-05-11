import { getHeroSlides } from "../../actions";
import { BannerList } from "./BannerList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BannersPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "true") {
    redirect("/admin/login");
  }

  const slides = await getHeroSlides();

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)]">Gerenciamento de Banners</h1>
        <p className="text-gray-500 mt-2">Personalize os slides da página principal (Hero Section).</p>
      </header>

      <BannerList initialSlides={slides} />
    </div>
  );
}
