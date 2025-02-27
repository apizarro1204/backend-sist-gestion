-- AlterTable
ALTER TABLE `tarea` ADD COLUMN `categoriaId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categoria_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tarea` ADD CONSTRAINT `Tarea_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
