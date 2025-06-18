-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2025 at 05:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digiwise`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `firstName`, `lastName`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@digiwise.com', '$2a$10$Ff5QskkHmLokVS4TWTvEWukF0.yCJbGSfP8IASCA/aUj4nyK7WuCG', 'Admin', 'User', '2025-06-12 01:11:00', '2025-06-12 01:11:00');

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `completion_time` datetime DEFAULT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `order_number` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `text`, `category`, `category_id`, `order_number`, `createdAt`, `updatedAt`) VALUES
(1, 'Social media use negatively affects my academic performance.', 'Screen Time', 1, 1, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(2, 'People close to me have expressed concern about my social media use.', 'Screen Time', 1, 2, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(3, 'I spend more time on social media than I intend to.', 'Screen Time', 1, 3, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(4, 'I often lose track of time when using social media.', 'Screen Time', 1, 4, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(5, 'I feel stressed when I am not able to check my social media accounts.', 'Screen Time', 1, 5, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(6, 'I find it difficult to limit my social media usage even when I try.', 'Screen Time', 1, 6, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(7, 'I feel left out when I\'m not up-to-date with social media posts.', 'Screen Time', 1, 7, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(8, 'My tendency to prioritize social media over task completion adversely affects my productivity.', 'Screen Time', 1, 8, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(9, 'Facebook is the main reason why I stay up late at night.', 'Screen Time', 1, 9, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(10, 'When I spend too much time on screens, I find it hard to get things done during the day.', 'Screen Time', 1, 10, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(11, 'I feel more anxious after spending time on social media.', 'Mental Health Effects', 2, 11, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(12, 'Social media often makes me feel like my life is inadequate compared to others.', 'Mental Health Effects', 2, 12, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(13, 'I feel lonely even when I\'m interacting with others online.', 'Mental Health Effects', 2, 13, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(14, 'Checking social media is one of the first things I do most mornings.', 'Mental Health Effects', 2, 14, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(15, 'I use social media to relieve of stress.', 'Mental Health Effects', 2, 15, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(16, 'Seeing others\' posts on social media impacts my self-esteem.', 'Mental Health Effects', 2, 16, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(17, 'I feel emotionally drained after scrolling through social media.', 'Mental Health Effects', 2, 17, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(18, 'My mood is often affected by the content I see on social media.', 'Mental Health Effects', 2, 18, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(19, 'I am hooked to social media, even when I know it worsens my mental health.', 'Mental Health Effects', 2, 19, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(20, 'Taking breaks from social media improves my emotional well-being.', 'Mental Health Effects', 2, 20, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(21, 'My sleep schedule is affected by late-night social media use.', 'Digital Well-being', 3, 21, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(22, 'I want to develop healthy habits for responsible social media use.', 'Digital Well-being', 3, 22, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(23, 'I am aware of how much time I spend on social media.', 'Digital Well-being', 3, 23, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(24, 'I feel in control of how I use social media.', 'Digital Well-being', 3, 24, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(25, 'I set limits for my social media use to maintain a healthy balance.', 'Digital Well-being', 3, 25, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(26, 'I take regular breaks from social media to maintain my well-being.', 'Digital Well-being', 3, 26, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(27, 'I use social media intentionally rather than out of habit.', 'Digital Well-being', 3, 27, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(28, 'I use social media to support my emotional well-being.', 'Digital Well-being', 3, 28, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(29, 'I reflect on how social media affects my mood.', 'Digital Well-being', 3, 29, '2025-06-12 01:11:00', '2025-06-12 01:11:00'),
(30, 'I minimize my social media usage when I notice negative effects on my well-being.', 'Digital Well-being', 3, 30, '2025-06-12 01:11:00', '2025-06-12 01:11:00');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `assessment_id` int(11) NOT NULL,
  `overall_score` int(11) NOT NULL,
  `category_scores` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`category_scores`)),
  `risk_level` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `AssessmentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `ageRange` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `ageRange`, `region`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'sample@sample.com', 'sample123', 'ver', 'non', '18-25', 'region III', 'EXAMINEE', '2025-06-12 03:43:47', '2025-06-12 03:43:47'),
(3, 'sample@GMAIL.com', 'sample123', 'ver', 'non', '18-25', 'region III', 'EXAMINEE', '2025-06-12 03:43:47', '2025-06-12 03:43:47'),
(4, 'yhell@techpro360solutions.com', '$2a$10$CAApap0693/WAKkYnvGd.OO/CLdZvbDdgZNJucLenjfs8sjP132hy', 'vernon', 'pranilla', '13-17', 'Region III', 'examinee', '2025-06-12 01:59:39', '2025-06-12 01:59:39'),
(5, 'roma@techpro360solutions.com', '$2a$10$STQPUCTwBLpDfJ.f07txI.omj7by1GBCqWjqmMahQQz02YT5Ebs1e', 'vernon', 'pranilla', '13-17', 'Region III', 'examinee', '2025-06-12 02:18:22', '2025-06-12 02:18:22'),
(6, 'sample@okay.com', '$2a$10$IPZrES5u3xgONWrlGVw/vONsZbLP.QXG18.kn0x2lx7tyDtR9Or12', 'vernon8', 'trrill', '13-17', 'Region IV-A', 'examinee', '2025-06-12 02:37:05', '2025-06-12 02:37:05'),
(7, 'sample@yeah.com', '$2a$10$poRaSQB.CxtOZhcFBBsVve2UdJzM3VybuvjwoFO77RWLaybJqrEVq', 'vriella kate', 'pranilla', '13-17', 'Region II', 'examinee', '2025-06-12 02:47:23', '2025-06-12 02:47:23'),
(8, 'sample@vriella.com', '$2a$10$12frUlyGhN4d5trRkDhBpOAaltd1cdn3T67agiySiZSM6lpOM3qu6', 'vriella kate', 'pranilla', '13-17', 'Region II', 'examinee', '2025-06-12 02:47:36', '2025-06-12 02:47:36'),
(9, 'sample@yes.com', '$2a$10$Ekhn19eb4T36oj7JTRNn9u0jhL8V.CcrB8nBTiwKsIcT9fyhHhYLq', 'vernon5', 'pranilla', '18-24', 'Region III', 'examinee', '2025-06-12 03:22:21', '2025-06-12 03:22:21'),
(10, 'isda@fish.com', '$2a$10$wKkn4NMpgg5Jcuxgxy5oUOP4ga1.h.6uOQO/Llz8nqbSJ0EnnwbJ.', 'isda', 'pa', '13-17', 'Region III', 'examinee', '2025-06-12 03:25:46', '2025-06-12 03:25:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessment_id` (`assessment_id`),
  ADD KEY `AssessmentId` (`AssessmentId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_3` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `answers_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `assessments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `assessments_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`),
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`AssessmentId`) REFERENCES `assessments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
