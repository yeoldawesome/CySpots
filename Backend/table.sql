CREATE SCHEMA IF NOT EXISTS `cyspots` DEFAULT CHARACTER SET utf8 ;
USE `cyspots` ;

-- -----------------------------------------------------
-- Table `cyspots`.`spots`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyspots`.`spots` (
    `id` INT AUTO_INCREMENT,
    `spot_name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `message_timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `image_url` VARCHAR(255),
    PRIMARY KEY (`id`)
);

INSERT INTO `cyspots`.`spots` (`spot_name`, `location`, `description`, `image_url`)
VALUES 
('Spot 1', 'Location 1', 'Description 1', 'https://via.placeholder.com/150');

-- -----------------------------------------------------
-- Table `cyspots`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyspots`.`users` (
    `id` INT AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'user') DEFAULT 'user',
    PRIMARY KEY (`id`)
);

INSERT INTO `cyspots`.`users` (`username`, `password`)
VALUES 
('admin', 'admin');