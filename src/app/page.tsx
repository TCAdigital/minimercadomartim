import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Leaf, ShieldCheck, Truck, Clock, MapPin, Send } from "lucide-react";

// Mock data based on index.html
const MOCK_PRODUCTS = [
  { id: "1", name: "Tomate Carmem Selecionado (kg)", price: 6.99, oldPrice: 8.99, category: "Hortifruti", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80" },
  { id: "2", name: "Banana Prata Orgânica (kg)", price: 5.49, category: "Hortifruti", image: "https://images.unsplash.com/photo-1571501474554-25b0f4439169?w=400&q=80" },
  { id: "3", name: "Pão Francês Fresquinho (kg)", price: 14.90, category: "Padaria", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80" },
  { id: "4", name: "Azeite de Oliva Extra Virgem 500ml", price: 29.90, oldPrice: 35.90, category: "Mercearia", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80" },
  { id: "5", name: "Costela Bovina Resfriada (kg)", price: 24.99, category: "Carnes", image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400&q=80" },
  { id: "6", name: "Maçã Fuji Premium (kg)", price: 9.99, oldPrice: 12.99, category: "Hortifruti", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80" },
  { id: "7", name: "Leite Integral 1L", price: 4.59, category: "Laticínios", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
  { id: "8", name: "Café Torrado e Moído 500g", price: 18.90, category: "Mercearia", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80" },
];

export default function Home() {
  return (
    <>
      <Header />
      <CartDrawer />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[var(--color-brand-orange)] min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-orange)] via-[var(--color-brand-orange)]/90 to-transparent"></div>
          
          <div className="container-custom relative z-10 grid md:grid-cols-2 gap-8 items-center py-20">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Leaf className="w-4 h-4 text-[var(--color-brand-yellow)]" />
                Produtos Frescos Todos os Dias
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6">
                O melhor <br />
                <span className="italic font-light opacity-90">hortifruti</span> <br />
                para você.
              </h1>
              <p className="text-white/90 text-lg mb-8 max-w-md leading-relaxed">
                Qualidade de feira com a conveniência de mercado. Compre online e retire na loja ou receba em casa.
              </p>
              <button className="bg-[var(--color-brand-dark)] hover:bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-3 group">
                Comprar Agora
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="hidden md:block relative">
              <div className="absolute top-10 right-10 w-24 h-24 bg-[var(--color-brand-yellow)] rounded-full flex flex-col items-center justify-center text-[var(--color-brand-dark)] font-bold text-xs uppercase text-center rotate-12 shadow-xl animate-[spin_10s_linear_infinite]">
                <Leaf className="w-5 h-5 text-[var(--color-brand-orange)] mb-1" />
                100%<br/>Orgânico
              </div>
              {/* Replace with a transparent bowl image */}
              <img 
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop" 
                alt="Vegetables" 
                className="w-full max-w-md mx-auto rounded-[2rem] rotate-3 shadow-2xl object-cover aspect-square"
              />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-white border-b border-gray-100 py-10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: "Entrega Rápida", desc: "Na sua porta" },
                { icon: ShieldCheck, title: "Compra Segura", desc: "Garantia de frescor" },
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

        {/* PRODUCTS */}
        <section className="py-20 bg-gray-50/50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm mb-2 block">Novidades</span>
              <h2 className="text-4xl font-serif font-bold text-[var(--color-brand-dark)]">
                Produtos em <span className="italic font-light underline decoration-[var(--color-brand-green)] underline-offset-4">Destaque</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {MOCK_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* PROMO BANNER */}
        <section className="py-10 pb-20 bg-white">
          <div className="container-custom">
            <div className="bg-[var(--color-brand-green)] rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-xl shadow-green-900/10">
              <div className="absolute -right-20 -top-20 w-64 h-64 border-[40px] border-white/10 rounded-full"></div>
              <div className="relative z-10 max-w-lg mb-8 md:mb-0">
                <span className="inline-block bg-[var(--color-brand-yellow)] text-[var(--color-brand-dark)] text-xs font-bold px-4 py-1.5 rounded-full mb-6">OFERTA ESPECIAL</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                  Sexta-feira do <br />
                  <span className="italic font-light">Hortifruti</span>
                </h2>
                <p className="text-green-50 text-lg mb-8">
                  Toda sexta-feira, frutas e verduras com até 30% de desconto. Aproveite para encher a geladeira!
                </p>
                <button className="bg-white text-[var(--color-brand-green-dark)] px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-gray-50 transition-colors">
                  Ver Ofertas
                </button>
              </div>
              <div className="relative z-10 w-full max-w-sm">
                <img 
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop" 
                  alt="Hortifruti" 
                  className="rounded-full border-8 border-white/20 shadow-2xl aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* FOOTER */}
      <footer className="bg-[var(--color-brand-dark)] text-gray-300 py-16 border-t-[10px] border-[var(--color-brand-orange)]">
        <div className="container-custom grid md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <span className="font-serif font-bold text-3xl text-white tracking-tight block mb-6">
              Mini Mercado <span className="text-[var(--color-brand-green)]">Martin</span>
            </span>
            <p className="max-w-sm mb-6 text-gray-400">
              Qualidade, frescor e preço justo todos os dias. A sua mercearia de confiança no bairro.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-brand-orange)] transition-colors cursor-pointer">
                <i className="fa-brands fa-instagram text-white"></i>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-brand-orange)] transition-colors cursor-pointer">
                <i className="fa-brands fa-facebook-f text-white"></i>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-brand-green)] transition-colors cursor-pointer">
                <i className="fa-brands fa-whatsapp text-white"></i>
              </div>
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
                <span>Rua das Flores, 123 - Centro<br />São Paulo, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Send className="w-5 h-5 text-[var(--color-brand-green)] shrink-0" />
                <span>(11) 99999-9999</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container-custom mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Mini Mercado Martin. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
