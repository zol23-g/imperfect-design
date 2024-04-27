-- CreateTable
CREATE TABLE `Producers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `product_type` TEXT NOT NULL,
    `product_amount` INTEGER NOT NULL,
    `standard_name` TEXT NOT NULL,
    `date_of_payment` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Producers_email_key`(`email`),
    UNIQUE INDEX `Producers_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_type` TEXT NOT NULL,
    `standard_name` TEXT NOT NULL,
    `amount` INTEGER NOT NULL,
    `pricing_detail` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
