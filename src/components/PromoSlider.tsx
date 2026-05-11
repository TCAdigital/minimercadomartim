"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

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

const FALLBACK_SLIDES: PromoSlide[] = [
  {
    id: "fallback-1",
    type: "MEIO",
    tag: "OFERTA ESPECIAL",
    title: "Sexta-feira do",
    highlight: "Hortifruti",
    description: "Toda sexta-feira, frutas e verduras com até 30% de desconto. Aproveite para encher a geladeira!",
    buttonText: "Ver Ofertas",
    href: "/#vitrine",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=800&auto=format&fit=crop",
    bgColor: "#619d24",
    textColor: "#ffffff",
    buttonBgColor: "#ffffff",
    buttonTextColor: "#619d24",
    order: 0,
  }
];

export function PromoSlider({ slides: initialSlides }: { slides?: PromoSlide[] }) {
  const [current, setCurrent] = useState(0);
  
  // Filter for only middle banners (slider)
  const middleSlides = initialSlides?.filter(s => s.type === "MEIO") || [];
  const slides = middleSlides.length > 0 ? middleSlides : FALLBACK_SLIDES;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container-custom">
        <div
          className="rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl transition-all duration-700 min-h-[450px]"
          style={{ backgroundColor: slide.bgColor }}
          key={slide.id}
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white" />
            <div className="absolute top-1/2 -right-12 w-64 h-64 rounded-full border-[20px] border-white" />
          </div>

          {/* Left Content */}
          <div className="relative z-10 max-w-xl mb-10 md:mb-0 animate-in fade-in slide-in-from-left-8 duration-700">
            {slide.tag && (
              <span 
                className="inline-block text-[10px] font-black px-5 py-2 rounded-full mb-8 shadow-sm tracking-widest uppercase"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: slide.textColor }}
              >
                {slide.tag}
              </span>
            )}
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.1]" style={{ color: slide.textColor }}>
              {slide.title} <br />
              <span className="italic font-light opacity-90">{slide.highlight}</span>
            </h2>
            
            {slide.description && (
              <p className="text-lg md:text-xl mb-10 font-medium max-w-md leading-relaxed" style={{ color: slide.textColor, opacity: 0.8 }}>
                {slide.description}
              </p>
            )}
            
            <Link 
              href={slide.href}
              className="px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3 w-fit"
              style={{ backgroundColor: slide.buttonBgColor, color: slide.buttonTextColor }}
            >
              {slide.buttonText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative z-10 w-full md:w-[45%] h-[300px] md:h-[350px] animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="absolute inset-0 bg-white/10 rounded-[2rem] backdrop-blur-sm -rotate-3 border border-white/20" />
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white/30 rotate-3 transition-transform hover:rotate-0 duration-500"
            />
          </div>

          {/* Navigation Controls */}
          {slides.length > 1 && (
            <div className="absolute bottom-8 right-8 flex gap-3 z-20">
              <button 
                onClick={prevSlide} 
                className="w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide} 
                className="w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
