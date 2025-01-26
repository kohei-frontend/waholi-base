/*
  Warnings:

  - Added the required column `vote` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "vote" TEXT NOT NULL;
