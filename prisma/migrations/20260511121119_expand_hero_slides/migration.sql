/*
  Warnings:

  - You are about to drop the column `iconName` on the `HeroSlide` table. All the data in the column will be lost.
  - Added the required column `description` to the `HeroSlide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highlight` to the `HeroSlide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HeroSlide" DROP COLUMN "iconName",
ADD COLUMN     "badgeIcon" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "highlight" TEXT NOT NULL,
ADD COLUMN     "topBadge" TEXT;
