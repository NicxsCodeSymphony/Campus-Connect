-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2024 at 04:05 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `campusconnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `gender` varchar(10) NOT NULL,
  `bio` varchar(30) NOT NULL,
  `profile_photo` varchar(100) NOT NULL,
  `cover_photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `name`, `username`, `password`, `time_created`, `gender`, `bio`, `profile_photo`, `cover_photo`) VALUES
(7, 'John Nico Edisan', 'nicxs', 'nicxs', '2024-06-09 11:09:09', 'Male', 'Full Stack Developer', 'assets/profile/Screenshot 2024-06-06 195559.png', 'assets/cover/Screenshot 2024-06-07 170259.png'),
(8, 'Izzy Baliguat', 'izzy', 'izzy', '2024-06-09 11:25:07', 'Female', 'Miss Tajao 2021', 'assets/profile/11-captivating-facts-about-wildlife-conservation-1693501602.jpg', 'assets/cover/131932595_3556295854463366_3955405247311407480_n.jpg'),
(9, 'Betty Maluya', 'betty', 'betty', '2024-06-09 11:33:19', 'Female', 'Model | Call Center Agent', 'assets/profile/Screenshot 2024-06-06 141925.png', 'assets/cover/Screenshot 2024-05-23 234137.png');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comment` varchar(150) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `post_id`, `comment`, `time_created`) VALUES
(1, 8, 3, 'daghana pud ani oi', '2024-06-09 18:04:08'),
(2, 9, 4, 'hello issy', '2024-06-09 18:07:04');

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `status` varchar(15) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `friend`
--

INSERT INTO `friend` (`id`, `user_id`, `friend_id`, `status`, `time_created`) VALUES
(1, 8, 7, 'mutual', '2024-06-09 18:03:18'),
(3, 9, 8, 'mutual', '2024-06-09 18:04:28'),
(4, 9, 7, 'mutual', '2024-06-23 13:21:04');

-- --------------------------------------------------------

--
-- Table structure for table `like_couter`
--

CREATE TABLE `like_couter` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `like_couter`
--

INSERT INTO `like_couter` (`id`, `post_id`, `user_id`, `time`) VALUES
(1, 3, 8, '2024-06-09 18:04:11'),
(2, 4, 9, '2024-06-09 18:07:00'),
(3, 4, 7, '2024-06-23 13:45:30'),
(4, 3, 7, '2024-06-23 13:45:38');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `user_id`, `post_id`, `type`, `time`) VALUES
(1, 8, 3, 'comment', '2024-06-10 02:04:08'),
(2, 8, 3, 'like', '2024-06-10 02:04:11'),
(3, 9, 4, 'like', '2024-06-10 02:07:00'),
(4, 9, 4, 'comment', '2024-06-10 02:07:04'),
(5, 7, 4, 'like', '2024-06-23 21:45:30'),
(6, 7, 3, 'like', '2024-06-23 21:45:38');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `poster_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `poster_id`, `post_id`, `image`) VALUES
(1, 7, 2, 'assets/post/Screenshot 2024-05-23 204019.png'),
(2, 7, 3, 'assets/post/Screenshot 2024-05-30 205011 - Copy.png'),
(3, 7, 3, 'assets/post/Screenshot 2024-05-30 205011.png'),
(4, 7, 3, 'assets/post/Screenshot 2024-06-01 092825.png'),
(5, 7, 3, 'assets/post/Screenshot 2024-06-02 220417.png'),
(6, 7, 3, 'assets/post/Screenshot 2024-06-05 181038.png'),
(7, 7, 3, 'assets/post/Screenshot 2024-06-06 113901.png'),
(8, 7, 3, 'assets/post/Screenshot 2024-06-06 141925.png'),
(16, 0, 4, 'assets/post/Screenshot 2024-06-02 220417.png'),
(17, 0, 4, 'assets/post/Screenshot 2024-06-05 181038.png'),
(18, 0, 4, 'assets/post/Screenshot 2024-06-06 113901.png'),
(19, 0, 4, 'assets/post/Screenshot 2024-06-06 141925.png'),
(23, 0, 6, 'assets/post/Screenshot 2024-05-23 233204 - Copy.png'),
(24, 0, 6, 'assets/post/Screenshot 2024-05-23 234137 - Copy.png');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL,
  `poster_id` int(11) NOT NULL,
  `caption` varchar(500) NOT NULL,
  `image` varchar(100) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `poster_id`, `caption`, `image`, `time_created`) VALUES
(1, 7, 'sample', '', '2024-06-09 18:03:25'),
(2, 7, 'one', '', '2024-06-09 18:03:32'),
(3, 7, 'daghan', '', '2024-06-09 18:03:41'),
(4, 8, '3', '', '2024-06-09 18:04:20'),
(6, 8, 'YAHAYA NAMAN JUD', '', '2024-06-23 14:00:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `like_couter`
--
ALTER TABLE `like_couter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `poster_id` (`poster_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `friend`
--
ALTER TABLE `friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `like_couter`
--
ALTER TABLE `like_couter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`poster_id`) REFERENCES `accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
