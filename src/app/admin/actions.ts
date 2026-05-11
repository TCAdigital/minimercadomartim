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

// Hero Slides Actions
export async function getHeroSlides() {
  return await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createHeroSlide(formData: FormData) {
  const title = formData.get("title") as string;
  const highlight = formData.get("highlight") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const bgColor = formData.get("bgColor") as string;
  const topBadge = formData.get("topBadge") as string;
  const badgeText = formData.get("badgeText") as string;
  const badgeIcon = formData.get("badgeIcon") as string;
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.heroSlide.create({
    data: { title, highlight, subtitle, description, image, bgColor, topBadge, badgeText, badgeIcon, order },
  });

  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function updateHeroSlide(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const highlight = formData.get("highlight") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const bgColor = formData.get("bgColor") as string;
  const topBadge = formData.get("topBadge") as string;
  const badgeText = formData.get("badgeText") as string;
  const badgeIcon = formData.get("badgeIcon") as string;
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.heroSlide.update({
    where: { id },
    data: { title, highlight, subtitle, description, image, bgColor, topBadge, badgeText, badgeIcon, order },
  });

  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function deleteHeroSlide(id: string) {
  await prisma.heroSlide.delete({
    where: { id },
  });

  revalidatePath("/admin/banners");
  revalidatePath("/");
}
