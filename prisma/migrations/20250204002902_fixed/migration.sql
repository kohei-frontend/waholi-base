/*
  Warnings:

  - You are about to drop the column `notification_settings` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `usertenant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "usertenant" DROP CONSTRAINT "usertenant_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "usertenant" DROP CONSTRAINT "usertenant_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "notification_settings",
DROP COLUMN "profile_image",
ADD COLUMN     "notificationSettings" TEXT,
ADD COLUMN     "profileImage" TEXT,
ALTER COLUMN "planType" DROP DEFAULT;

-- DropTable
DROP TABLE "usertenant";

-- CreateTable
CREATE TABLE "userTenant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userTenant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userTenant" ADD CONSTRAINT "userTenant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTenant" ADD CONSTRAINT "userTenant_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
