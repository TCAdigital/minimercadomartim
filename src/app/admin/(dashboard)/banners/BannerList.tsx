"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon, X, MoveUp, MoveDown } from "lucide-react";
import { createHeroSlide, updateHeroSlide, deleteHeroSlide } from "../actions";
import { ImageUpload } from "@/components/ImageUpload";

interface HeroSlide {
  id: string;
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  image: string;
  bgColor: string;
  topBadge?: string | null;
  badgeText?: string | null;
  badgeIcon?: string | null;
  order: number;
}

export function BannerList({ initialSlides }: { initialSlides: HeroSlide[] }) {
  const [slides, setSlides] = useState(initialSlides);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [imageUrl, setImageUrl] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("image", imageUrl);

    if (editingSlide) {
      await updateHeroSlide(editingSlide.id, formData);
    } else {
      await createHeroSlide(formData);
    }
    
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este banner?")) {
      await deleteHeroSlide(id);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Gerenciar Banners</h2>
        <button 
          onClick={() => {
            setEditingSlide(null);
            setImageUrl("");
            setIsModalOpen(true);
          }}
          className="bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-dark)] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-900/10"
        >
          <Plus className="w-5 h-5" />
          Novo Banner
        </button>
      </div>

      <div className="grid gap-6">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="w-full md:w-72 h-48 relative bg-gray-100 shrink-0">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <ImageIcon className="text-white w-8 h-8" />
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Ordem: {slide.order}
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-tighter" style={{ backgroundColor: slide.bgColor + '20', color: slide.bgColor }}>
                    {slide.bgColor}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{slide.topBadge}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[var(--color-brand-dark)] leading-tight">
                  {slide.title} <span className="italic font-light text-gray-400">{slide.highlight}</span> {slide.subtitle}
                </h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{slide.description}</p>
              </div>
              
              <div className="flex items-center gap-3 mt-6">
                <button 
                  onClick={() => {
                    setEditingSlide(slide);
                    setImageUrl(slide.image);
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-[var(--color-brand-dark)]">
                {editingSlide ? "Editar Banner" : "Novo Banner"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Título Principal</label>
                  <input name="title" defaultValue={editingSlide?.title} required className="input-admin" placeholder="Ex: O melhor" />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Destaque (Itálico)</label>
                  <input name="highlight" defaultValue={editingSlide?.highlight} required className="input-admin" placeholder="Ex: preço da cidade" />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subtítulo</label>
                  <input name="subtitle" defaultValue={editingSlide?.subtitle} required className="input-admin" placeholder="Ex: em bebidas." />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Descrição</label>
                  <textarea name="description" defaultValue={editingSlide?.description} required className="input-admin min-h-[100px]" placeholder="Breve descrição do banner..." />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <ImageUpload 
                    label="Imagem do Banner" 
                    value={imageUrl} 
                    onChange={setImageUrl} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cor de Fundo</label>
                    <input name="bgColor" defaultValue={editingSlide?.bgColor || "#ffffff"} type="text" className="input-admin" placeholder="Hex ou Var" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ordem</label>
                    <input name="order" type="number" defaultValue={editingSlide?.order || 0} className="input-admin" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Badge Superior (Texto)</label>
                  <input name="topBadge" defaultValue={editingSlide?.topBadge || ""} className="input-admin" placeholder="Ex: Oferta do Dia" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Selo (Texto)</label>
                    <input name="badgeText" defaultValue={editingSlide?.badgeText || ""} className="input-admin" placeholder="Ex: 100% Fresco" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Selo (Ícone)</label>
                    <select name="badgeIcon" defaultValue={editingSlide?.badgeIcon || "Leaf"} className="input-admin">
                      <option value="Leaf">Folha</option>
                      <option value="Bottle">Garrafa</option>
                      <option value="ShoppingBag">Sacola</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all uppercase tracking-wider text-xs"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-dark)] shadow-lg shadow-orange-900/20 transition-all uppercase tracking-wider text-xs"
                >
                  {editingSlide ? "Salvar Alterações" : "Criar Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .input-admin {
          width: 100%;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .input-admin:focus {
          border-color: var(--color-brand-orange);
          background-color: white;
        }
      `}</style>
    </div>
  );
}
