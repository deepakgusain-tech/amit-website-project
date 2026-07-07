/*
  Warnings:

  - Added the required column `description` to the `ServiceBenefits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceBenefits" ADD COLUMN     "description" TEXT NOT NULL;
