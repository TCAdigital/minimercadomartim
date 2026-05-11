import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: "Tomate Carmem Selecionado (kg)", price: 6.99, oldPrice: 8.99, category: "Hortifruti", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80" },
    { name: "Banana Prata Orgânica (kg)", price: 5.49, category: "Hortifruti", image: "https://images.unsplash.com/photo-1571501474554-25b0f4439169?w=400&q=80" },
    { name: "Pão Francês Fresquinho (kg)", price: 14.90, category: "Padaria", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80" },
    { name: "Azeite de Oliva Extra Virgem 500ml", price: 29.90, oldPrice: 35.90, category: "Mercearia", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80" },
    { name: "Costela Bovina Resfriada (kg)", price: 24.99, category: "Carnes", image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400&q=80" },
    { name: "Maçã Fuji Premium (kg)", price: 9.99, oldPrice: 12.99, category: "Hortifruti", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80" },
    { name: "Leite Integral 1L", price: 4.59, category: "Laticínios", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
    { name: "Café Torrado e Moído 500g", price: 18.90, category: "Mercearia", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80" },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
