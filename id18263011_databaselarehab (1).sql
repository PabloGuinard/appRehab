-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 27 avr. 2022 à 13:00
-- Version du serveur : 5.7.33
-- Version de PHP : 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `id18263011_databaselarehab`
--
CREATE DATABASE IF NOT EXISTS `id18263011_databaselarehab` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `id18263011_databaselarehab`;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `nom`, `isReady`, `modifiedAt`, `createdAt`) VALUES
(1, 'Créativité', 1, NULL, '2022-04-22 07:15:21'),
(3, 'Cognition', 1, NULL, '2022-04-22 07:15:21'),
(4, 'Sport', 1, NULL, '2022-04-22 07:15:21'),
(5, 'Psycho-éducation', 1, NULL, '2022-04-22 07:15:21'),
(6, 'Relaxation', 1, NULL, '2022-04-22 07:15:21'),
(10, 'Culture & Infos', 1, NULL, '2022-04-22 07:15:21');

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` int(11) NOT NULL,
  `note` int(11) DEFAULT NULL,
  `commentaire` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `exerciceId` int(11) NOT NULL,
  `isDeleted` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id`, `note`, `commentaire`, `exerciceId`, `isDeleted`) VALUES
(29, 3, 'Super', 13, 0),
(32, 5, 'cuper commentaire', 13, 0),
(33, 5, 'J\'ai beaucoup aimé', 11, 0),
(34, 4, 'commentaire', 11, 0);

-- --------------------------------------------------------

--
-- Structure de la table `exercices`
--

CREATE TABLE `exercices` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `parentId` int(11) NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `exercices`
--

INSERT INTO `exercices` (`id`, `nom`, `parentId`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`) VALUES
(11, 'Les recettes de EtcheDom test', 8, 0, '2022-04-26 09:15:08', '2022-04-22 07:16:20', 0),
(13, 'Frigo Magic', 8, 1, '2022-04-26 07:37:58', '2022-04-22 07:16:20', 0),
(14, 'Le monde de la chocolaterie', 8, 1, '2022-04-26 11:19:16', '2022-04-22 07:16:20', 0);

-- --------------------------------------------------------

--
-- Structure de la table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `nom` varchar(10000) CHARACTER SET utf8 NOT NULL,
  `typeItem` varchar(50) CHARACTER SET utf8 NOT NULL,
  `parentId` int(11) NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `items`
--

INSERT INTO `items` (`id`, `nom`, `typeItem`, `parentId`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`) VALUES
(11, 'Halloween, c\'est la quête des bonbons des enfants dans leur quartier mais c\'est aussi la confection de recettes diverses et variées et surtout très créatives. \r\nDominique, que nous surnommons EtcheDom nous livre ici quelques exemples trouvés sur internet.\r\n                        \r\n                        \r\n                            \r\n                            \r\n                            \r\n                            ', 'Texte', 11, 1, '2022-04-26 08:37:11', '2022-04-22 07:16:36', 0),
(13, 'Cette application vous propose des idées de recettes pour vos repas avec les produits qui sont disponibles dans votre frigo et dans les placards de votre cuisine.\r\n                            ', 'Texte', 11, 1, '2022-04-25 15:03:51', '2022-04-22 07:16:36', 0),
(14, '/database/images/canva Idées cuisine pour Halloween 2021-10-13.jpg', 'Image', 11, 1, '2022-04-25 11:36:26', '2022-04-22 07:16:36', 0),
(16, 'https://www.yummyblog.fr/recettes/recette-halloween-horrible/', 'Lien', 11, 1, '2022-04-25 11:37:04', '2022-04-22 07:16:36', 0),
(17, '/database/images/giphy.gif', 'Image', 11, 1, '2022-04-25 09:54:34', '2022-04-22 07:16:36', 0),
(22, 'Cette application vous propose des idées de recettes pour vos repas avec les produits qui sont disponibles dans votre frigo et dans les placards de votre cuisine.\r\n                            \r\n                            ', 'Texte', 13, 1, '2022-04-26 11:19:16', '2022-04-22 07:16:36', 0),
(23, 'Comment faire une fois sur l’application Frigo Magic ?', 'Texte', 13, 1, NULL, '2022-04-22 07:16:36', 0),
(24, 'http://localhost/index.php', 'Lien', 13, 1, '2022-04-26 07:14:12', '2022-04-22 07:16:36', 0),
(25, 'Bonjour,\r\n\r\nPour ce lundi de Pâques, nous vous avons élaboré un programme avec différentes activités à essayer à votre domicile autour de la thématique du... chocolat ! Quelle surprise !', 'Texte', 14, 1, NULL, '2022-04-22 07:16:36', 0),
(26, 'Il fallait forcément qu’on vous parle de recettes pour cette occasion particulière et de recettes au chocolat bien évidemment ! Nous vous proposons des Truffes au chocolat (c’est presque comme des œufs en chocolat).', 'Texte', 14, 1, NULL, '2022-04-22 07:16:36', 0),
(27, 'https://www.marmiton.org/recettes/recette_truffes-au-chocolat_15660.aspx', 'Lien', 14, 1, NULL, '2022-04-22 07:16:36', 0),
(28, '/database/images/dessert-813278_1280.jpg', 'Image', 14, 1, NULL, '2022-04-22 07:16:36', 0);

-- --------------------------------------------------------

--
-- Structure de la table `mots`
--

CREATE TABLE `mots` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `definition` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `mots`
--

INSERT INTO `mots` (`id`, `nom`, `definition`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`) VALUES
(4, 'Attention sélective', 'Capacité à focaliser son attention sur des informations pertinentes en laissant de côté celles qui ne sont pas utiles pour l\'activité en cours.', 0, '2022-04-26 11:19:16', '2022-04-22 07:16:57', 0),
(5, 'Attention soutenue', 'Capacité à maintenir son attention sur du long terme et de façon stable. ', 1, '2022-04-26 11:19:16', '2022-04-22 07:16:57', 0),
(6, 'Cognition sociale', 'Ensemble des processus cognitifs (aussi appelés « capacités cognitives ») permettant de comprendre les autres et d\'interagir avec eux. La sphère de la cognition sociale comprend 4 domaines : la perception émotionnelle, la perception et connaissances sociales, la théorie de l’esprit et les biais attributionnels. ', 1, '2022-04-25 13:01:52', '2022-04-22 07:16:57', 0),
(7, 'Contrôle inhibiteur', 'Capacité à faire abstraction (ou à supprimer) des pensées, des actions ou des informations qui sont inappropriées pour la situation ou la tâche en cours. Il peut s\'agir de pensées/actions/informations automatiques, distrayantes ou qui ne sont plus utiles pour la situation donnée. Cette capacité nous permet de sélectionner des informations cohérentes en vue d’un objectif. L’inhibition fait partie des fonctions exécutives (cf. définition ci-après) qui sont des compétences cognitives permettant de réagir dans des situations imprévues, peu connues ou complexes et nous y adapter. ', 1, '2022-04-26 08:22:28', '2022-04-22 07:16:57', 0),
(8, 'Flexibilité cognitive', 'Capacité à réorienter son attention et son action pour s\'adapter à un changement ou à une situation différente. Cette capacité permet de passer d\'une activité à une autre (c\'est-à-dire d\'alterner entre plusieurs activités) spontanément ou à la demande de quelqu\'un d\'autre. La flexibilité fait partie des fonctions exécutives (cf. définition ci-après) qui sont des compétences cognitives permettant de réagir dans des situations imprévues, peu connues ou complexes et de nous y adapter. ', 1, '2022-04-25 14:32:46', '2022-04-22 07:16:57', 0),
(9, 'Fonctions exécutives', 'Terme qui regroupe plusieurs fonctions cognitives élaborées : la planification, le contrôle inhibiteur, la flexibilité, l’initiation et la planification (certains auteurs en rajoutent d\'autres). Les fonctions exécutives interviennent quand une situation nouvelle, imprévue et / ou complexe se déroule. Dans ce type de situation, nous ne pouvons plus nous laisser porter par nos automatismes et nous devons mettre en place une autre façon de procéder pour nous adapter à la situation. Les fonctions exécutives nous permettent donc de nous adapter aux situations pour lesquelles il n\'y a pas de solution toute faite. ', 1, NULL, '2022-04-22 07:16:57', 0),
(10, 'Initiation', 'Capacité à amorcer, à mettre en route une action. ', 1, '2022-04-26 09:15:08', '2022-04-22 07:16:57', 0),
(11, 'Mémoire à court terme', 'Capacité à retenir des informations pendant un très court laps de temps.', 1, '2022-04-26 09:02:47', '2022-04-22 07:16:57', 0);

-- --------------------------------------------------------

--
-- Structure de la table `presentation`
--

CREATE TABLE `presentation` (
  `contenu` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `presentation`
--

INSERT INTO `presentation` (`contenu`, `isReady`, `modifiedAt`, `createdAt`) VALUES
('L\'App\'Rehab a été créée en mars 2022 et a pour objectif de base de vous soutenir, toutes et tous. A l\'époque, nous avions décidé de vous accompagner quotidiennement en vous proposant de nombreuses activités à réaliser chez vous. Nous vous avons donc proposé différents outils de créativité et bien d\'autres thématiques encore. Il nous semblait fondamental de faire en sorte que le programme de Réhab que vous aviez engagé en début d\'année au sein du DSRPS puisse continuer.', 1, '2022-04-22 10:01:02', '2022-04-22 07:17:14');

-- --------------------------------------------------------

--
-- Structure de la table `themes`
--

CREATE TABLE `themes` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) CHARACTER SET utf8 NOT NULL,
  `parentId` int(11) NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `themes`
--

INSERT INTO `themes` (`id`, `nom`, `parentId`, `isReady`, `modifiedAt`, `createdAt`, `isDeleted`) VALUES
(8, 'Cuisine', 1, 0, '2022-04-27 08:55:23', '2022-04-22 07:17:32', 0),
(9, 'On poursuit les présentations', 1, 1, '2022-04-25 13:28:38', '2022-04-22 07:17:32', 0),
(10, 'J\'ai le smile !', 1, 1, NULL, '2022-04-22 07:17:32', 0),
(11, 'C\'est la rentrée !', 1, 1, '2022-04-26 12:05:41', '2022-04-22 07:17:32', 0),
(12, 'Quand la créa voyage...', 1, 1, NULL, '2022-04-22 07:17:32', 0),
(13, 'En août...', 1, 1, '2022-04-26 11:58:52', '2022-04-22 07:17:32', 0),
(14, 'Votre bibliothèque estivale', 1, 1, '2022-04-26 11:57:45', '2022-04-22 07:17:32', 0),
(15, 'La santé pour tous !', 4, 1, NULL, '2022-04-22 07:17:32', 0),
(16, 'Le plein d\'activités dans les valises', 3, 1, NULL, '2022-04-22 07:17:32', 0),
(17, 'A vos podcasts', 5, 1, NULL, '2022-04-22 07:17:32', 0),
(18, 'Nature et bien être', 6, 1, NULL, '2022-04-22 07:17:32', 0),
(19, 'Sortie automnales', 10, 1, NULL, '2022-04-22 07:17:32', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `exerciceId` (`exerciceId`);

--
-- Index pour la table `exercices`
--
ALTER TABLE `exercices`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `themeId` (`parentId`) USING BTREE;

--
-- Index pour la table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `exerciceId` (`parentId`) USING BTREE;

--
-- Index pour la table `mots`
--
ALTER TABLE `mots`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Index pour la table `presentation`
--
ALTER TABLE `presentation`
  ADD PRIMARY KEY (`contenu`);

--
-- Index pour la table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `categorieId` (`parentId`) USING BTREE;

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `exercices`
--
ALTER TABLE `exercices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `mots`
--
ALTER TABLE `mots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `themes`
--
ALTER TABLE `themes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `FK_commentaires_exercices` FOREIGN KEY (`exerciceId`) REFERENCES `exercices` (`id`);

--
-- Contraintes pour la table `exercices`
--
ALTER TABLE `exercices`
  ADD CONSTRAINT `FK_exercices_themes` FOREIGN KEY (`parentId`) REFERENCES `themes` (`id`);

--
-- Contraintes pour la table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `FK_items_exercices` FOREIGN KEY (`parentId`) REFERENCES `exercices` (`id`);

--
-- Contraintes pour la table `themes`
--
ALTER TABLE `themes`
  ADD CONSTRAINT `FK_themes_categories` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
