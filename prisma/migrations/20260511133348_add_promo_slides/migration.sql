-- CreateTable
CREATE TABLE "PromoSlide" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "highlight" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL DEFAULT '#1a1a1a',
    "tagColor" TEXT NOT NULL DEFAULT 'bg-[var(--color-brand-orange)]',
    "highlightColor" TEXT NOT NULL DEFAULT 'text-[var(--color-brand-yellow)]',
    "buttonColor" TEXT NOT NULL DEFAULT 'bg-[var(--color-brand-green)]',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromoSlide_pkey" PRIMARY KEY ("id")
);
