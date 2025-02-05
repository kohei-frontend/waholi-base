/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `isRead` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `targetType` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `accommodation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `postType` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tenant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tenant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `userTenant` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `userTenant` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `userTenant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `userTenant` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `userTenant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `notificationSettings` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `planType` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - The primary key for the `workplace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `workplace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,post_id]` on the table `like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `target_id` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_type` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `accommodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_type` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `userTenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `userTenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `userTenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_type` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `workplace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "accommodation" DROP CONSTRAINT "accommodation_postId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_postId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_postId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_userId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_locationId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_userId_fkey";

-- DropForeignKey
ALTER TABLE "userTenant" DROP CONSTRAINT "userTenant_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "userTenant" DROP CONSTRAINT "userTenant_userId_fkey";

-- DropForeignKey
ALTER TABLE "workplace" DROP CONSTRAINT "workplace_postId_fkey";

-- DropIndex
DROP INDEX "like_userId_postId_key";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "isRead",
DROP COLUMN "targetId",
DROP COLUMN "targetType",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "target_id" TEXT NOT NULL,
ADD COLUMN     "target_type" "NotificationTargetType" NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "accommodation" DROP CONSTRAINT "accommodation_pkey",
DROP COLUMN "postId",
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD CONSTRAINT "accommodation_pkey" PRIMARY KEY ("post_id");

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "postId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "image" DROP COLUMN "createdAt",
DROP COLUMN "postId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "like" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "location" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "locationId",
DROP COLUMN "postType",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "location_id" TEXT NOT NULL,
ADD COLUMN     "post_type" "PostType" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenant" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "userTenant" DROP COLUMN "createdAt",
DROP COLUMN "isDefault",
DROP COLUMN "tenantId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_default" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tenant_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "notificationSettings",
DROP COLUMN "planType",
DROP COLUMN "profileImage",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "notification_settings" TEXT,
ADD COLUMN     "plan_type" TEXT NOT NULL,
ADD COLUMN     "profile_image" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "workplace" DROP CONSTRAINT "workplace_pkey",
DROP COLUMN "postId",
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD CONSTRAINT "workplace_pkey" PRIMARY KEY ("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "like_user_id_post_id_key" ON "like"("user_id", "post_id");

-- AddForeignKey
ALTER TABLE "userTenant" ADD CONSTRAINT "userTenant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTenant" ADD CONSTRAINT "userTenant_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workplace" ADD CONSTRAINT "workplace_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodation" ADD CONSTRAINT "accommodation_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
