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