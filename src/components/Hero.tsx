"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Leaf, ChevronLeft, ChevronRight, Beer, ShoppingBag } from "lucide-react";

const IconMap = {
  Leaf: Leaf,
  Bottle: Beer,
  ShoppingBag: ShoppingBag,
};

const SLIDES = [
  {
    id: 1,
    title: "O melhor",
    highlight: "preço da cidade",
    subtitle: "em bebidas.",
    description: "Cervejas trincando, vinhos selecionados e as melhores marcas. Celebre com economia e qualidade superior.",
    bgImage: "/hero/drinks.png",
    mainImage: "/hero/drinks.png",
    color: "var(--color-brand-orange)",
    topBadge: "Ofertas Imperdíveis",
    badge: {
      text: "As Melhores\nOfertas",
      icon: "Bottle"
    }
  },
  {
    id: 2,
    title: "O melhor",
    highlight: "hortifruti",
    subtitle: "para você.",
    description: "Qualidade de feira com a conveniência de mercado. Compre online e retire na loja ou receba em casa.",
    bgImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop",
    mainImage: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop",
    color: "var(--color-brand-green)",
    topBadge: "Produtos Frescos Todos os Dias",
    badge: {
      text: "100%\nOrgânico",
      icon: "Leaf"
    }
  },
  {
    id: 3,
    title: "Ingredientes",
    highlight: "do dia a dia",
    subtitle: "perto de você.",
    description: "Arroz, feijão, café e tudo o que não pode faltar na sua dispensa. Qualidade e economia em um só lugar.",
    bgImage: "/hero/grocery.png",
    mainImage: "/hero/grocery.png",
    color: "#4a3728",
    topBadge: "Tudo para sua Dispensa",
    badge: {
      text: "Sua Casa\nCompleta",
      icon: "ShoppingBag"
    }
  }
];

interface Slide {
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

export function Hero({ slides: initialSlides }: { slides?: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const displaySlides = initialSlides && initialSlides.length > 0 ? initialSlides : SLIDES;

  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displaySlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);

  const slide = displaySlides[currentSlide];
  
  // Mapping for DB slides to UI structure
  const uiSlide = {
    id: slide.id,
    title: slide.title,
    highlight: slide.highlight,
    subtitle: slide.subtitle,
    description: slide.description,
    image: slide.image || slide.mainImage,
    bgColor: slide.bgColor || slide.color,
    topBadge: slide.topBadge || slide.topBadge,
    badgeText: slide.badgeText || slide.badge?.text,
    badgeIcon: slide.badgeIcon || slide.badge?.icon
  };

  return (
    <section 
      className="relative overflow-hidden min-h-[600px] md:h-[600px] py-12 md:py-0 flex items-center transition-colors duration-1000"
      style={{ backgroundColor: uiSlide.bgColor }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay transition-all duration-1000"
        style={{ backgroundImage: `url(${uiSlide.image})` }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-r to-transparent transition-colors duration-1000"
        style={{ 
          backgroundImage: `linear-gradient(to right, ${uiSlide.bgColor}, ${uiSlide.bgColor}90, transparent)` 
        }}
      />
      
      <div className="container-custom relative z-10 flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 items-center justify-center h-full pt-16 md:pt-0">
        {/* Text Content */}
        <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700" key={`text-${uiSlide.id}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
            {(() => {
              const iconName = uiSlide.badgeIcon as keyof typeof IconMap;
              const Icon = IconMap[iconName] || Leaf;
              return <Icon className="w-4 h-4 text-[var(--color-brand-yellow)]" />;
            })()}
            {uiSlide.topBadge}
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6">
            {uiSlide.title} <br />
            <span className="italic font-light opacity-90">{uiSlide.highlight}</span> <br />
            {uiSlide.subtitle}
          </h1>
          <p className="text-white/90 text-lg mb-8 max-w-md leading-relaxed">
            {uiSlide.description}
          </p>
          <a href="/#vitrine" className="bg-[var(--color-brand-dark)] hover:bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-3 group mt-4 md:mt-0">
            Comprar Agora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        {/* Image Content */}
        <div className="order-1 md:order-2 w-48 md:w-full relative animate-in fade-in slide-in-from-right-8 duration-700" key={`img-${uiSlide.id}`}>
          <div className="hidden md:flex absolute top-10 right-10 w-24 h-24 bg-[var(--color-brand-yellow)] rounded-full flex-col items-center justify-center text-[var(--color-brand-dark)] font-bold text-[10px] uppercase text-center shadow-xl animate-pulse z-20 px-2 leading-tight">
            {(() => {
              const iconName = uiSlide.badgeIcon as keyof typeof IconMap;
              const Icon = IconMap[iconName] || Leaf;
              return <Icon className="w-5 h-5 text-[var(--color-brand-orange)] mb-1" />;
            })()}
            {uiSlide.badgeText?.split('\n').map((line: string, i: number) => (
              <span key={i}>{line}<br/></span>
            ))}
          </div>
          <img 
            src={uiSlide.image} 
            alt="Destaque" 
            className="w-full max-w-md mx-auto rounded-[2rem] shadow-2xl object-cover aspect-square transition-transform duration-700 hover:scale-105 relative z-10"
          />
        </div>
      </div>

      {displaySlides.length > 1 && (
        <>
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/30 bg-white/10 text-white items-center justify-center hover:bg-white/30 transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/30 bg-white/10 text-white items-center justify-center hover:bg-white/30 transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {displaySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

