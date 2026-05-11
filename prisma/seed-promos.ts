import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing promos to avoid duplicates
  await prisma.promoSlide.deleteMany({})

  const promos = [
    {
      tag: "CESTA BÁSICA",
      title: "Essenciais",
      highlight: "para a casa",
      description: "Tudo o que sua família precisa com os melhores preços da região.",
      buttonText: "VER OPÇÕES",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
      bgColor: "#619d24",
      tagColor: "bg-white/20",
      highlightColor: "text-white/90",
      buttonColor: "bg-white text-[#619d24]",
      order: 1
    },
    {
      tag: "AÇOUGUE PREMIUM",
      title: "Cortes",
      highlight: "Especiais",
      description: "Carnes selecionadas e cortes nobres preparados na hora para você.",
      buttonText: "VER OPÇÕES",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
      bgColor: "#d34b1e",
      tagColor: "bg-white/20",
      highlightColor: "text-white/90",
      buttonColor: "bg-white text-[#d34b1e]",
      order: 2
    },
    {
      tag: "OFERTA ESPECIAL",
      title: "Sexta-feira do",
      highlight: "Hortifruti",
      description: "Toda sexta-feira, frutas e verduras com até 30% de desconto. Aproveite para encher a geladeira!",
      buttonText: "VER OFERTAS",
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800",
      bgColor: "#619d24",
      tagColor: "bg-[#facc15] text-black",
      highlightColor: "text-white",
      buttonColor: "bg-white text-[#619d24]",
      order: 3
    }
  ]

  for (const promo of promos) {
    await prisma.promoSlide.create({ data: promo })
  }

  console.log('✅ Banners promocionais cadastrados com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
