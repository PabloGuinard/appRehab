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
USE `dashboard_rehab`;

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

-- Listage de la structure de la table id18263011_databaselarehab. commentaires
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

-- Listage des données de la table id18263011_databaselarehab.commentaires : ~7 rows (environ)
DELETE FROM `commentaires`;
/*!40000 ALTER TABLE `commentaires` DISABLE KEYS */;
INSERT INTO `commentaires` (`id`, `note`, `commentaire`, `exerciceId`, `isDeleted`, `modifiedBy`) VALUES
	(29, 3, 'Super', 13, 0, NULL),
	(32, 5, 'cuper commentaire', 13, 1, 'pablo.guinard@orsac-cpa01.fr'),
	(33, 5, 'J\'ai beaucoup aimé', 11, 0, NULL),
	(34, 4, 'commentaire', 11, 0, NULL),
	(35, 5, 'nouveau commentaire', 43, 0, NULL),
	(36, 5, 'nouveau commentaire', 57, 0, NULL),
	(37, 3, 'commentaire de test', 43, 0, NULL);
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
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `themeId` (`parentId`) USING BTREE,
  CONSTRAINT `FK_exercices_themes` FOREIGN KEY (`parentId`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.exercices : ~22 rows (environ)
DELETE FROM `exercices`;
/*!40000 ALTER TABLE `exercices` DISABLE KEYS */;
INSERT INTO `exercices` (`id`, `nom`, `parentId`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`, `modifiedBy`) VALUES
	(11, 'Les recettes magiques de EtcheDom', 8, 1, '2022-05-19 10:16:41', '2022-04-22 09:16:20', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(13, 'Frigo Magic', 8, 1, '2022-04-26 09:37:58', '2022-04-22 09:16:20', 0, NULL),
	(14, 'Le monde de la chocolaterie', 8, 1, '2022-05-30 15:59:22', '2022-04-22 09:16:20', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(41, 'tout marche', 44, 1, '2022-05-24 10:23:48', '2022-05-16 15:56:53', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(42, 'texte', 44, 1, '2022-05-24 10:23:48', '2022-05-17 09:12:18', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(43, 'Un, deux, trois scoops', 44, 1, '2022-05-17 14:26:45', '2022-05-17 14:14:29', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(44, 'nouveau test', 44, 1, '2022-05-24 10:23:48', '2022-05-19 15:07:29', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(45, 'azefazef', 8, 1, '2022-05-30 15:59:22', '2022-05-30 13:57:46', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(46, '1', 8, 1, '2022-05-30 15:59:22', '2022-05-30 13:57:46', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(47, '2', 8, 1, '2022-05-30 15:59:22', '2022-05-30 13:57:46', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(48, 'test', 8, 1, '2022-05-30 15:59:22', '2022-05-30 13:57:46', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(49, 'exercice', 8, 1, '2022-05-30 15:59:22', '2022-05-30 14:12:05', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(50, 'allo', 8, 1, '2022-05-30 15:59:22', '2022-05-30 14:12:05', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(51, '3', 8, 1, '2022-05-30 15:59:22', '2022-05-30 14:12:05', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(52, '4', 8, 1, '2022-05-30 15:59:22', '2022-05-30 14:12:05', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(53, '5', 8, 1, '2022-05-30 15:59:22', '2022-05-30 14:12:05', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(54, '6', 8, 1, '2022-05-30 15:59:22', '2022-05-30 14:12:05', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(55, '7', 8, 1, '2022-05-30 15:59:22', '2022-05-30 14:12:05', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(56, 'exercice', 44, 1, '2022-05-31 11:30:58', '2022-05-30 15:59:22', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(57, 'test', 44, 1, '2022-05-31 11:30:58', '2022-05-31 09:36:18', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(58, 'test', 44, 0, NULL, '2022-05-31 11:30:58', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(59, 'test APK', 44, 1, NULL, '2022-05-31 13:12:49', 0, 'pablo.guinard@orsac-cpa01.fr');
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
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `exerciceId` (`parentId`) USING BTREE,
  CONSTRAINT `FK_items_exercices` FOREIGN KEY (`parentId`) REFERENCES `exercices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.items : ~29 rows (environ)
DELETE FROM `items`;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` (`id`, `nom`, `typeItem`, `parentId`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`, `modifiedBy`) VALUES
	(56, 'http://localhost/index.php', 'Lien', 41, 1, '2022-05-24 10:23:48', '2022-05-16 15:56:53', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(65, '../database/images/20220512_124513.jpg', 'Image', 41, 1, '2022-05-24 10:23:48', '2022-05-16 16:57:09', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(66, 'https://youtu.be/aY1QuPR1ibY', 'Video', 41, 1, '2022-05-24 10:23:48', '2022-05-17 09:08:45', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(67, 'texte raw', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 09:12:18', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(68, 'texte avec du<b> gras ici</b>, du <u>souligné là</u> et de <i>l\'italique ici.</i><div><b><u><i>Mtn on met les 3</i></u></b></div>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 09:12:18', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(69, '<i>Texte au début en italique <u>avec</u></i><u><b><i> du gra</i>s au milieu</b> et du souligné à la fin</u>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 09:46:45', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(70, '<font size="5">texte en gros</font> avec <font color="#ff0000">du rouge</font> et du<font size="2"> petit à la fin</font>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 09:52:00', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(71, '<div>Enorme texte</div><div>Gros texte</div><div>Texte normal</div><div>Petit texte</div><div><br></div><div>gras souligné italique tout</div><div><br></div><div>noir <font color="#808080">gris </font><font color="#800080">violet </font><font color="#0000ff">bleu </font><font color="#008000">vert </font><font color="#ffff00">jaune </font><font color="#ffa500">orange </font><font color="#ff0000">rouge </font><font color="#ffc0cb">rose</font></div>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 10:47:42', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(72, 'noir <font color="#808080">gris </font><font color="#800080">violet </font><font color="#0000ff">bleu </font><font color="#008000">vert </font><font color="#ffff00">jaune </font><font color="#ffa500">orange </font><font color="#ff0000">rouge </font><font color="#ffc0cb">rose</font>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 10:53:21', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(73, '<b>Gras </b><i>italique </i><u>souligné</u>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 10:54:37', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(74, '<font size="5" color="#ff0000">On met les 2 en même temps</font>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 10:56:51', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(75, '<font color="#0000ff" size="5"><u>2eme essai</u></font>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 11:04:38', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(76, '<u><font size="5" color="#ffa500">3eme essai</font></u>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 11:06:28', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(77, '<i>D</i><font color="#008000" style="font-style: italic;">ans cette<font size="6"> partie </font></font><u style="font-style: italic;"><font size="6" color="#008000">o</font><font color="#800080" size="6">n m</font><font color="#800080" size="2">élange tout</font></u><u style="font-style: italic; font-weight: bold;"><font color="#800080" size="2"> pou</font></u><b style="font-style: italic;">r essay<font color="#ffa500">er d</font></b><font size="5" style="color: rgb(255, 165, 0);"><b style=""><i>e fai</i>r</b>e </font><font size="5" style="color: rgb(255, 165, 0);">d</font><font color="#ff0000">e</font><i style=""><font color="#ff0000">s b</font><font color="#ffa500">ugs</font></i>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 11:13:42', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(78, '<font size="6">Très gros texte</font><div><font size="5">Gros texte</font></div><div>texte normal&nbsp;</div><div><font size="2">petit texte</font></div><div>noir <font color="#808080">gris </font><font color="#0000ff">bleu </font><font color="#008000">vert </font><font color="#ffff00">jaune </font><font color="#ffa500">orange </font><font color="#ff0000">rouge </font><font color="#ffc0cb">rose</font></div><div><b>gras</b> <u>souligné </u><i>italique <u><b>les 3</b></u></i></div><div><a href="http://localhost/index.php">lien</a></div><div style="text-align: center;">centré</div><div style="text-align: right;">à droite</div><div style="text-align: center;"><u style=""><i style=""><font size="6" color="#808080"><b style=""><a href="http://http://localhost/index.php" style="">Gros titre où on met tout</a></b></font></i></u></div><div><u style=""><font size="4">suivi d\'un texte tout souligné dans lequel on met un </font><font color="#ffa500" style="font-size: large;">mot </font><font size="4">en o</font><font size="2">range,</font><b style=""><font size="2"> on met</font><font size="4"> en gras par</font><font size="2"> ici et o</font></b><font size="2">n met du texte en petit tout autour</font><font size="4">, ce </font><font size="5"><i>MOT </i></font><font size="4">est rouge, gros et en italique. </font><i style=""><font size="2" color="#ffc0cb">Pour finir, on met un texte italique en petit et rose</font></i></u></div><div><u style=""><i style=""><font size="2" color="#ffc0cb"><br></font></i></u></div><div><u style=""><i style=""><font size="2" color="#ffc0cb"><br></font></i></u></div><div><u style=""><i style=""><font size="2" color="#ffc0cb"><br></font></i></u></div><div>&nbsp; &nbsp; &nbsp;Pour finir, on saute 3 lignes avant ce paragraphe et on met un alinéa</div>', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 11:43:51', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(80, '<div style="text-align: center;"><b><font size="5" color="#808080">Bonjour la blogosphère de la Réhab,</font></b></div>', 'Texte', 43, 1, '2022-05-17 15:31:58', '2022-05-17 14:15:10', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(81, '../database/images/Joyeux.gif', 'Image', 43, 1, '2022-05-17 14:26:45', '2022-05-17 14:16:01', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(83, '<div style="text-align: center;"><b style="color: rgb(128, 128, 128); font-size: x-large;">Et pour commencer, gros scoop : nous fêtons nos 2 ans, ce n\'est pas rien !</b></div><div><div style="text-align: center;"><b style="color: rgb(128, 128, 128); font-size: x-large;">Souhaitons-nous un bon anniversaire !!</b></div><div><font size="5" color="#808080"><b><br></b></font></div><div>Et on profite de cette fin de semaine et de notre anniversaire pour vous parler de deux projets qui nous tiennent <font color="#800080">particulièrement à coeur</font> et qui redonnent une bonne dose d\'optimisme pour la suite des aventures de la Réhab !&nbsp;</div><div><i>(et si vous voulez encore plus d\'optimisme, n\'oubliez pas de vous rendre sur l\'article d\'il y a 2 semaines,<a href="https://rehabourg.blogspot.com/2022/04/une-bonne-dose-doptimisme.html"> juste ici</a>)</i></div></div><div><i><br></i></div><div>Mais alors, quels sont&nbsp;<font color="#800080" style="--couleurPrincipale: #013158; --couleur1: #0061ac; --couleur2: #0087ef; --couleur3: #54aefc;">les deux fameux autres scoops/surprises ?</font>&nbsp;N\'attendons plus et découvrons-les dans la vidéo ci-dessous. Prenez le temps de la visionner et nous dire par la suite vos impressions avec un petit commentaire (tout en bas de l<i style="--couleurPrincipale: #013158; --couleur1: #0061ac; --couleur2: #0087ef; --couleur3: #54aefc;">\'</i>article) !<i><br></i></div>', 'Texte', 43, 1, '2022-05-19 13:48:52', '2022-05-17 14:26:45', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(84, 'https://rehabourg.blogspot.com/2022/04/une-bonne-dose-doptimisme.html', 'Lien', 43, 1, '2022-05-17 16:14:50', '2022-05-17 14:26:45', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(85, 'Mais alors, quels sont <font color="#800080">les deux fameux autres scoops/surprises ?</font> N\'attendons plus et découvrons-les dans la vidéo ci-dessous. Prenez le temps de la visionner et nous dire par la suite vos impressions avec un petit commentaire (tout en bas de l<i>\'</i>article) !', 'Texte', 43, 1, '2022-05-19 13:48:52', '2022-05-17 14:26:45', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(86, 'https://youtu.be/aY1QuPR1ibY', 'Video', 43, 1, NULL, '2022-05-17 14:26:45', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(87, 'texte avec des balise au hasardazefazefbonjour monsieurilfaut paritr là', 'Texte', 42, 1, '2022-05-24 10:23:48', '2022-05-17 17:04:24', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(88, 'nouveau', 'Texte', 43, 1, '2022-05-19 13:43:31', '2022-05-19 13:21:45', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(89, '<div>Pour bien comprendre l\'importance de ces événement, faisons un petit rappel sur le début de notre aventure :</div><div><br></div><div>Cela remonte à deux ans, au moment où nous étions toutes et tous confinés à domicile. Au Centre de Soins de Réhab, nous avons alors eu l\'idée de poursuivre les soins d\'une manière inattendue... à travers un blog.&nbsp;</div><div><br></div><div>Chaque jour, vous pouviez découvrir un outil vous accompagnant dans votre quotidien : une vidéo de relaxation le lundi, une recette de cuisine le mardi, des exercices de stimulation cognitive le mercredi, des vidéos de sport faites par Aubin le jeudi, des temps de créativité le vendredi, tout un programme le samedi et puis un outil d\'évasion le dimanche.</div><div>Cela a duré quelques semaines et puis au moment du dé-confinement nous avons fait le choix de poursuivre tous les samedis en vous proposant un article thématique ou bien un programme d\'activités.&nbsp;</div><div>Et ceci, nous le faisons encore aujourd\'hui et nous continuerons les semaines prochaines.&nbsp;</div>\r\n                        ', 'Texte', 43, 1, NULL, '2022-05-19 13:48:52', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(90, '../database/images/imag blgo.png', 'Image', 43, 1, NULL, '2022-05-19 13:48:52', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(91, '<div>Et maintenant, on poursuit encore plus loin l\'aventure. D\'ici quelques mois, vous pourrez donc découvrir<font color="#800080"> la nouvelle interface du blog</font>, créée par un groupe d\'usagers du Parchemin et aussi télécharger une <font color="#800080">application mobile</font>. En effet, la Réhab à domicile se développe afin d\'intéresser le plus de personnes aux outils participant au rétablissement.</div><div><br></div><div style="text-align: center;"><br></div><div style="text-align: center;">Alors continuons à échanger et à partager des outils qui nous aident à domicile et cap vers le rétablissement !&nbsp;</div><div style="text-align: center;"><i>L\'équipe de la Réhab</i></div>\r\n                        ', 'Texte', 43, 1, NULL, '2022-05-19 13:48:52', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(92, 'https://youtu.be/aY1QuPR1ibY ', 'Video', 44, 1, '2022-05-24 10:23:48', '2022-05-20 13:27:57', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(93, 'texte simple', 'Texte', 44, 1, '2022-05-24 10:23:48', '2022-05-20 13:27:57', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(94, '<b>gras </b><u>souligné </u><i>italique&nbsp;</i><div style="text-align: center;">centré</div><div style="text-align: right;">à droite</div><div style="text-align: left;"><a href="http://http://localhost/index.php">lien</a></div><div style="text-align: left;"><font color="#0000ff">rouge</font></div><div style="text-align: left;"><font color="#0000ff" size="2">petit texte</font></div>', 'Texte', 44, 1, '2022-05-24 10:23:48', '2022-05-20 13:27:57', 1, 'pablo.guinard@orsac-cpa01.fr');
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
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.mots : ~12 rows (environ)
DELETE FROM `mots`;
/*!40000 ALTER TABLE `mots` DISABLE KEYS */;
INSERT INTO `mots` (`id`, `nom`, `definition`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`, `modifiedBy`) VALUES
	(4, 'Attention sélective', 'Capacité à focaliser son attention sur des informations pertinentes en laissant de côté celles qui ne sont pas utiles pour l\'activité en cours.', 1, '2022-05-02 13:53:59', '2022-04-22 09:16:57', 0, NULL),
	(5, 'Attention soutenue', 'Capacité à maintenir son attention sur du long terme et de façon stable. ', 1, '2022-04-28 10:51:53', '2022-04-22 09:16:57', 1, NULL),
	(6, 'Cognition sociale', 'Ensemble des processus cognitifs (aussi appelés « capacités cognitives ») permettant de comprendre les autres et d\'interagir avec eux. La sphère de la cognition sociale comprend 4 domaines : la perception émotionnelle, la perception et connaissances sociales, la théorie de l’esprit et les biais attributionnels. ', 1, '2022-05-02 13:53:59', '2022-04-22 09:16:57', 1, NULL),
	(7, 'Contrôle inhibiteur', 'Capacité à faire abstraction (ou à supprimer) des pensées, des actions ou des informations qui sont inappropriées pour la situation ou la tâche en cours. Il peut s\'agir de pensées/actions/informations automatiques, distrayantes ou qui ne sont plus utiles pour la situation donnée. Cette capacité nous permet de sélectionner des informations cohérentes en vue d’un objectif. L’inhibition fait partie des fonctions exécutives (cf. définition ci-après) qui sont des compétences cognitives permettant de réagir dans des situations imprévues, peu connues ou complexes et nous y adapter. ', 1, '2022-04-26 10:22:28', '2022-04-22 09:16:57', 0, NULL),
	(8, 'Flexibilité cognitive', 'Capacité à réorienter son attention et son action pour s\'adapter à un changement ou à une situation différente. Cette capacité permet de passer d\'une activité à une autre (c\'est-à-dire d\'alterner entre plusieurs activités) spontanément ou à la demande de quelqu\'un d\'autre. La flexibilité fait partie des fonctions exécutives (cf. définition ci-après) qui sont des compétences cognitives permettant de réagir dans des situations imprévues, peu connues ou complexes et de nous y adapter. ', 1, '2022-04-25 16:32:46', '2022-04-22 09:16:57', 0, NULL),
	(9, 'Fonctions exécutives', 'Terme qui regroupe plusieurs fonctions cognitives élaborées : la planification, le contrôle inhibiteur, la flexibilité, l’initiation et la planification (certains auteurs en rajoutent d\'autres). Les fonctions exécutives interviennent quand une situation nouvelle, imprévue et / ou complexe se déroule. Dans ce type de situation, nous ne pouvons plus nous laisser porter par nos automatismes et nous devons mettre en place une autre façon de procéder pour nous adapter à la situation. Les fonctions exécutives nous permettent donc de nous adapter aux situations pour lesquelles il n\'y a pas de solution toute faite. ', 1, NULL, '2022-04-22 09:16:57', 0, NULL),
	(11, 'Mémoire à court terme', 'Capacité à retenir des informations pendant un très court laps de temps.', 1, '2022-04-26 11:02:47', '2022-04-22 09:16:57', 0, NULL),
	(12, 'aa', 'azef', 1, '2022-05-31 11:30:58', '2022-05-20 13:31:57', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(13, 'gg', 'azef', 1, '2022-05-31 11:30:58', '2022-05-20 13:31:57', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(14, 'z', 'azef', 1, '2022-05-31 11:30:58', '2022-05-20 13:31:57', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(15, 'az', 'aze', 1, '2022-05-31 11:30:58', '2022-05-30 14:18:18', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(16, 'ef', 'zef', 1, '2022-05-31 11:30:58', '2022-05-30 14:18:18', 1, 'pablo.guinard@orsac-cpa01.fr');
/*!40000 ALTER TABLE `mots` ENABLE KEYS */;

-- Listage de la structure de la table id18263011_databaselarehab. presentation
CREATE TABLE IF NOT EXISTS `presentation` (
  `contenu` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`contenu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.presentation : ~1 rows (environ)
DELETE FROM `presentation`;
/*!40000 ALTER TABLE `presentation` DISABLE KEYS */;
INSERT INTO `presentation` (`contenu`, `isReady`, `modifiedAt`, `createdAt`, `modifiedBy`) VALUES
	('L\'App\'Rehab a été créée en mars 2022 et a pour objectif de base de vous soutenir, toutes et tous. A l\'époque, nous avions décidé de vous accompagner quotidiennement en vous proposant de nombreuses activités à réaliser chez vous. Nous vous avons donc proposé différents outils de créativité et bien d\'autres thématiques encore. \r\nIl nous semblait fondamental de faire en sorte que le programme de Réhab que vous aviez engagé en début d\'année au sein du DSRPS puisse continuer.', 1, '2022-05-19 14:12:45', '2022-04-22 09:17:14', 'pablo.guinard@orsac-cpa01.fr');
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
  `modifiedBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `categorieId` (`parentId`) USING BTREE,
  CONSTRAINT `FK_themes_categories` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table id18263011_databaselarehab.themes : ~15 rows (environ)
DELETE FROM `themes`;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` (`id`, `nom`, `parentId`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`, `modifiedBy`) VALUES
	(8, 'Cuisine', 1, 1, '2022-05-02 13:52:40', '2022-04-22 09:17:32', 0, NULL),
	(9, 'On poursuit les présentations', 1, 1, '2022-04-25 15:28:38', '2022-04-22 09:17:32', 0, NULL),
	(10, 'J\'ai le smile !', 1, 1, NULL, '2022-04-22 09:17:32', 0, NULL),
	(11, 'C\'est la rentrée !', 1, 1, '2022-04-26 14:05:41', '2022-04-22 09:17:32', 0, NULL),
	(12, 'Quand la créa voyage...', 1, 1, NULL, '2022-04-22 09:17:32', 0, NULL),
	(13, 'En août...', 1, 1, '2022-04-28 10:51:53', '2022-04-22 09:17:32', 1, NULL),
	(14, 'Votre bibliothèque estivale', 1, 1, '2022-05-02 13:52:40', '2022-04-22 09:17:32', 1, NULL),
	(15, 'La santé pour tous !', 4, 1, NULL, '2022-04-22 09:17:32', 0, NULL),
	(16, 'Le plein d\'activités dans les valises', 3, 1, NULL, '2022-04-22 09:17:32', 0, NULL),
	(17, 'A vos podcasts', 5, 1, NULL, '2022-04-22 09:17:32', 0, NULL),
	(44, 'Nouveautés', 1, 1, '2022-05-24 10:25:31', '2022-05-16 15:56:53', 0, 'pablo.guinard@orsac-cpa01.fr'),
	(45, 'test 2', 1, 1, '2022-05-24 10:23:48', '2022-05-19 15:07:41', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(46, '1', 1, 1, '2022-05-24 10:23:48', '2022-05-19 15:19:29', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(47, '2', 1, 1, '2022-05-24 10:23:48', '2022-05-19 15:20:19', 1, 'pablo.guinard@orsac-cpa01.fr'),
	(48, '5', 5, 1, '2022-05-31 11:30:58', '2022-05-31 10:08:22', 1, 'pablo.guinard@orsac-cpa01.fr');
/*!40000 ALTER TABLE `themes` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
