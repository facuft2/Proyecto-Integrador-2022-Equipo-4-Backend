/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `catproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exchange` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `catproduct` DROP FOREIGN KEY `CatProduct_id_cate_fkey`;

-- DropForeignKey
ALTER TABLE `catproduct` DROP FOREIGN KEY `CatProduct_id_prod_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_userId_fkey`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `catproduct`;

-- DropTable
DROP TABLE `exchange`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contrasenia` VARCHAR(191) NOT NULL,
    `ultimo_acceso` DATETIME(3) NULL,
    `nro_puerta` INTEGER NULL,
    `localidad` VARCHAR(191) NULL,
    `calle` VARCHAR(191) NULL,
    `descripcion` VARCHAR(191) NULL,
    `tipo` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `cant_intercambio` INTEGER NOT NULL DEFAULT 0,
    `foto_perfil` LONGBLOB NULL,
    `telefono` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_telefono_key`(`telefono`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `tipo_trato` ENUM('INTERCAMBIO', 'DONACION') NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 0,
    `foto` LONGBLOB NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Producto_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categoria_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatProducto` (
    `id_prod` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cate` INTEGER NOT NULL,

    PRIMARY KEY (`id_prod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Intercambio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_producto_enviado` INTEGER NOT NULL,
    `id_producto_recibido` INTEGER NOT NULL,
    `estado` ENUM('ESPERANDO', 'ACEPTADO', 'RECHAZADO', 'CANCELADO') NOT NULL DEFAULT 'ESPERANDO',

    UNIQUE INDEX `Intercambio_id_producto_enviado_id_producto_recibido_key`(`id_producto_enviado`, `id_producto_recibido`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatProducto` ADD CONSTRAINT `CatProducto_id_prod_fkey` FOREIGN KEY (`id_prod`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatProducto` ADD CONSTRAINT `CatProducto_id_cate_fkey` FOREIGN KEY (`id_cate`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intercambio` ADD CONSTRAINT `Intercambio_id_producto_enviado_fkey` FOREIGN KEY (`id_producto_enviado`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intercambio` ADD CONSTRAINT `Intercambio_id_producto_recibido_fkey` FOREIGN KEY (`id_producto_recibido`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
