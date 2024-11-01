/*
  Warnings:

  - Added the required column `shop_description` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN "shop_description" TEXT;
UPDATE "Shop" SET "shop_description" = 'Default description' WHERE "shop_description" IS NULL;