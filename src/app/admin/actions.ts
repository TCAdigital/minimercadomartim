"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
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
  try {
    return await prisma.heroSlide.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Erro ao buscar banners:", error);
    return [];
  }
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

// Promo Slides Actions
export async function getPromoSlides() {
  try {
    return await prisma.promoSlide.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Erro ao buscar promos:", error);
    return [];
  }
}

export async function createPromoSlide(formData: FormData) {
  const type = formData.get("type") as string;
  const tag = formData.get("tag") as string;
  const title = formData.get("title") as string;
  const highlight = formData.get("highlight") as string;
  const description = formData.get("description") as string;
  const buttonText = formData.get("buttonText") as string;
  const href = formData.get("href") as string;
  const image = formData.get("image") as string;
  const bgColor = formData.get("bgColor") as string;
  const textColor = formData.get("textColor") as string;
  const buttonBgColor = formData.get("buttonBgColor") as string;
  const buttonTextColor = formData.get("buttonTextColor") as string;
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.promoSlide.create({
    data: { 
      type, tag, title, highlight, description, buttonText, href, image, 
      bgColor, textColor, buttonBgColor, buttonTextColor, order 
    },
  });

  revalidatePath("/admin/promos");
  revalidatePath("/");
}

export async function updatePromoSlide(id: string, formData: FormData) {
  const type = formData.get("type") as string;
  const tag = formData.get("tag") as string;
  const title = formData.get("title") as string;
  const highlight = formData.get("highlight") as string;
  const description = formData.get("description") as string;
  const buttonText = formData.get("buttonText") as string;
  const href = formData.get("href") as string;
  const image = formData.get("image") as string;
  const bgColor = formData.get("bgColor") as string;
  const textColor = formData.get("textColor") as string;
  const buttonBgColor = formData.get("buttonBgColor") as string;
  const buttonTextColor = formData.get("buttonTextColor") as string;
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.promoSlide.update({
    where: { id },
    data: { 
      type, tag, title, highlight, description, buttonText, href, image, 
      bgColor, textColor, buttonBgColor, buttonTextColor, order 
    },
  });

  revalidatePath("/admin/promos");
  revalidatePath("/");
}

export async function deletePromoSlide(id: string) {
  await prisma.promoSlide.delete({
    where: { id },
  });

  revalidatePath("/admin/promos");
  revalidatePath("/");
}
