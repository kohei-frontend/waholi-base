/*
  Warnings:

  - Added the required column `country_id` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_id` to the `state` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "facilities" ADD COLUMN     "country_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "state" ADD COLUMN     "country_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "country" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "facilities_state_id_idx" ON "facilities"("state_id");

-- CreateIndex
CREATE INDEX "facilities_lga_id_idx" ON "facilities"("lga_id");

-- CreateIndex
CREATE INDEX "facilities_suburb_id_idx" ON "facilities"("suburb_id");

-- CreateIndex
CREATE INDEX "facilities_state_id_lga_id_suburb_id_idx" ON "facilities"("state_id", "lga_id", "suburb_id");

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facilities" ADD CONSTRAINT "facilities_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
