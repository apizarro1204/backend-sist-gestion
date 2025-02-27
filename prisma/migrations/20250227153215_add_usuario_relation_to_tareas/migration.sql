-- AlterTable
ALTER TABLE `tarea` ADD COLUMN `usuarioId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Tarea` ADD CONSTRAINT `Tarea_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
