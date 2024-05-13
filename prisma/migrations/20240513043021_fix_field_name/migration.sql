/*
  Warnings:

  - You are about to drop the column `AddedOn` on the `Snack` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Snack` DROP COLUMN `AddedOn`,
    ADD COLUMN `addedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
