"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PromoSlide {
  id: string;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  buttonText: string;
  image: string;
  bgColor: string;
  tagColor: string;
  highlightColor: string;
  buttonColor: string;
  order: number;
}

const FALLBACK_SLIDES = [
  {
    id: "1",
    tag: "FRETE GRÁTIS",
    title: "Compras acima de",
    highlight: "R$ 150,00",
    description: "Faça a feira da semana pelo WhatsApp e nós levamos até você sem custo adicional na região central.",
    buttonText: "Fazer Pedido",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
    bgColor: "#1a1a1a",
    tagColor: "bg-[var(--color-brand-orange)]",
    highlightColor: "text-[var(--color-brand-yellow)]",
    buttonColor: "bg-[var(--color-brand-green)] hover:bg-[var(--color-brand-green-dark)]",
    order: 0,
  },
  {
    id: "2",
    tag: "OFERTA ESPECIAL",
    title: "Sexta-feira do",
    highlight: "Hortifruti",
    description: "Toda sexta-feira, frutas e verduras com até 30% de desconto. Aproveite para encher a geladeira!",
    buttonText: "Ver Ofertas",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
    bgColor: "var(--color-brand-green)",
    tagColor: "bg-[var(--color-brand-yellow)] text-gray-900",
    highlightColor: "text-green-200 italic font-light",
    buttonColor: "bg-white text-[var(--color-brand-green-dark)] hover:bg-gray-50",
    order: 1,
  }
];

export function PromoSlider({ slides: initialSlides }: { slides?: PromoSlide[] }) {
  const [current, setCurrent] = useState(0);

  const slides = initialSlides && initialSlides.length > 0 ? initialSlides : FALLBACK_SLIDES;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className="py-10 bg-white relative">
      <div className="container-custom">
        <div
          className="rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl transition-colors duration-500 min-h-[400px]"
          style={{ backgroundColor: slide.bgColor }}
          key={slide.id}
        >
          <div className="absolute -left-20 -bottom-20 w-80 h-80 border-[40px] border-white/5 rounded-full"></div>

          <div className="relative z-10 max-w-lg mb-8 md:mb-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className={`inline-block ${slide.tagColor} text-xs font-bold px-4 py-1.5 rounded-full mb-6`}>
              {slide.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              {slide.title} <br />
              <span className={slide.highlightColor}>{slide.highlight}</span>
            </h2>
            <p className="text-white/70 text-lg mb-8">{slide.description}</p>
            <button className={`${slide.buttonColor} px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-colors shadow-lg`}>
              {slide.buttonText}
            </button>
          </div>

          <div className="relative z-10 w-full max-w-sm animate-in fade-in slide-in-from-right-4 duration-500">
            <img
              src={slide.image}
              alt="Promoção"
              className="rounded-[2rem] border-4 border-white/10 shadow-2xl aspect-square object-cover"
            />
          </div>

          {slides.length > 1 && (
            <div className="absolute bottom-6 right-6 flex gap-2 z-20">
              <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
