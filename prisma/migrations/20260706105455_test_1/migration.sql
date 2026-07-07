/*
  Warnings:

  - Added the required column `description` to the `DeliveryProcess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryProcess" ADD COLUMN     "description" TEXT NOT NULL;
