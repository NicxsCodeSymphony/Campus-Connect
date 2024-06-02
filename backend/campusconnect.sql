-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2024 at 07:07 PM
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
(3, 'John Nico Edisan', 'nicxs', 'nicxs', '2024-05-26 12:15:16', 'Male', 'Full Stack Developer', 'assets/profile/me.jpg', 'assets/cover/pro.jpg'),
(4, 'Betty Maluya', 'betty', 'betyang', '2024-05-26 12:45:58', 'Male', 'Model | Call Center Agent', 'assets/profile/pro.jpg', 'assets/cover/bet.jpg'),
(5, 'Izzy Baliguat', 'izzy', 'izzy', '2024-05-27 02:26:43', 'Female', 'Miss Tajao 2021', 'assets/profile/izzy.jpg', 'assets/cover/gwapa.jpg'),
(6, 'Avelline Jean Alegada', 'ave', 'ave', '2024-06-02 17:02:17', 'Female', 'Sample lang ni', 'assets/profile/Screenshot 2024-06-01 092825.png', 'assets/cover/Screenshot 2024-05-24 205839.png');

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
(1, 4, 45, 'hello', '2024-06-02 16:32:31'),
(2, 5, 46, 'tudloe ko', '2024-06-02 17:04:11'),
(3, 6, 46, 'sigeee ugma tudloan tika yes sir', '2024-06-02 17:05:31');

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
(1, 4, 3, 'mutual', '2024-06-02 16:32:07'),
(2, 5, 6, 'mutual', '2024-06-02 17:02:54');

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
(1, 45, 4, '2024-06-02 16:58:25'),
(2, 45, 3, '2024-06-02 16:59:55'),
(3, 46, 5, '2024-06-02 17:04:02');

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
(1, 4, 45, 'comment', '2024-06-03 00:32:31'),
(2, 4, 45, 'like', '2024-06-03 00:58:25'),
(3, 3, 45, 'like', '2024-06-03 00:59:55'),
(4, 5, 46, 'like', '2024-06-03 01:04:02'),
(5, 5, 46, 'comment', '2024-06-03 01:04:11'),
(6, 6, 46, 'comment', '2024-06-03 01:05:31');

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
(31, 4, 'I am betty maluya!', 'assets/post/Screenshot 2024-05-23 223200.png', '2024-05-26 17:53:42'),
(43, 5, 'This is izzying nga gwapa kaau', 'assets/post/izzy.jpg', '2024-05-27 02:28:50'),
(45, 3, 'Hello world', '', '2024-06-02 14:55:06'),
(46, 6, 'table rapud ni', 'assets/post/Screenshot 2024-05-30 205011.png', '2024-06-02 17:03:08');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `friend`
--
ALTER TABLE `friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `like_couter`
--
ALTER TABLE `like_couter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

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
