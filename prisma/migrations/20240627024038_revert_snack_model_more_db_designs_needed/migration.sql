/*
  Warnings:

  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_inOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_snackId_fkey`;

-- DropTable
DROP TABLE `CartItem`;

-- DropTable
DROP TABLE `Order`;
