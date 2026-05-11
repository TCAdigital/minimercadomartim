import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { Hero } from "@/components/Hero";
import { ArrowRight, Leaf, ShieldCheck, Truck, Clock, MapPin, Send, Star, Quote, GlassWater } from "lucide-react";

import { PromoSlider } from "@/components/PromoSlider";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const heroSlides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  });

  const promoSlides = await prisma.promoSlide.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Header />
      <CartDrawer />
      
      <main className="flex-1">
        <Hero slides={heroSlides} />

        {/* FEATURES */}
        <section className="bg-white border-b border-gray-100 py-10 relative z-10 -mt-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: "Entrega Rápida", desc: "Na sua porta" },
                { icon: GlassWater, title: "Bebidas Geladas", desc: "Sempre no ponto perfeito" },
                { icon: Leaf, title: "Produtos Orgânicos", desc: "Direto da fazenda" },
                { icon: Clock, title: "Aberto Todos os Dias", desc: "Das 7h às 20h" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-[var(--color-brand-orange)] shrink-0">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--color-brand-dark)]">{feature.title}</h4>
                    <p className="text-xs text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BANNERS (2 COLUMNS - DYNAMIC) */}
        <section className="py-16 bg-gray-50/50">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-6">
              {promoSlides.filter(s => s.type === "TOPO").length > 0 ? (
                promoSlides.filter(s => s.type === "TOPO").map((slide) => (
                  <div 
                    key={slide.id}
                    className="rounded-3xl p-10 flex items-center justify-between relative overflow-hidden group min-h-[280px]"
                    style={{ backgroundColor: slide.bgColor }}
                  >
                    <div className="absolute -right-10 -top-10 w-48 h-48 border-[20px] border-white/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10 max-w-[200px]">
                      <span className="font-semibold text-[10px] tracking-wider uppercase mb-3 block opacity-80" style={{ color: slide.textColor }}>
                        {slide.tag}
                      </span>
                      <h3 className="text-3xl font-serif font-bold mb-6 leading-tight" style={{ color: slide.textColor }}>
                        {slide.title} <br/><span className="italic font-light opacity-90">{slide.highlight}</span>
                      </h3>
                      <Link 
                        href={slide.href} 
                        className="text-sm font-bold uppercase tracking-wide flex items-center gap-2 hover:gap-3 transition-all group/btn"
                        style={{ color: slide.textColor }}
                      >
                        {slide.buttonText} <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                    {slide.image && (
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-44 h-44 object-cover rounded-full border-4 border-white/20 shadow-2xl absolute -right-6 -bottom-6 group-hover:-translate-y-2 transition-transform duration-500"
                      />
                    )}
                  </div>
                ))
              ) : (
                <>
                  {/* Fallback Banner 1 */}
                  <div className="bg-[var(--color-brand-green)] rounded-3xl p-10 flex items-center justify-between relative overflow-hidden group min-h-[280px]">
                    <div className="absolute -right-10 -top-10 w-48 h-48 border-[20px] border-white/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10 max-w-[200px]">
                      <span className="text-green-100 font-semibold text-xs tracking-wider uppercase mb-2 block">Cesta Básica</span>
                      <h3 className="text-3xl font-serif font-bold text-white mb-6 leading-tight">
                        Essenciais <br/><span className="italic font-light">para a casa</span>
                      </h3>
                      <Link href="/#vitrine" className="text-white text-sm font-bold uppercase tracking-wide flex items-center gap-2 hover:gap-3 transition-all">
                        Ver Opções <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1543168256-4154204ceaff?q=80&w=400&auto=format&fit=crop" 
                      alt="Mercearia" 
                      className="w-44 h-44 object-cover rounded-full border-4 border-white/20 shadow-2xl absolute -right-6 -bottom-6 group-hover:-translate-y-2 transition-transform duration-500"
                    />
                  </div>

                  {/* Fallback Banner 2 */}
                  <div className="bg-[var(--color-brand-orange)] rounded-3xl p-10 flex items-center justify-between relative overflow-hidden group min-h-[280px]">
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 border-[20px] border-white/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10 max-w-[200px]">
                      <span className="text-orange-100 font-semibold text-xs tracking-wider uppercase mb-2 block">Açougue Premium</span>
                      <h3 className="text-3xl font-serif font-bold text-white mb-6 leading-tight">
                        Cortes <br/><span className="italic font-light">Especiais</span>
                      </h3>
                      <Link href="/#vitrine" className="text-white text-sm font-bold uppercase tracking-wide flex items-center gap-2 hover:gap-3 transition-all">
                        Ver Opções <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=400&auto=format&fit=crop" 
                      alt="Açougue" 
                      className="w-44 h-44 object-cover rounded-full border-4 border-white/20 shadow-2xl absolute -right-6 -bottom-6 group-hover:-translate-y-2 transition-transform duration-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="vitrine" className="py-16 bg-gray-50/50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm mb-2 block">Os Melhores</span>
              <h2 className="text-4xl font-serif font-bold text-[var(--color-brand-dark)]">
                Produtos em <span className="italic font-light underline decoration-[var(--color-brand-green)] underline-offset-4">Destaque</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* PROMO SLIDER */}
        <PromoSlider slides={promoSlides} />

        {/* ABOUT SECTION */}
        <section className="py-20 bg-[#faf7f3]">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[var(--color-brand-orange)]/10 rounded-full blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop" 
                  alt="Sobre o Mercado" 
                  className="rounded-[2rem] shadow-xl relative z-10"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-[200px]">
                  <Quote className="w-8 h-8 text-[var(--color-brand-orange)] mb-3" />
                  <p className="font-serif font-bold text-[var(--color-brand-dark)] text-lg leading-tight">Tradição e Qualidade desde 2016</p>
                </div>
              </div>
              <div>
                <span className="text-[var(--color-brand-green)] font-bold tracking-widest uppercase text-sm mb-2 block">Nossa História</span>
                <h2 className="text-4xl font-serif font-bold text-[var(--color-brand-dark)] mb-6">
                  Mais que um mercado, <br/><span className="italic font-light">parte da família.</span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                  <p>
                    O Mini Mercado Martin nasceu do sonho de trazer para o bairro a qualidade dos grandes mercados com o atendimento caloroso que só a vizinhança conhece. 
                  </p>
                  <p>
                    Selecionamos pessoalmente cada fruta, legume e corte de carne, trabalhando lado a lado com produtores locais para garantir que apenas o melhor chegue à sua mesa. Além disso, destacamo-nos por ter os melhores preços em bebidas, nos orgulhando de ser um dos principais fornecedores da cidade para lanchonetes. Acreditamos que qualidade, bom atendimento e economia devem sempre caminhar juntos.
                  </p>
                </div>
                <div className="flex gap-8 border-t border-gray-200 pt-8">
                  <div>
                    <h4 className="font-bold text-3xl text-[var(--color-brand-orange)] font-serif mb-1">+2k</h4>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Clientes Felizes</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-3xl text-[var(--color-brand-green)] font-serif mb-1">10</h4>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Anos de História</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP & LOCATION */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm mb-2 block">Visite-nos</span>
              <h2 className="text-4xl font-serif font-bold text-[var(--color-brand-dark)]">
                Onde estamos <span className="italic font-light underline decoration-[var(--color-brand-green)] underline-offset-4">Localizados</span>
              </h2>
            </div>

            <div className="bg-gray-50 rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col md:flex-row">
              <div className="p-10 md:p-12 md:w-1/3 flex flex-col justify-center bg-white z-10 shadow-[20px_0_40px_rgba(0,0,0,0.03)]">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-[var(--color-brand-orange)]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[var(--color-brand-dark)] mb-4">Loja Física</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  R. Paulo de Araújo, 700<br />
                  Nova Granada, SP
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="w-5 h-5 text-[var(--color-brand-green)]" />
                    <span>Segunda a Sábado: 07h às 20h<br/>Domingo: 07h às 13h</span>
                  </div>
                </div>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=R.+Paulo+de+Araújo,+700+-+Nova+Granada,+SP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full bg-gray-900 text-white py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-black transition-colors flex items-center justify-center block text-center"
                >
                  Traçar Rota
                </a>
              </div>
              <div className="md:w-2/3 h-[400px] md:h-auto bg-gray-200">
                <iframe 
                  src="https://maps.google.com/maps?q=R.%20Paulo%20de%20Ara%C3%BAjo,%20700%20-%20Nova%20Granada,%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Mini Mercado Martin"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* FOOTER */}
      <footer className="bg-[var(--color-brand-dark)] text-gray-300 py-16 border-t-[10px] border-[var(--color-brand-orange)]">
        <div className="container-custom grid md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/mini-mercado-martin-v2.png" 
              alt="Mini Mercado Martin" 
              className="h-14 md:h-16 w-auto object-contain mb-6"
            />
            <p className="max-w-sm mb-6 text-gray-400">
              Qualidade, frescor e preço justo todos os dias. A sua mercearia de confiança no bairro.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-brand-orange)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0a66c2] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Links Úteis</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-[var(--color-brand-orange)] transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-orange)] transition-colors">Nossos Produtos</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-orange)] transition-colors">Política de Entrega</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-orange)] transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-brand-orange)] shrink-0 mt-1" />
                <span>R. Paulo de Araújo, 700<br />Nova Granada, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Send className="w-5 h-5 text-[var(--color-brand-green)] shrink-0" />
                <span>(17) 99224-6094</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container-custom mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} Mini Mercado Martin. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1">
            Desenvolvido com amor ❤️ pela 
            <a 
              href="https://www.tcadigital.com.br/express" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--color-brand-green)] hover:text-[var(--color-brand-orange)] transition-colors font-medium ml-1"
            >
              TCA Digital Ai-Driven
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
