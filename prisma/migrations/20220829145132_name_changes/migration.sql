/*
  Warnings:

  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cateproducto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `intercambio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `producto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usudir` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cateproducto` DROP FOREIGN KEY `CateProducto_id_cate_fkey`;

-- DropForeignKey
ALTER TABLE `cateproducto` DROP FOREIGN KEY `CateProducto_id_prod_fkey`;

-- DropForeignKey
ALTER TABLE `producto` DROP FOREIGN KEY `Producto_id_pers_fkey`;

-- DropForeignKey
ALTER TABLE `usudir` DROP FOREIGN KEY `UsuDir_user_id_fkey`;

-- DropTable
DROP TABLE `categoria`;

-- DropTable
DROP TABLE `cateproducto`;

-- DropTable
DROP TABLE `intercambio`;

-- DropTable
DROP TABLE `producto`;

-- DropTable
DROP TABLE `usuario`;

-- DropTable
DROP TABLE `usudir`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contrasenia` VARCHAR(191) NOT NULL,
    `ultimo_acceso` DATETIME(3) NOT NULL,
    `nro_puerta` INTEGER NOT NULL,
    `localidad` VARCHAR(191) NOT NULL,
    `calle` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `tipo` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `cant_intercambio` INTEGER NOT NULL DEFAULT 0,
    `foto_perfil` LONGBLOB NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_telefono_key`(`telefono`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `tipo_trato` ENUM('INTERCAMBIO', 'DONACION') NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 0,
    `foto` LONGBLOB NOT NULL,
    `id_pers` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatProduct` (
    `id_prod` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cate` INTEGER NOT NULL,

    PRIMARY KEY (`id_prod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exchange` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prod1` INTEGER NOT NULL,
    `id_prod2` INTEGER NOT NULL,
    `estado` ENUM('ESPERANDO', 'ACEPTADO', 'RECHAZADO', 'CANCELADO') NOT NULL DEFAULT 'ESPERANDO',

    UNIQUE INDEX `Exchange_id_prod1_id_prod2_key`(`id_prod1`, `id_prod2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_id_pers_fkey` FOREIGN KEY (`id_pers`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatProduct` ADD CONSTRAINT `CatProduct_id_prod_fkey` FOREIGN KEY (`id_prod`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatProduct` ADD CONSTRAINT `CatProduct_id_cate_fkey` FOREIGN KEY (`id_cate`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
