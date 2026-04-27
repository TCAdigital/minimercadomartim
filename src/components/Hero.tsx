"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const SLIDES = [
  {
    id: 1,
    title: "O melhor",
    highlight: "hortifruti",
    subtitle: "para você.",
    description: "Qualidade de feira com a conveniência de mercado. Compre online e retire na loja ou receba em casa.",
    bgImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop",
    mainImage: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop",
    color: "var(--color-brand-orange)",
  },
  {
    id: 2,
    title: "Frescor",
    highlight: "orgânico",
    subtitle: "todo dia.",
    description: "Trabalhamos com produtores locais para garantir alimentos frescos e livres de agrotóxicos na sua mesa.",
    bgImage: "https://images.unsplash.com/photo-1596199050105-6d5d32222916?q=80&w=2000&auto=format&fit=crop",
    mainImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    color: "var(--color-brand-green)",
  },
  {
    id: 3,
    title: "Temperos",
    highlight: "especiarias",
    subtitle: "e muito mais.",
    description: "Uma seleção premium de grãos, temperos e azeites para deixar suas receitas ainda mais saborosas.",
    bgImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop",
    mainImage: "https://images.unsplash.com/photo-1532336414038-cb11cb146b8c?q=80&w=800&auto=format&fit=crop",
    color: "#7b3f00",
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[currentSlide];

  return (
    <section 
      className="relative overflow-hidden min-h-[500px] flex items-center transition-colors duration-1000"
      style={{ backgroundColor: slide.color }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay transition-all duration-1000"
        style={{ backgroundImage: `url(${slide.bgImage})` }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-r to-transparent transition-colors duration-1000"
        style={{ 
          backgroundImage: `linear-gradient(to right, ${slide.color}, ${slide.color}90, transparent)` 
        }}
      />
      
      <div className="container-custom relative z-10 grid md:grid-cols-2 gap-8 items-center py-20 min-h-[500px]">
        {/* Text Content */}
        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700" key={`text-${slide.id}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <Leaf className="w-4 h-4 text-[var(--color-brand-yellow)]" />
            Produtos Frescos Todos os Dias
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6">
            {slide.title} <br />
            <span className="italic font-light opacity-90">{slide.highlight}</span> <br />
            {slide.subtitle}
          </h1>
          <p className="text-white/90 text-lg mb-8 max-w-md leading-relaxed">
            {slide.description}
          </p>
          <button className="bg-[var(--color-brand-dark)] hover:bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-3 group">
            Comprar Agora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Image Content */}
        <div className="hidden md:block relative animate-in fade-in slide-in-from-right-8 duration-700" key={`img-${slide.id}`}>
          <div className="absolute top-10 right-10 w-24 h-24 bg-[var(--color-brand-yellow)] rounded-full flex flex-col items-center justify-center text-[var(--color-brand-dark)] font-bold text-xs uppercase text-center rotate-12 shadow-xl animate-[spin_10s_linear_infinite] z-20">
            <Leaf className="w-5 h-5 text-[var(--color-brand-orange)] mb-1" />
            100%<br/>Orgânico
          </div>
          <img 
            src={slide.mainImage} 
            alt="Destaque" 
            className="w-full max-w-md mx-auto rounded-[2rem] shadow-2xl object-cover aspect-square transition-transform duration-700 hover:scale-105 relative z-10"
            style={{ transform: `rotate(${currentSlide * 5}deg)` }}
          />
        </div>
      </div>

      {/* Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/30 bg-white/10 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/30 bg-white/10 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
