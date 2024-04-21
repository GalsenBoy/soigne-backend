-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 20 avr. 2024 à 11:24
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `e_sante`
--

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

DROP TABLE IF EXISTS `avis`;
CREATE TABLE IF NOT EXISTS `avis` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `description` varchar(255) NOT NULL DEFAULT '0',
  `medecinId` varchar(36) DEFAULT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `sejourId` varchar(36) DEFAULT NULL,
  `prescriptionId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_55f770889afa0af36c930cf7fa` (`prescriptionId`),
  KEY `FK_e1569d29537c19c24c39b83fa9e` (`medecinId`),
  KEY `FK_e0eb07bd223c47b40f1199852e6` (`userId`),
  KEY `FK_7b274c4bea0edd77a6238214f9a` (`sejourId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `avis`
--

INSERT INTO `avis` (`id`, `created_at`, `description`, `medecinId`, `userId`, `sejourId`, `prescriptionId`) VALUES
('7452a449-b3b6-4b33-966d-1db51d32b3c8', '2024-04-18 12:16:15.476098', 'Prise de sang', 'd6009a65-aa5f-4853-91e1-8ef7328dc72c', 'cdb9e814-6db5-4adf-93e8-42d522bfbbdc', '86741659-09a6-4c5d-addf-50766f87bcde', 'a04b6c7e-4ead-49dd-b9e5-8d467b1981cb'),
('db255d63-43a8-4d02-adda-57c792cd63af', '2024-04-16 15:01:00.041695', 'Pas grave', 'd6009a65-aa5f-4853-91e1-8ef7328dc72c', 'c55a0eeb-b874-425f-afb7-bb863b092ba6', '0becf503-f333-4084-afdc-bcae848fb61e', 'f657d866-f760-4aec-adec-fadeb5276244'),
('eb15fd74-7f80-48a2-9469-4f0a975154aa', '2024-04-16 14:58:36.124043', 'Test', 'd6009a65-aa5f-4853-91e1-8ef7328dc72c', 'c55a0eeb-b874-425f-afb7-bb863b092ba6', '0becf503-f333-4084-afdc-bcae848fb61e', 'c493bf4c-943b-4c0a-ba6b-21ec1477f644'),
('ee302715-faba-47a6-93dc-48452b5fb2df', '2024-04-16 14:58:02.145569', 'Pas très urgent', 'd6009a65-aa5f-4853-91e1-8ef7328dc72c', 'c55a0eeb-b874-425f-afb7-bb863b092ba6', '0becf503-f333-4084-afdc-bcae848fb61e', 'b617d77e-7d0b-4ace-acf0-118a14240514');

-- --------------------------------------------------------

--
-- Structure de la table `medecament`
--

DROP TABLE IF EXISTS `medecament`;
CREATE TABLE IF NOT EXISTS `medecament` (
  `id` varchar(36) NOT NULL,
  `medicament` varchar(255) NOT NULL,
  `posologie` varchar(255) NOT NULL,
  `prescriptionId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3e37b62452f0396bd97d42e83c4` (`prescriptionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `medecament`
--

INSERT INTO `medecament` (`id`, `medicament`, `posologie`, `prescriptionId`) VALUES
('26d90b7a-3242-4004-9f61-8d6f2432f9de', 'Doliprane ', '3 fois par jour', 'f657d866-f760-4aec-adec-fadeb5276244'),
('375267a0-1818-4828-8325-c4a3a9206b96', 'Aspirine', '2 x', 'f657d866-f760-4aec-adec-fadeb5276244'),
('41348b85-82c7-4595-90f5-64aa3ab03124', 'Doliprane ', '3 fois par jour', 'b617d77e-7d0b-4ace-acf0-118a14240514'),
('42eb7eab-0714-4cbd-afaf-69bc4ebc5403', 'Test', 'Test', 'c493bf4c-943b-4c0a-ba6b-21ec1477f644'),
('48ed4909-e734-49ac-bbdf-79d2b27dbcbb', 'Pollykurie', 'Matin Midi Soir', 'a04b6c7e-4ead-49dd-b9e5-8d467b1981cb'),
('5110377a-55c5-493e-a90f-d1e8f8f11e25', 'Doliprane ', '3 fois par jour', 'f657d866-f760-4aec-adec-fadeb5276244'),
('ae166907-47d1-43d6-8166-e399cb279621', 'Test', 'Test', 'c493bf4c-943b-4c0a-ba6b-21ec1477f644'),
('c6844179-3fb5-45d9-b35e-49f5ac51dbd0', 'Aspirine', '2 x', 'f657d866-f760-4aec-adec-fadeb5276244'),
('cf0a2809-eca4-4fb7-8a68-407a17cbd1bc', 'Pollykurie', 'Matin Midi Soir', 'a04b6c7e-4ead-49dd-b9e5-8d467b1981cb'),
('e64e57c2-8fe0-4b82-90a8-acd1f5a7b4bb', 'Doliprane ', '3 fois par jour', 'b617d77e-7d0b-4ace-acf0-118a14240514');

-- --------------------------------------------------------

--
-- Structure de la table `medecin`
--

DROP TABLE IF EXISTS `medecin`;
CREATE TABLE IF NOT EXISTS `medecin` (
  `id` varchar(36) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `specialite` varchar(255) NOT NULL,
  `matricule` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_7b96fde9e810eb5fb1ae3bfbe4` (`matricule`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `medecin`
--

INSERT INTO `medecin` (`id`, `lastName`, `firstName`, `specialite`, `matricule`) VALUES
('2671d10e-580c-4c66-8fa8-a15376ec698c', 'Alamin', 'Pierre', 'urgences', 'medecin0000'),
('d6009a65-aa5f-4853-91e1-8ef7328dc72c', 'Cissokho', 'Pierre', 'imagerie', 'RARPOP');

-- --------------------------------------------------------

--
-- Structure de la table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
CREATE TABLE IF NOT EXISTS `prescription` (
  `id` varchar(36) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `prescription`
--

INSERT INTO `prescription` (`id`, `date`) VALUES
('a04b6c7e-4ead-49dd-b9e5-8d467b1981cb', '2024-04-18 12:16:15'),
('b617d77e-7d0b-4ace-acf0-118a14240514', '2024-04-16 14:58:02'),
('c493bf4c-943b-4c0a-ba6b-21ec1477f644', '2024-04-16 14:58:36'),
('f657d866-f760-4aec-adec-fadeb5276244', '2024-04-16 15:00:59');

-- --------------------------------------------------------

--
-- Structure de la table `sejour`
--

DROP TABLE IF EXISTS `sejour`;
CREATE TABLE IF NOT EXISTS `sejour` (
  `id` varchar(36) NOT NULL,
  `dateEntree` date NOT NULL,
  `dateSortie` date NOT NULL,
  `motif` varchar(255) NOT NULL,
  `specialite` varchar(255) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `medecinId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a85fd709aa0bec6a79803ce49ae` (`userId`),
  KEY `FK_912edec85e9addd11264ce9c799` (`medecinId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sejour`
--

INSERT INTO `sejour` (`id`, `dateEntree`, `dateSortie`, `motif`, `specialite`, `userId`, `medecinId`) VALUES
('0becf503-f333-4084-afdc-bcae848fb61e', '2024-04-16', '2024-04-19', 'Mal de tête', 'urgences', 'c55a0eeb-b874-425f-afb7-bb863b092ba6', 'd6009a65-aa5f-4853-91e1-8ef7328dc72c'),
('196f5db0-ec04-40a6-8f25-792b2751f666', '2024-04-16', '2024-04-18', 'urgences', 'urgences', '7e66beb4-181d-447f-995a-34df82dc9e35', '2671d10e-580c-4c66-8fa8-a15376ec698c'),
('3d462f5a-13df-4322-8a72-f70ebee9ce79', '2024-04-30', '2024-05-02', '<h1>Faille XSS </h1>', 'urgences', 'c55a0eeb-b874-425f-afb7-bb863b092ba6', NULL),
('86741659-09a6-4c5d-addf-50766f87bcde', '2024-04-26', '2024-04-24', 'analyse sanguin', 'imagerie', 'cdb9e814-6db5-4adf-93e8-42d522bfbbdc', 'd6009a65-aa5f-4853-91e1-8ef7328dc72c'),
('96fcb665-f4bd-44c8-9cf9-086e640719d1', '2024-04-24', '2024-04-30', 'gastro', 'imagerie', '7e66beb4-181d-447f-995a-34df82dc9e35', 'd6009a65-aa5f-4853-91e1-8ef7328dc72c');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `zipCode` varchar(255) NOT NULL,
  `role` enum('user','admin','medecin','secretaire') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `zipCode`, `role`) VALUES
('3f3fde43-ec40-4de3-bc0f-2ade5a19fa4c', 'secretaire', 'secretaire', 'secretaire@gmail.com', '$2b$10$LR0z.6..PRhIlGH1I//F4u9WRjuYUIWyNJ8CxFGCAJxXH/KISdf62', '12 linandes', 'user'),
('7e66beb4-181d-447f-995a-34df82dc9e35', 'admin', 'admin', 'admin@gmail.com', '$2b$10$0Qyqe3yREvKZnO3XLiOQq.hlaZ590Dm/iJs5H581tgChrlAcOdE16', '11275', 'admin'),
('c55a0eeb-b874-425f-afb7-bb863b092ba6', 'user', 'user', 'user@gmail.com', '$2b$10$wivavuwb1JFMm6DFDHR8/O3w07x2oceFpxLxEX3APjYl0s5JaGNBm', '12 linandes', 'user'),
('cdb9e814-6db5-4adf-93e8-42d522bfbbdc', 'user1', 'use', 'user1@gmail.com', '$2b$10$jtEK0T5jHkX.Oc8DzYV.NOWsNBRFp65EwYzV8vLihDSWW8CaA3cWW', '10 Boos', 'user'),
('ec07c97f-1270-47c5-904d-414239df7ee4', 'bob', 'Dylan', 'bob@gmail.com', '$2b$10$4ij6VUldkGYA0PNivuKUXejcwM1mUPdcPP2CZ3heEdDvph3LcpWgy', '95000', 'secretaire');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `FK_55f770889afa0af36c930cf7fa7` FOREIGN KEY (`prescriptionId`) REFERENCES `prescription` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_7b274c4bea0edd77a6238214f9a` FOREIGN KEY (`sejourId`) REFERENCES `sejour` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e0eb07bd223c47b40f1199852e6` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e1569d29537c19c24c39b83fa9e` FOREIGN KEY (`medecinId`) REFERENCES `medecin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `medecament`
--
ALTER TABLE `medecament`
  ADD CONSTRAINT `FK_3e37b62452f0396bd97d42e83c4` FOREIGN KEY (`prescriptionId`) REFERENCES `prescription` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `sejour`
--
ALTER TABLE `sejour`
  ADD CONSTRAINT `FK_912edec85e9addd11264ce9c799` FOREIGN KEY (`medecinId`) REFERENCES `medecin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a85fd709aa0bec6a79803ce49ae` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
