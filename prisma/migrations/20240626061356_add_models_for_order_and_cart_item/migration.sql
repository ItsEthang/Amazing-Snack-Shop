-- CreateTable
CREATE TABLE `CartItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `inOrderId` INTEGER NULL,
    `snackId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalPrice` VARCHAR(191) NOT NULL,
    `addedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `isDelivered` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_snackId_fkey` FOREIGN KEY (`snackId`) REFERENCES `Snack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_inOrderId_fkey` FOREIGN KEY (`inOrderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
