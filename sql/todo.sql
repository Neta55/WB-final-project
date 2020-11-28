-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2020 at 09:23 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasklist`
--

CREATE TABLE `tasklist` (
  `task` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `checked` tinyint(1) DEFAULT 0,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasklist`
--

INSERT INTO `tasklist` (`task`, `id`, `order_id`, `checked`, `user_id`) VALUES
('1 uzdevums JJ', 5, 1, 0, 1),
('3 uzdevums JJ', 6, 3, 0, 1),
('4 uzdevums JJ', 7, 4, 0, 1),
('Uzdevums otrajam', 26, 1, 1, 2),
('jauns 8 uzdevums', 27, 2, 0, 2),
('Jauns 4 uzdevums 2 lietotājam', 28, 0, 0, 2),
('jaunais', 29, 0, 0, 2),
('5 uzdevums JJ', 32, 5, 0, 1),
('2 uzdevums JJ', 33, 6, 0, 1),
('jauns 8 uzdevums', 35, 9, 1, 1),
('222 pirmais', 36, 3, 0, 3),
('222 otrais', 37, 2, 0, 3),
('jauns 9 uzdevums', 38, 10, 1, 1),
('jauns11 uzdevums', 39, 8, 1, 1),
('jauns 8 uzdevums', 41, 12, 1, 1),
('jauns 8 uzdevums', 43, 13, 1, 1),
('Jauns uzdevums 2 lietotājam', 44, 14, 1, 1),
('6 uzdevums JJ', 47, 2, 0, 1),
('Jauns uzdevums', 48, 1, 0, 17),
('3 uzdevums +', 49, 10, 1, 1),
('111 uzdevums', 50, 10, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `id`) VALUES
('12345', '$2y$10$q2zrCrSv5lCxmRZjRic12eIhqOq4174.Lxcl139DIKWyCxP6XXqW2', 1),
('111', '$2y$10$rQFd3CVDKWHcaJGNGUOfO.Q8uGa7FcmYRYJI0mWcGPZ5jxWWfJA.i', 2),
('222', '$2y$10$t9WFStfD0YmUO2uWEEBHhO9neCOHGzMpaizEU1cse.A/9fTCuhdxy', 3),
('333', '$2y$10$ljt3zAByzzOu9BNrSgl8AOC/gy.t193kgRXEqV5r.o.H/erTXAJmq', 15),
('777', '$2y$10$NBGq7RN6V8hNMOlMI5rqh.jRZBUq934O.or9CUHnH2/J6kGI3rjJe', 17),
('5555', '$2y$10$1SfXQq720P5c.p2p8XULNe0bHoQg8hKLMqJr0FyJdZRN2gUYP6OPG', 18);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasklist`
--
ALTER TABLE `tasklist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasklist`
--
ALTER TABLE `tasklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasklist`
--
ALTER TABLE `tasklist`
  ADD CONSTRAINT `tasklist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
