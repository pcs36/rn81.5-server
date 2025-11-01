-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2025 at 05:10 AM
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
-- Database: `pratap_project_81`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `f_name` varchar(100) NOT NULL,
  `l_name` varchar(100) NOT NULL,
  `e_mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT 0 COMMENT '1=deleted, 0=not deleted',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `f_name`, `l_name`, `e_mail`, `password`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'PRAT', 'l_name', 'p@g1.com', 'user.password', 0, '2025-09-30 11:12:35', '2025-09-30 11:12:35'),
(2, 'PRAT', 'l_name', 'p1@g.com', 'U2FsdGVkX19DS363iKe/S8iRKN7Jk39GA4L2/JGIA8k=', 0, '2025-09-30 12:40:41', '2025-09-30 12:40:41'),
(33, 'Fgggg', 'Vhhjj', 'pppcqq1', 'U2FsdGVkX18sO1gjnD/eBwUiy92SQjzSdXILxA4aEVU=', 0, '2025-10-29 13:55:08', '2025-10-29 13:55:08'),
(34, 'AAA', 'BBB', 'pppa', 'U2FsdGVkX19mBagCLyA1ILLxhaCJ2gCSHVusOef24Rg=', 0, '2025-10-29 14:05:11', '2025-10-29 14:05:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
