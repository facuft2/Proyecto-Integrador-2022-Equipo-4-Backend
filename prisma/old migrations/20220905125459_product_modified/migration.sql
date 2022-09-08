/*
  Warnings:

  - You are about to drop the column `catProductId` on the `product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Product_catProductId_key` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `catProductId`,
    MODIFY `foto` LONGBLOB NULL;
