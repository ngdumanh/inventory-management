/*
  Warnings:

  - You are about to drop the column `amount` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Subscription` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `apiServiceId` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expireDate` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('UNPAID', 'ON_HOLD', 'AWAITING_SHIPMENT', 'AWAITING_COLLECTION', 'IN_TRANSIT', 'DELIVERED', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_storeId_fkey";

-- DropIndex
DROP INDEX "Subscription_storeId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "apiServiceId" INTEGER NOT NULL,
ADD COLUMN     "expireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subscriptionid" INTEGER;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "amount",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "storeId",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "APIServices" (
    "id" SERIAL NOT NULL,
    "serviceId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "APIServices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "APIServices_serviceId_key" ON "APIServices"("serviceId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_subscriptionid_fkey" FOREIGN KEY ("subscriptionid") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_apiServiceId_fkey" FOREIGN KEY ("apiServiceId") REFERENCES "APIServices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
