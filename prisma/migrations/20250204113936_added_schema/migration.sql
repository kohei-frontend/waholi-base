/*
  Warnings:

  - You are about to drop the column `vote` on the `comment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[post_id]` on the table `accommodation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_id]` on the table `workplace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('upvote', 'downvote');

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "vote",
ADD COLUMN     "is_hidden" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "image" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "commentVote" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "vote_type" "VoteType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commentVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminNotification" (
    "id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "notified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adminNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "commentVote_user_id_comment_id_key" ON "commentVote"("user_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "accommodation_post_id_key" ON "accommodation"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "workplace_post_id_key" ON "workplace"("post_id");

-- AddForeignKey
ALTER TABLE "commentVote" ADD CONSTRAINT "commentVote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentVote" ADD CONSTRAINT "commentVote_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adminNotification" ADD CONSTRAINT "adminNotification_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
