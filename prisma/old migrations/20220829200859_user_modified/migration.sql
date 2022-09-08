/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `nro_puerta` INTEGER NOT NULL DEFAULT 0,
    MODIFY `localidad` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `calle` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `descripcion` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `telefono` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `usuario`;
