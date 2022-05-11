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


-- Listage de la structure de la base pour id18263011_databaselarehab
CREATE DATABASE IF NOT EXISTS `id18263011_databaselarehab` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `id18263011_databaselarehab`;

-- Listage de la structure de la table id18263011_databaselarehab. categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.categories : ~6 rows (environ)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `nom`, `isReady`, `modifiedAt`, `createdAt`) VALUES
id18263011_databaselarehabcategories	(1, 'Créativité', 1, NULL, '2022-04-22 09:15:21'),
	(3, 'Cognition', 1, NULL, '2022-04-22 09:15:21'),
	(4, 'Sport', 1, NULL, '2022-04-22 09:15:21'),
	(5, 'Psycho-éducation', 1, NULL, '2022-04-22 09:15:21'),
	(6, 'Relaxation', 1, NULL, '2022-04-22 09:15:21'),
	(10, 'Culture & Infos', 1, NULL, '2022-04-22 09:15:21');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Listage de la structure de la table id18263011_databaselarehab. commentaires
CREATE TABLE IF NOT EXISTS `commentaires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note` int(11) DEFAULT NULL,
  `commentaire` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `exerciceId` int(11) NOT NULL,
  `isDeleted` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `exerciceId` (`exerciceId`),
  CONSTRAINT `FK_commentaires_exercices` FOREIGN KEY (`exerciceId`) REFERENCES `exercices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.commentaires : ~4 rows (environ)
/*!40000 ALTER TABLE `commentaires` DISABLE KEYS */;
INSERT INTO `commentaires` (`id`, `note`, `commentaire`, `exerciceId`, `isDeleted`) VALUES
	(29, 3, 'Super', 13, 0),
	(32, 5, 'cuper commentaire', 13, 0),
	(33, 5, 'J\'ai beaucoup aimé', 11, 0),
	(34, 4, 'commentaire', 11, 0);
/*!40000 ALTER TABLE `commentaires` ENABLE KEYS */;

-- Listage de la structure de la table id18263011_databaselarehab. exercices
CREATE TABLE IF NOT EXISTS `exercices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `parentId` int(11) NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `themeId` (`parentId`) USING BTREE,
  CONSTRAINT `FK_exercices_themes` FOREIGN KEY (`parentId`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.exercices : ~16 rows (environ)
/*!40000 ALTER TABLE `exercices` DISABLE KEYS */;
INSERT INTO `exercices` (`id`, `nom`, `parentId`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`) VALUES
	(11, 'Les recettes de EtcheDom test', 8, 1, '2022-04-28 09:13:41', '2022-04-22 09:16:20', 0),
	(13, 'Frigo Magic', 8, 1, '2022-04-26 09:37:58', '2022-04-22 09:16:20', 0),
	(14, 'Le monde de la chocolaterie', 8, 1, '2022-04-26 13:19:16', '2022-04-22 09:16:20', 0),
	(15, 'exercice test', 8, 1, '2022-05-02 15:36:41', '2022-05-02 14:03:48', 0),
	(16, '1', 8, 1, NULL, '2022-05-02 15:36:41', 0),
	(17, 'test vidéo', 8, 1, NULL, '2022-05-03 15:10:50', 0),
	(18, 'test texte', 8, 1, NULL, '2022-05-05 16:04:04', 0),
	(20, 'allo', 12, 1, NULL, '2022-05-05 16:04:04', 0),
	(21, 'test 2', 21, 1, NULL, '2022-05-05 16:04:04', 0),
	(22, 'bonjour', 16, 1, NULL, '2022-05-05 16:04:04', 0),
	(23, 'au revoir', 37, 1, NULL, '2022-05-05 16:04:04', 0),
	(24, 'test texte exercice', 21, 1, NULL, '2022-05-05 16:04:04', 0),
	(25, '2', 21, 1, NULL, '2022-05-05 16:04:04', 0),
	(26, 'test', 8, 1, '2022-05-10 14:02:00', '2022-05-10 10:14:17', 1),
	(27, 'test raw', 8, 1, NULL, '2022-05-10 11:03:36', 0),
	(28, 'test final', 8, 1, '2022-05-10 14:10:18', '2022-05-10 14:02:00', 1);
/*!40000 ALTER TABLE `exercices` ENABLE KEYS */;

-- Listage de la structure de la table id18263011_databaselarehab. items
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(10000) CHARACTER SET utf8 NOT NULL,
  `typeItem` varchar(50) CHARACTER SET utf8 NOT NULL,
  `parentId` int(11) NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `exerciceId` (`parentId`) USING BTREE,
  CONSTRAINT `FK_items_exercices` FOREIGN KEY (`parentId`) REFERENCES `exercices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.items : ~36 rows (environ)
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` (`id`, `nom`, `typeItem`, `parentId`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`) VALUES
	(11, '<p15><g>Halloween</g>, c\'est la quête des bonbons des enfants dans leur quartier mais c\'est aussi la confection de recettes diverses et variées et surtout très <i>créatives</i>. \r\ndom, que nous surnommons <#00ff55>EtcheDom </#00ff55>nous livre ici quelques exemples trouvés sur internet.</p15>', 'Texte', 11, 0, '2022-05-10 13:40:43', '2022-04-22 09:16:36', 0),
	(13, 'texte cool', 'Texte', 11, 1, '2022-05-03 14:36:42', '2022-04-22 09:16:36', 1),
	(14, '/database/images/canva Idées cuisine pour Halloween 2021-10-13.jpg', 'Image', 11, 1, '2022-04-25 13:36:26', '2022-04-22 09:16:36', 0),
	(16, 'http://localhost/index.php', 'Lien', 11, 0, '2022-05-03 14:36:42', '2022-04-22 09:16:36', 0),
	(17, '/database/images/giphy.gif', 'Image', 11, 1, '2022-04-25 11:54:34', '2022-04-22 09:16:36', 0),
	(22, 'Cette application vous propose des idées de recettes pour vos repas avec les produits qui sont disponibles dans votre frigo et dans les placards de votre cuisine.\r\n                            \r\n                            ', 'Texte', 13, 1, '2022-04-26 13:19:16', '2022-04-22 09:16:36', 0),
	(23, 'Comment faire une fois sur l’application Frigo Magic ?', 'Texte', 13, 1, NULL, '2022-04-22 09:16:36', 0),
	(24, 'http://localhost/index.php', 'Lien', 13, 1, '2022-04-26 09:14:12', '2022-04-22 09:16:36', 0),
	(25, 'Bonjour,\r\n\r\nPour ce lundi de Pâques, nous vous avons élaboré un programme avec différentes activités à essayer à votre domicile autour de la thématique du... chocolat ! Quelle surprise !', 'Texte', 14, 1, NULL, '2022-04-22 09:16:36', 0),
	(26, 'Il fallait forcément qu’on vous parle de recettes pour cette occasion particulière et de recettes au chocolat bien évidemment ! Nous vous proposons des Truffes au chocolat (c’est presque comme des œufs en chocolat).', 'Texte', 14, 1, NULL, '2022-04-22 09:16:36', 0),
	(27, 'https://www.marmiton.org/recettes/recette_truffes-au-chocolat_15660.aspx', 'Lien', 14, 1, NULL, '2022-04-22 09:16:36', 0),
	(28, '/database/images/dessert-813278_1280.jpg', 'Image', 14, 1, NULL, '2022-04-22 09:16:36', 0),
	(29, 'http://localhost/', 'Lien', 15, 1, NULL, '2022-05-02 14:39:39', 0),
	(30, 'http://youtu.be/0zM3nApSvMg', 'Video', 16, 1, '2022-05-10 11:52:21', '2022-05-03 13:30:52', 0),
	(31, 'nouvelle vidéo', 'Video', 11, 1, '2022-05-03 14:36:42', '2022-05-03 14:13:32', 1),
	(32, 'c\'est un texte pour introduire la vidéo', 'Texte', 17, 1, NULL, '2022-05-03 15:10:50', 0),
	(33, 'allez ion la remplace\r\n', 'Texte', 17, 1, '2022-05-03 15:28:35', '2022-05-03 15:10:50', 0),
	(34, 'U2vVpEeXnag', 'Video', 17, 1, '2022-05-03 15:32:31', '2022-05-03 15:10:50', 1),
	(35, 'U2vVpEeXnag', 'Video', 17, 1, NULL, '2022-05-03 15:32:31', 0),
	(36, '<i>Titre\r\n</i>intro de l\'article\r\ncorps où on dit plein de choses\r\n<i><#00ff11>bisous</#00ff11> au revoir</i>\r\n', 'Texte', 11, 1, '2022-05-10 13:42:48', '2022-05-05 09:26:49', 0),
	(37, '<r>\r\n<r>\r\nzefa<r>\r\nefa<r>\r\naz<r>\r\nzef<r>\r\nefa<r>\r\nfaz<r>\r\nfea<r>\r\najdpeasuper', 'Texte', 17, 1, NULL, '2022-05-05 09:29:06', 0),
	(38, 'textealoo\r\n\r\ntexte', 'Texte', 11, 1, '2022-05-10 11:31:55', '2022-05-05 09:30:35', 0),
	(39, '<g>titre de l\'exercice </g>\r\n<i>contenu en <g>gras</g> et <s>souligné </s>\r\n</i>fin en <i>italique </i>\r\n<s>nouveau texte souligné</s>\r\n                                ', 'Texte', 18, 1, '2022-05-10 10:12:20', '2022-05-05 16:06:52', 0),
	(40, 'on commence normal , ensuite retour à la ligne\r\n<g>on se met en gras, on souligne ce <s>mot </s>et la fin de la <i>phrase en italique</i></g>\r\n<p30>police <#ff0000>30</#ff0000> , soyons fous</p30>\r\n<g><s><i><p25><#3f7bca>maintenant on met tout ensemble</#3f7bca></p25></i></s></g>\r\non peut finir sur du <#2bff00>vert fluo</#2bff00> en <p10>police 10</p10>', 'Texte', 26, 1, '2022-05-10 14:02:00', '2022-05-10 10:14:17', 1),
	(41, 'on essaie du texte simple sans balise', 'Texte', 26, 1, '2022-05-10 14:02:00', '2022-05-10 11:03:36', 1),
	(42, 'texte raw svp ça marche', 'Texte', 27, 1, '2022-05-10 12:01:51', '2022-05-10 11:03:36', 0),
	(43, '', 'Texte', 11, 1, NULL, '2022-05-10 11:31:55', 0),
	(44, 'bonjour', 'Texte', 11, 1, NULL, '2022-05-10 11:31:55', 0),
	(45, 'bonjour', 'Texte', 11, 1, NULL, '2022-05-10 11:31:55', 0),
	(46, 'allo', 'Texte', 11, 1, '2022-05-10 11:46:03', '2022-05-10 11:31:55', 1),
	(47, '../database/images/dashboard.PNG', 'Image', 26, 1, '2022-05-10 14:02:00', '2022-05-10 13:50:21', 1),
	(48, 'https://www.youtube.com/watch?v=aY1QuPR1ibY', 'Video', 28, 1, '2022-05-10 14:10:18', '2022-05-10 14:02:00', 1),
	(49, 'https://youtu.be/aY1QuPR1ibY', 'Video', 28, 1, '2022-05-10 14:10:18', '2022-05-10 14:02:00', 1),
	(50, 'Texte sans balises', 'Texte', 28, 1, '2022-05-10 14:10:18', '2022-05-10 14:02:00', 1),
	(51, 'Texte avec toutes les balises donc <g>gras</g>, <s>souligné</s>, <i>italique</i>, <p25>police \r\n25</p25>, <#c74343>couleur rouge</#c74343>', 'Texte', 28, 1, '2022-05-10 14:10:18', '2022-05-10 14:02:00', 1),
	(52, '<g>un texte tout en gras avec <#137634>cette partie en vert et ce <s>mot </s>souligné </#137634>avant la suite</g>', 'Texte', 28, 1, '2022-05-10 14:10:18', '2022-05-10 14:02:00', 1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;

-- Listage de la structure de la table id18263011_databaselarehab. mots
CREATE TABLE IF NOT EXISTS `mots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `definition` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.mots : ~16 rows (environ)
/*!40000 ALTER TABLE `mots` DISABLE KEYS */;
INSERT INTO `mots` (`id`, `nom`, `definition`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`) VALUES
	(4, 'Attention sélective test', 'Capacité à focaliser son attention sur des informations pertinentes en laissant de côté celles qui ne sont pas utiles pour l\'activité en cours.', 1, '2022-05-02 13:53:59', '2022-04-22 09:16:57', 0),
	(5, 'Attention soutenue', 'Capacité à maintenir son attention sur du long terme et de façon stable. ', 1, '2022-04-28 10:51:53', '2022-04-22 09:16:57', 1),
	(6, 'Cognition sociale', 'Ensemble des processus cognitifs (aussi appelés « capacités cognitives ») permettant de comprendre les autres et d\'interagir avec eux. La sphère de la cognition sociale comprend 4 domaines : la perception émotionnelle, la perception et connaissances sociales, la théorie de l’esprit et les biais attributionnels. ', 1, '2022-05-02 13:53:59', '2022-04-22 09:16:57', 1),
	(7, 'Contrôle inhibiteur', 'Capacité à faire abstraction (ou à supprimer) des pensées, des actions ou des informations qui sont inappropriées pour la situation ou la tâche en cours. Il peut s\'agir de pensées/actions/informations automatiques, distrayantes ou qui ne sont plus utiles pour la situation donnée. Cette capacité nous permet de sélectionner des informations cohérentes en vue d’un objectif. L’inhibition fait partie des fonctions exécutives (cf. définition ci-après) qui sont des compétences cognitives permettant de réagir dans des situations imprévues, peu connues ou complexes et nous y adapter. ', 1, '2022-04-26 10:22:28', '2022-04-22 09:16:57', 0),
	(8, 'Flexibilité cognitive', 'Capacité à réorienter son attention et son action pour s\'adapter à un changement ou à une situation différente. Cette capacité permet de passer d\'une activité à une autre (c\'est-à-dire d\'alterner entre plusieurs activités) spontanément ou à la demande de quelqu\'un d\'autre. La flexibilité fait partie des fonctions exécutives (cf. définition ci-après) qui sont des compétences cognitives permettant de réagir dans des situations imprévues, peu connues ou complexes et de nous y adapter. ', 1, '2022-04-25 16:32:46', '2022-04-22 09:16:57', 0),
	(9, 'Fonctions exécutives', 'Terme qui regroupe plusieurs fonctions cognitives élaborées : la planification, le contrôle inhibiteur, la flexibilité, l’initiation et la planification (certains auteurs en rajoutent d\'autres). Les fonctions exécutives interviennent quand une situation nouvelle, imprévue et / ou complexe se déroule. Dans ce type de situation, nous ne pouvons plus nous laisser porter par nos automatismes et nous devons mettre en place une autre façon de procéder pour nous adapter à la situation. Les fonctions exécutives nous permettent donc de nous adapter aux situations pour lesquelles il n\'y a pas de solution toute faite. ', 1, NULL, '2022-04-22 09:16:57', 0),
	(10, 'Initiation', 'Capacité à amorcer, à mettre en route une action. ', 1, '2022-04-26 11:15:08', '2022-04-22 09:16:57', 0),
	(11, 'Mémoire à court terme', 'Capacité à retenir des informations pendant un très court laps de temps.', 1, '2022-04-26 11:02:47', '2022-04-22 09:16:57', 0),
	(12, 'test', 'aaa', 1, '2022-04-28 11:21:20', '2022-04-28 10:51:53', 1),
	(13, 'Nouveau mot', 'aaa', 1, '2022-04-28 11:24:24', '2022-04-28 11:21:20', 1),
	(14, 'teste-_çl', 'aae', 1, '2022-04-29 14:29:24', '2022-04-29 14:13:55', 1),
	(15, 'testfe', '', 1, '2022-04-29 14:28:45', '2022-04-29 14:28:36', 1),
	(16, 'Nouveau mot', '', 1, NULL, '2022-04-29 14:28:45', 0),
	(17, 'test', 'aa', 1, NULL, '2022-05-02 13:53:59', 0),
	(18, 'aa', 'aze', 1, NULL, '2022-05-02 16:09:13', 0),
	(19, 'bb', 'a', 1, NULL, '2022-05-02 16:09:13', 0);
/*!40000 ALTER TABLE `mots` ENABLE KEYS */;

-- Listage de la structure de la table id18263011_databaselarehab. presentation
CREATE TABLE IF NOT EXISTS `presentation` (
  `contenu` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contenu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.presentation : ~1 rows (environ)
/*!40000 ALTER TABLE `presentation` DISABLE KEYS */;
INSERT INTO `presentation` (`contenu`, `isReady`, `modifiedAt`, `createdAt`) VALUES
	('test L\'App\'Rehab a été créée en mars 2022 et a pour objectif de base de vous soutenir, toutes et tous. A l\'époque, nous avions décidé de vous accompagner quotidiennement en vous proposant de nombreuses activités à réaliser chez vous. Nous vous avons donc proposé différents outils de créativité et bien d\'autres thématiques encore. Il nous semblait fondamental de faire en sorte que le programme de Réhab que vous aviez engagé en début d\'année au sein du DSRPS puisse continuer.', 1, '2022-05-03 16:41:32', '2022-04-22 09:17:14');
/*!40000 ALTER TABLE `presentation` ENABLE KEYS */;

-- Listage de la structure de la table id18263011_databaselarehab. themes
CREATE TABLE IF NOT EXISTS `themes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `parentId` int(11) NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `categorieId` (`parentId`) USING BTREE,
  CONSTRAINT `FK_themes_categories` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.themes : ~30 rows (environ)
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` (`id`, `nom`, `parentId`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`) VALUES
	(8, 'Cuisine test', 1, 1, '2022-05-02 13:52:40', '2022-04-22 09:17:32', 0),
	(9, 'On poursuit les présentations', 1, 1, '2022-04-25 15:28:38', '2022-04-22 09:17:32', 0),
	(10, 'J\'ai le smile !', 1, 1, NULL, '2022-04-22 09:17:32', 0),
	(11, 'C\'est la rentrée !', 1, 1, '2022-04-26 14:05:41', '2022-04-22 09:17:32', 0),
	(12, 'Quand la créa voyage...', 1, 1, NULL, '2022-04-22 09:17:32', 0),
	(13, 'En août...', 1, 1, '2022-04-28 10:51:53', '2022-04-22 09:17:32', 1),
	(14, 'Votre bibliothèque estivale', 1, 1, '2022-05-02 13:52:40', '2022-04-22 09:17:32', 1),
	(15, 'La santé pour tous !', 4, 1, NULL, '2022-04-22 09:17:32', 0),
	(16, 'Le plein d\'activités dans les valises', 3, 1, NULL, '2022-04-22 09:17:32', 0),
	(17, 'A vos podcasts', 5, 1, NULL, '2022-04-22 09:17:32', 0),
	(18, 'Nature et bien être', 6, 1, NULL, '2022-04-22 09:17:32', 0),
	(19, 'Sortie automnales', 10, 1, NULL, '2022-04-22 09:17:32', 0),
	(20, '1', 1, 1, '2022-04-28 10:21:45', '2022-04-28 10:21:32', 1),
	(21, '2', 1, 1, '2022-04-28 10:36:52', '2022-04-28 10:21:45', 1),
	(22, 'Test', 1, 1, '2022-04-28 10:36:30', '2022-04-28 10:22:45', 1),
	(23, '4', 1, 1, '2022-04-28 10:51:06', '2022-04-28 10:27:21', 1),
	(24, '5', 1, 1, '2022-04-28 10:36:30', '2022-04-28 10:27:21', 1),
	(25, '1', 1, 1, '2022-04-28 10:37:15', '2022-04-28 10:37:07', 1),
	(26, '2', 1, 1, '2022-04-28 10:51:06', '2022-04-28 10:37:15', 1),
	(27, '1', 1, 1, '2022-04-28 11:06:15', '2022-04-28 10:51:53', 1),
	(28, '1', 1, 1, '2022-04-28 11:24:24', '2022-04-28 11:06:49', 1),
	(29, '2', 1, 1, '2022-04-28 11:24:24', '2022-04-28 11:06:49', 1),
	(30, '3', 1, 1, '2022-04-28 11:07:18', '2022-04-28 11:07:09', 1),
	(31, '4', 1, 1, '2022-04-28 11:21:20', '2022-04-28 11:07:18', 1),
	(32, 'Test', 1, 1, '2022-04-28 11:24:24', '2022-04-28 11:21:20', 1),
	(33, '1', 1, 1, '2022-04-29 14:07:57', '2022-04-29 14:07:52', 1),
	(34, 'Test 1', 1, 1, '2022-05-02 13:57:14', '2022-05-02 13:52:40', 1),
	(35, '2', 1, 1, '2022-05-02 13:57:54', '2022-05-02 13:57:47', 0),
	(36, '1', 1, 1, '2022-05-02 13:58:33', '2022-05-02 13:58:29', 1),
	(37, 'fin', 3, 1, NULL, '2022-05-05 16:04:04', 0);
/*!40000 ALTER TABLE `themes` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
