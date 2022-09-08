-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contrasenia` VARCHAR(191) NOT NULL,
    `ultimo_acceso` DATETIME(3) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `tipo` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `cant_intercambio` INTEGER NOT NULL DEFAULT 0,
    `foto_perfil` LONGBLOB NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_telefono_key`(`telefono`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuDir` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nro_puerta` INTEGER NOT NULL,
    `localidad` VARCHAR(191) NOT NULL,
    `calle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
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
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categoria_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CateProducto` (
    `id_prod` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cate` INTEGER NOT NULL,

    PRIMARY KEY (`id_prod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Intercambio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prod1` INTEGER NOT NULL,
    `id_prod2` INTEGER NOT NULL,
    `estado` ENUM('ESPERANDO', 'ACEPTADO', 'RECHAZADO', 'CANCELADO') NOT NULL DEFAULT 'ESPERANDO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsuDir` ADD CONSTRAINT `UsuDir_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_id_pers_fkey` FOREIGN KEY (`id_pers`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CateProducto` ADD CONSTRAINT `CateProducto_id_prod_fkey` FOREIGN KEY (`id_prod`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CateProducto` ADD CONSTRAINT `CateProducto_id_cate_fkey` FOREIGN KEY (`id_cate`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
