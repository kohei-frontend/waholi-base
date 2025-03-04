/*
  Warnings:

  - You are about to drop the column `country` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `users` table. All the data in the column will be lost.
  - Added the required column `address` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hp` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "facilities" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "hp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "country",
DROP COLUMN "state",
ADD COLUMN     "country_id" TEXT NOT NULL,
ADD COLUMN     "state_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
