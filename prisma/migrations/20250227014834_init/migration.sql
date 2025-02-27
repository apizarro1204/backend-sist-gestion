-- CreateTable
CREATE TABLE `Tarea` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `fechaLimite` DATETIME(3) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `prioridad` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
