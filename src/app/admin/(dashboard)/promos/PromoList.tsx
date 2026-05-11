"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon, X, Tag, Layout, Monitor } from "lucide-react";
import { createPromoSlide, updatePromoSlide, deletePromoSlide } from "@/app/admin/actions";
import { ImageUpload } from "@/components/ImageUpload";

interface PromoSlide {
  id: string;
  type: string;
  tag: string;
  title: string;
  highlight: string;
  description: string | null;
  buttonText: string;
  href: string;
  image: string;
  bgColor: string;
  textColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  order: number;
}

export function PromoList({ initialSlides }: { initialSlides: PromoSlide[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<PromoSlide | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [bannerType, setBannerType] = useState("MEIO");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("image", imageUrl);

    if (editingSlide) {
      await updatePromoSlide(editingSlide.id, formData);
    } else {
      await createPromoSlide(formData);
    }

    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este banner promocional?")) {
      await deletePromoSlide(id);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Banners Promocionais</h2>
        <button
          onClick={() => { 
            setEditingSlide(null); 
            setImageUrl(""); 
            setBannerType("MEIO");
            setIsModalOpen(true); 
          }}
          className="bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-dark)] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-900/10"
        >
          <Plus className="w-5 h-5" />
          Nova Promoção
        </button>
      </div>

      <div className="grid gap-6">
        {initialSlides.length === 0 && (
          <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-16 text-center">
            <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">Nenhum banner promocional cadastrado.</p>
            <p className="text-gray-300 text-sm mt-1">Clique em "Nova Promoção" para começar.</p>
          </div>
        )}
        {initialSlides.map((slide) => (
          <div key={slide.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="w-full md:w-64 h-44 relative shrink-0" style={{ backgroundColor: slide.bgColor }}>
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-black/40 text-white backdrop-blur-sm">
                  {slide.type === "TOPO" ? "Topo da Página" : "Meio da Página"}
                </span>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-orange-100 text-orange-500 mb-3">
                  {slide.tag}
                </span>
                <h3 className="text-xl font-serif font-bold text-[var(--color-brand-dark)]">
                  {slide.title} <span className="italic font-light text-gray-400">{slide.highlight}</span>
                </h3>
                {slide.description && <p className="text-gray-500 text-sm mt-2 line-clamp-2">{slide.description}</p>}
                <p className="text-[10px] text-gray-400 mt-2 font-mono break-all">Link: {slide.href}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { 
                    setEditingSlide(slide); 
                    setImageUrl(slide.image); 
                    setBannerType(slide.type);
                    setIsModalOpen(true); 
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="px-4 py-2.5 rounded-xl border border-red-100 text-red-500 font-bold text-xs hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[2rem] w-full max-w-3xl shadow-2xl my-8 animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-[var(--color-brand-dark)]">
                {editingSlide ? "Editar Promoção" : "Nova Promoção"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 grid md:grid-cols-2 gap-8">
              {/* Coluna Esquerda: Conteúdo */}
              <div className="space-y-6">
                <div className="grid gap-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Onde este banner aparece?</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBannerType("TOPO")}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${bannerType === "TOPO" ? 'border-[var(--color-brand-orange)] bg-orange-50 text-[var(--color-brand-orange)]' : 'border-gray-100 text-gray-400'}`}
                    >
                      <Layout className="w-4 h-4" />
                      <span className="text-xs font-bold">Topo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBannerType("MEIO")}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${bannerType === "MEIO" ? 'border-[var(--color-brand-orange)] bg-orange-50 text-[var(--color-brand-orange)]' : 'border-gray-100 text-gray-400'}`}
                    >
                      <Monitor className="w-4 h-4" />
                      <span className="text-xs font-bold">Meio</span>
                    </button>
                  </div>
                  <input type="hidden" name="type" value={bannerType} />
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tag (Ex: FRETE GRÁTIS)</label>
                  <input name="tag" defaultValue={editingSlide?.tag} required className="input-admin" placeholder="OFERTA ESPECIAL" />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Título</label>
                  <input name="title" defaultValue={editingSlide?.title} required className="input-admin" placeholder="Compras acima de" />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Destaque</label>
                  <input name="highlight" defaultValue={editingSlide?.highlight} required className="input-admin" placeholder="R$ 150,00" />
                </div>
                
                {bannerType === "MEIO" && (
                  <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Descrição (Apenas para banner do meio)</label>
                    <textarea name="description" defaultValue={editingSlide?.description || ""} required className="input-admin min-h-[80px]" />
                  </div>
                )}

                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Link do Botão (Ex: /#produtos ou link categoria)</label>
                  <input name="href" defaultValue={editingSlide?.href || "/#produtos"} required className="input-admin font-mono text-xs" />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Texto do Botão</label>
                  <input name="buttonText" defaultValue={editingSlide?.buttonText} required className="input-admin" placeholder="Ver Catálogo" />
                </div>
              </div>

              {/* Coluna Direita: Design e Imagem */}
              <div className="space-y-6">
                <ImageUpload label="Imagem da Promoção" value={imageUrl} onChange={setImageUrl} />
                
                <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">Cores Visuais</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Cor de Fundo</label>
                      <div className="flex items-center gap-2">
                        <input type="color" name="bgColor" defaultValue={editingSlide?.bgColor || "#619d24"} className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0" />
                        <span className="text-xs font-mono text-gray-500">Fundo</span>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Cor do Texto</label>
                      <div className="flex items-center gap-2">
                        <input type="color" name="textColor" defaultValue={editingSlide?.textColor || "#ffffff"} className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0" />
                        <span className="text-xs font-mono text-gray-500">Texto</span>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Cor Botão</label>
                      <div className="flex items-center gap-2">
                        <input type="color" name="buttonBgColor" defaultValue={editingSlide?.buttonBgColor || "#ffffff"} className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0" />
                        <span className="text-xs font-mono text-gray-500">Fundo Botão</span>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Texto Botão</label>
                      <div className="flex items-center gap-2">
                        <input type="color" name="buttonTextColor" defaultValue={editingSlide?.buttonTextColor || "#619d24"} className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0" />
                        <span className="text-xs font-mono text-gray-500">Cor Texto</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ordem de Exibição</label>
                  <input name="order" type="number" defaultValue={editingSlide?.order || 0} className="input-admin" />
                </div>
              </div>

              <div className="md:col-span-2 pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all uppercase tracking-wider text-xs">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-dark)] shadow-lg shadow-orange-900/20 transition-all uppercase tracking-wider text-xs">
                  {editingSlide ? "Salvar Alterações" : "Criar Promoção"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .input-admin { width: 100%; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 0.75rem 1rem; font-size: 0.875rem; outline: none; transition: all 0.2s; }
        .input-admin:focus { border-color: var(--color-brand-orange); background-color: white; }
      `}</style>
    </div>
  );
}
