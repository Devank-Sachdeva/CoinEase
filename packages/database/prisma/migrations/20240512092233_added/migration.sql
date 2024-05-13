/*
  Warnings:

  - Added the required column `provider_id` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "provider_id" TEXT NOT NULL;
