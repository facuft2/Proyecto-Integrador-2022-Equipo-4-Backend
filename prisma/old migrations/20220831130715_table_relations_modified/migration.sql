/*
  Warnings:

  - You are about to drop the column `id_pers` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[catProductId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `catProductId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_id_pers_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `id_pers`,
    ADD COLUMN `catProductId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `ultimo_acceso` DATETIME(3) NULL,
    MODIFY `nro_puerta` INTEGER NULL,
    MODIFY `localidad` VARCHAR(191) NULL,
    MODIFY `calle` VARCHAR(191) NULL,
    MODIFY `descripcion` VARCHAR(191) NULL,
    MODIFY `foto_perfil` LONGBLOB NULL,
    MODIFY `telefono` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_userId_key` ON `Product`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_catProductId_key` ON `Product`(`catProductId`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatProduct` ADD CONSTRAINT `CatProduct_id_prod_fkey` FOREIGN KEY (`id_prod`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
