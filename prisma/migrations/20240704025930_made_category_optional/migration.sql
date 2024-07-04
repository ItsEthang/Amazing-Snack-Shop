-- DropForeignKey
ALTER TABLE `Snack` DROP FOREIGN KEY `Snack_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Snack` MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Snack` ADD CONSTRAINT `Snack_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
