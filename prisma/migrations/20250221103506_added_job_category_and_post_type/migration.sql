/*
  Warnings:

  - Added the required column `type` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('REVIEW', 'RECRUITMENT');

-- DropIndex
DROP INDEX "workplaces_rating_wage_idx";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "type" "PostType" NOT NULL;

-- AlterTable
ALTER TABLE "workplaces" ADD COLUMN     "job_category" TEXT;

-- CreateIndex
CREATE INDEX "workplaces_job_category_idx" ON "workplaces"("job_category");

-- CreateIndex
CREATE INDEX "workplaces_rating_wage_job_category_idx" ON "workplaces"("rating", "wage", "job_category");
