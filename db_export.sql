-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.7.33 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour dashboard_rehab
DROP DATABASE IF EXISTS `dashboard_rehab`;
CREATE DATABASE IF NOT EXISTS `dashboard_rehab` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `dashboard_rehab`;

-- Listage de la structure de la table dashboard_rehab. categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table dashboard_rehab.categories : ~6 rows (environ)
DELETE FROM `categories`;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `nom`, `isReady`, `modifiedAt`, `createdAt`) VALUES
	(1, 'Créativité', 1, NULL, '2022-04-22 09:15:21'),
	(3, 'Cognition', 1, NULL, '2022-04-22 09:15:21'),
	(4, 'Sport', 1, NULL, '2022-04-22 09:15:21'),
	(5, 'Psycho éducation', 1, NULL, '2022-04-22 09:15:21'),
	(6, 'Relaxation', 1, NULL, '2022-04-22 09:15:21'),
	(10, 'Culture & Infos', 1, NULL, '2022-04-22 09:15:21');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Listage de la structure de la table dashboard_rehab. challenge
DROP TABLE IF EXISTS `challenge`;
CREATE TABLE IF NOT EXISTS `challenge` (
  `contenu` varchar(10000) COLLATE utf8_unicode_ci DEFAULT ' ',
  `createdAt` timestamp NULL DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isReady` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `challenge`(`contenu`, `isReady`) VALUES('Description vide', 0);

-- Listage de la structure de la table dashboard_rehab. commentaires
DROP TABLE IF EXISTS `commentaires`;
CREATE TABLE IF NOT EXISTS `commentaires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note` int(11) DEFAULT NULL,
  `commentaire` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `exerciceId` int(11) NOT NULL,
  `isDeleted` tinyint(4) DEFAULT '0',
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `exerciceId` (`exerciceId`),
  CONSTRAINT `FK_commentaires_exercices` FOREIGN KEY (`exerciceId`) REFERENCES `exercices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table dashboard_rehab. exercices
DROP TABLE IF EXISTS `exercices`;
CREATE TABLE IF NOT EXISTS `exercices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `parentId` int(11) NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0',
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `themeId` (`parentId`) USING BTREE,
  CONSTRAINT `FK_exercices_themes` FOREIGN KEY (`parentId`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table dashboard_rehab. items
DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(10000) CHARACTER SET utf8 NOT NULL,
  `typeItem` varchar(50) CHARACTER SET utf8 NOT NULL,
  `parentId` int(11) NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0',
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `exerciceId` (`parentId`) USING BTREE,
  CONSTRAINT `FK_items_exercices` FOREIGN KEY (`parentId`) REFERENCES `exercices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table dashboard_rehab. mots
DROP TABLE IF EXISTS `mots`;
CREATE TABLE IF NOT EXISTS `mots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `definition` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0',
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table dashboard_rehab. presentation
DROP TABLE IF EXISTS `presentation`;
CREATE TABLE IF NOT EXISTS `presentation` (
  `contenu` varchar(1000) CHARACTER SET utf8 NOT NULL DEFAULT ' ',
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`contenu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `presentation`(`contenu`, `isReady`) VALUES('Description vide', 0);

-- Listage de la structure de la table dashboard_rehab. themes
DROP TABLE IF EXISTS `themes`;
CREATE TABLE IF NOT EXISTS `themes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `parentId` int(11) NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0',
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `categorieId` (`parentId`) USING BTREE,
  CONSTRAINT `FK_themes_categories` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
dashboard_rehabitems