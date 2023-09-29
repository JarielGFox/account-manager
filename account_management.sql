/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `accounts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_confirmation` varchar(255) DEFAULT '',
  `role` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `personal_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` bigint unsigned DEFAULT NULL,
  `name` varchar(125) DEFAULT NULL,
  `surname` varchar(125) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profile_pic` varchar(500) DEFAULT NULL,
  `biography` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_id` (`account_id`) USING BTREE,
  CONSTRAINT `personal_info_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `accounts` (`id`, `email`, `username`, `password`, `password_confirmation`, `role`, `created_at`, `updated_at`) VALUES
(3, 'spiffo@spiffo.com', 'Spiffo', '$2y$10$eqN6noU3t4Xm0w2bzBnFL.0eS8qITuxqzvoNrvDdbFjrYULJWHNHK', '', 0, NULL, NULL);
INSERT INTO `accounts` (`id`, `email`, `username`, `password`, `password_confirmation`, `role`, `created_at`, `updated_at`) VALUES
(6, 'test@test.it', 'Test', '$2y$10$Aj2dPZe2yqoZyfRm7UI9wusVXwlMZOqqAtOOsrEg0w2Rzqv40f0nO', '', 0, NULL, NULL);


INSERT INTO `personal_info` (`id`, `account_id`, `name`, `surname`, `date_of_birth`, `address`, `profile_pic`, `biography`) VALUES
(1, 3, 'Spiffo', 'the Raccoon', '1990-01-01', 'Kentucky, US', 'prova', 'ASMARE');
INSERT INTO `personal_info` (`id`, `account_id`, `name`, `surname`, `date_of_birth`, `address`, `profile_pic`, `biography`) VALUES
(4, 6, 'Testa', 'Di Cazzo', '1995-02-01', 'Ciao', 'Miao', 'Bau');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;