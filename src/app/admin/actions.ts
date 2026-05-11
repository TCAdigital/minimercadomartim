"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const oldPrice = formData.get("oldPrice") ? parseFloat(formData.get("oldPrice") as string) : null;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;

  await prisma.product.create({
    data: { name, price, oldPrice, category, image },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const oldPrice = formData.get("oldPrice") ? parseFloat(formData.get("oldPrice") as string) : null;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;

  await prisma.product.update({
    where: { id },
    data: { name, price, oldPrice, category, image },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}
