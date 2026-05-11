import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing promos to avoid duplicates
  await prisma.promoSlide.deleteMany({})

  const promos = [
    {
      type: "TOPO",
      tag: "CESTA BÁSICA",
      title: "Essenciais",
      highlight: "para a casa",
      description: "",
      buttonText: "VER OPÇÕES",
      href: "/#vitrine",
      image: "https://images.unsplash.com/photo-1543168256-4154204ceaff?q=80&w=400&auto=format&fit=crop",
      bgColor: "#619d24",
      textColor: "#ffffff",
      buttonBgColor: "#ffffff",
      buttonTextColor: "#619d24",
      order: 1
    },
    {
      type: "TOPO",
      tag: "AÇOUGUE PREMIUM",
      title: "Cortes",
      highlight: "Especiais",
      description: "",
      buttonText: "VER OPÇÕES",
      href: "/#vitrine",
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=400&auto=format&fit=crop",
      bgColor: "#d34b1e",
      textColor: "#ffffff",
      buttonBgColor: "#ffffff",
      buttonTextColor: "#d34b1e",
      order: 2
    },
    {
      type: "MEIO",
      tag: "OFERTA ESPECIAL",
      title: "Sexta-feira do",
      highlight: "Hortifruti",
      description: "Toda sexta-feira, frutas e verduras com até 30% de desconto. Aproveite para encher a geladeira!",
      buttonText: "VER OFERTAS",
      href: "/#vitrine",
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=800&auto=format&fit=crop",
      bgColor: "#619d24",
      textColor: "#ffffff",
      buttonBgColor: "#ffffff",
      buttonTextColor: "#619d24",
      order: 3
    }
  ]

  for (const promo of promos) {
    await prisma.promoSlide.create({ data: promo })
  }

  console.log('✅ Banners promocionais (Topo e Meio) cadastrados com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
