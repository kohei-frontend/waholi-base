/*
  Warnings:

  - You are about to drop the column `lga` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `suburb` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `postaccommodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `postworkplace` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `like` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `targetType` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `locationId` to the `post` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `postType` on the `post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `state` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationTargetType" AS ENUM ('Post', 'Comment');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('Workplace', 'Accommodation');

-- DropForeignKey
ALTER TABLE "postaccommodation" DROP CONSTRAINT "postaccommodation_postId_fkey";

-- DropForeignKey
ALTER TABLE "postworkplace" DROP CONSTRAINT "postworkplace_postId_fkey";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "deletedAt" TIMESTAMP(3),
DROP COLUMN "targetType",
ADD COLUMN     "targetType" "NotificationTargetType" NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "lga",
DROP COLUMN "state",
DROP COLUMN "suburb",
ADD COLUMN     "locationId" TEXT NOT NULL,
DROP COLUMN "postType",
ADD COLUMN     "postType" "PostType" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "state" TEXT NOT NULL;

-- DropTable
DROP TABLE "postaccommodation";

-- DropTable
DROP TABLE "postworkplace";

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "lga" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workplace" (
    "postId" TEXT NOT NULL,
    "wage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "atmosphere" TEXT[],
    "rating" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "workplace_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "accommodation" (
    "postId" TEXT NOT NULL,
    "rent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "setup" TEXT[],
    "rating" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "accommodation_pkey" PRIMARY KEY ("postId")
);

-- CreateIndex
CREATE INDEX "location_lga_idx" ON "location"("lga");

-- CreateIndex
CREATE INDEX "location_suburb_idx" ON "location"("suburb");

-- CreateIndex
CREATE INDEX "location_state_lga_suburb_idx" ON "location"("state", "lga", "suburb");

-- CreateIndex
CREATE INDEX "workplace_wage_idx" ON "workplace"("wage");

-- CreateIndex
CREATE INDEX "workplace_rating_idx" ON "workplace"("rating");

-- CreateIndex
CREATE INDEX "workplace_rating_wage_idx" ON "workplace"("rating", "wage");

-- CreateIndex
CREATE INDEX "accommodation_rent_idx" ON "accommodation"("rent");

-- CreateIndex
CREATE INDEX "accommodation_rating_idx" ON "accommodation"("rating");

-- CreateIndex
CREATE INDEX "accommodation_rating_rent_idx" ON "accommodation"("rating", "rent");

-- CreateIndex
CREATE UNIQUE INDEX "like_userId_postId_key" ON "like"("userId", "postId");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workplace" ADD CONSTRAINT "workplace_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodation" ADD CONSTRAINT "accommodation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
