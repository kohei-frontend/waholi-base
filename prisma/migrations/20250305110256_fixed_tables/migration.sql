/*
  Warnings:

  - You are about to drop the column `lga_id` on the `facilities` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `facilities` table. All the data in the column will be lost.
  - You are about to drop the column `suburb_id` on the `facilities` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[state,lga,suburb,name,type]` on the table `facilities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lga` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suburb` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `facilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `state` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "facilities" DROP CONSTRAINT "facilities_lga_id_fkey";

-- DropForeignKey
ALTER TABLE "facilities" DROP CONSTRAINT "facilities_state_id_fkey";

-- DropForeignKey
ALTER TABLE "facilities" DROP CONSTRAINT "facilities_suburb_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_state_id_fkey";

-- DropIndex
DROP INDEX "facilities_lga_id_idx";

-- DropIndex
DROP INDEX "facilities_state_id_idx";

-- DropIndex
DROP INDEX "facilities_state_id_lga_id_suburb_id_idx";

-- DropIndex
DROP INDEX "facilities_state_id_lga_id_suburb_id_name_type_key";

-- DropIndex
DROP INDEX "facilities_suburb_id_idx";

-- AlterTable
ALTER TABLE "facilities" DROP COLUMN "lga_id",
DROP COLUMN "state_id",
DROP COLUMN "suburb_id",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "lga" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "suburb" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "state_id",
ADD COLUMN     "state" TEXT NOT NULL;

-- DropEnum
DROP TYPE "FacilityType";

-- DropEnum
DROP TYPE "PostType";

-- CreateIndex
CREATE INDEX "facilities_state_idx" ON "facilities"("state");

-- CreateIndex
CREATE INDEX "facilities_lga_idx" ON "facilities"("lga");

-- CreateIndex
CREATE INDEX "facilities_suburb_idx" ON "facilities"("suburb");

-- CreateIndex
CREATE INDEX "facilities_state_lga_suburb_idx" ON "facilities"("state", "lga", "suburb");

-- CreateIndex
CREATE UNIQUE INDEX "facilities_state_lga_suburb_name_type_key" ON "facilities"("state", "lga", "suburb", "name", "type");
