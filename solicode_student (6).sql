-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2024 at 06:16 AM
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
-- Database: `solicode_student`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_token`
--

CREATE TABLE `access_token` (
  `student_id` int(11) UNSIGNED NOT NULL,
  `token` varchar(50) DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `access_token`
--

INSERT INTO `access_token` (`student_id`, `token`, `start_time`, `end_time`, `id`) VALUES
(28, 'fa6d7b3c64f3bb14c1f88e0656c946b2', '2024-06-10 19:54:06', '2024-06-10 20:54:06', 8),
(29, 'fb0880d3527d4d76f8824db5b6ce5cde', '2024-06-08 23:43:07', '2024-06-09 00:43:07', 9),
(31, 'f6a56c7c0c49287eba4d41571a2cbdf3', '2024-06-11 02:32:19', '2024-06-11 03:32:19', 10),
(32, 'df0b66ca9798b7f69e59ad9eedaf2059', '2024-06-10 12:48:45', '2024-06-10 13:48:45', 11);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) UNSIGNED NOT NULL,
  `body` text NOT NULL,
  `file_path` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`file_path`)),
  `create_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creater_id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `tags` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `body`, `file_path`, `create_at`, `creater_id`, `title`, `tags`) VALUES
(19, '<p>sdfsdf</p><p>sdf</p><p></p><p>sdf</p><p></p><p>sdf</p><p>sd</p><p>f</p>', '[]', '2024-06-07 19:05:06', 28, 'fwdfwef', ''),
(20, '<p>Artificial Intelligence (AI) has a in  <p></p><p>Entertainment: AI-generated content, from music to movies, is becoming increasingly sophisticated. Streaming services like Netflix use AI to recommend content based on user behavior, while AI-created artworks and compositions push the boundaries of <p></p><p>Ethical Considerations and Challenges</p><p>While the potential benefits of AI are immense, they come tigate risks associated with advanced AI technologies.</p><p></p><p>The Future of AI</p><p></p>', '{\"img 0\":\"http:\\/\\/localhost\\/projects\\/PFE\\/solicode\\/backend\\/image\\/1717865356_pexels-cottonbro-6153354.jpg\"}', '2024-06-10 21:02:05', 31, 'The Rise of Artificial Intelligence: Transforming the Future', 'AI-machine learning'),
(21, '<p>Responsive web design is no longer optional in today’s digital landscape. With an ever-increasing number of users accessing the internet via mobile devices, ensuring your website is mobile-friendly is crucial. A responsive design adapts seamlessly to different screen sizes, providing an optimal user experience regardless of the device used. This approach enhances usability, reduces bounce rates, and improves overall engagement. Additionally, search engines like Google prioritize mobile-friendly sites in their rankings, making responsiveness a critical factor for SEO. Implementing flexible grid layouts, media queries, and responsive images are fundamental techniques in responsive design. As a web developer, mastering these skills is essential to meet the expectations of modern users and clients. Stay ahead by continuously learning and adapting to the latest trends in responsive web design.</p>', '{\"img 0\":\"http:\\/\\/localhost\\/projects\\/PFE\\/solicode\\/backend\\/image\\/1718049981_aws .png\"}', '2024-06-10 21:06:21', 31, 'The Importance of Responsive Web Design', 'AI-machine learning'),
(22, '<p>Responsive web design is no longer optional in today’s digital landscape. With an ever-increasing number of users accessing the internet via mobile devices, ensuring your website is mobile-friendly is crucial. A responsive design adapts seamlessly to different screen sizes, providing an optimal user experience regardless of the device used. This approach enhances usability, reduces bounce rates, and improves overall engagement. Additionally, search engines like Google prioritize mobile-friendly sites in their rankings, making responsiveness a critical factor for SEO. Implementing flexible grid layouts, media queries, and responsive images are fundamental techniques in responsive design. As a web developer, mastering these skills is essential to meet the expectations of modern users and clients. Stay ahead by continuously learning and adapting to the latest trends in responsive web design.</p>', '{\"img 0\":\"http:\\/\\/localhost\\/projects\\/PFE\\/solicode\\/backend\\/image\\/1718050037_NACL securety Groups.png\"}', '2024-06-10 21:07:17', 31, 'The Role of JavaScript in Modern Web Development', 'AI-machine learning');

-- --------------------------------------------------------

--
-- Table structure for table `autho`
--

CREATE TABLE `autho` (
  `id` int(2) UNSIGNED NOT NULL,
  `autho_name` varchar(15) NOT NULL,
  `creater_id` int(11) UNSIGNED NOT NULL,
  `class_id` varchar(10) NOT NULL,
  `autho_url` varchar(200) NOT NULL,
  `elements_num` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autho`
--

INSERT INTO `autho` (`id`, `autho_name`, `creater_id`, `class_id`, `autho_url`, `elements_num`) VALUES
(22, 'PHP', 29, '1', 'http://fff.com', 3),
(23, 'CSS', 29, '1', 'web.com', 5),
(24, 'HTML', 29, '1', 'web.com', 5),
(25, 'Javascript', 29, '1', 'sa.com', 6),
(26, 'MySQL', 29, '1', 'a.com', 4),
(27, 'Javascript', 29, '1', 'ef', 8),
(28, 'HTML', 32, 'WD102', 'https://www.w3schools.com/html/default.asp', 10),
(29, 'CSS', 32, 'WD102', 'https://developer.mozilla.org/en-US/docs/Web/CSS', 11),
(30, 'Javascript', 32, 'WD102', 'https://www.freecodecamp.org/news/learn-javascript-for-beginners/#1javascriptintroduction', 10);

-- --------------------------------------------------------

--
-- Table structure for table `autho_elements`
--

CREATE TABLE `autho_elements` (
  `id` int(11) UNSIGNED NOT NULL,
  `part_title` varchar(200) NOT NULL,
  `autho_id` int(2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autho_elements`
--

INSERT INTO `autho_elements` (`id`, `part_title`, `autho_id`) VALUES
(4, 'zffffffffff', 22),
(6, 's', 22),
(45, 'sdsd', 23),
(46, 'sds', 23),
(48, 'sds', 23),
(49, 'sdswdqw', 23),
(50, 'sfdf', 24),
(51, 'dsd', 24),
(52, 'sds', 24),
(53, 'sds', 24),
(54, 'sds', 24),
(55, 'as', 25),
(56, 'aas', 25),
(57, 'dsda', 25),
(58, 'dasd', 25),
(59, 'dasew', 25),
(60, 'asfdfe', 25),
(61, 'a', 26),
(62, 's', 26),
(63, 'd', 26),
(64, 'c', 26),
(65, 'scsd', 27),
(66, 'sd', 27),
(67, 'asd', 27),
(68, 'das', 27),
(69, 'ds', 27),
(70, 'ds', 27),
(71, 'ds', 27),
(72, 'ds', 27),
(73, 'HTML Basic', 28),
(74, 'HTML Elements', 28),
(75, 'HTML Headings', 28),
(76, 'HTML Paragraphs', 28),
(77, 'HTML Styles', 28),
(78, 'HTML Comments', 28),
(79, 'HTML Colors', 28),
(80, 'HTML CSS', 28),
(81, 'HTML Links', 28),
(82, 'HTML Images', 28),
(83, 'CSS Syntax', 29),
(84, 'CSS Selectors', 29),
(85, 'CSS Comments', 29),
(86, 'CSS Colors', 29),
(87, 'CSS Backgrounds', 29),
(88, 'CSS Borders', 29),
(89, 'CSS Margins', 29),
(90, 'CSS Padding', 29),
(91, 'CSS Height/Width', 29),
(92, 'CSS Box Model', 29),
(93, 'CSS Outline', 29),
(94, 'JS Output', 30),
(95, 'JS Statements', 30),
(96, 'JS Variables', 30),
(97, 'JS Operators', 30),
(98, 'JS Arithmetic', 30),
(99, 'JS Arithmetic', 30),
(100, 'JS Functions', 30),
(101, 'JS Objects', 30),
(102, 'JS Events', 30),
(103, 'JS Number Methods', 30);

-- --------------------------------------------------------

--
-- Table structure for table `challenge`
--

CREATE TABLE `challenge` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `php` varchar(255) NOT NULL,
  `js` varchar(255) NOT NULL,
  `js_fun` varchar(300) NOT NULL,
  `php_fun` varchar(300) NOT NULL,
  `output` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`output`)),
  `Difficulty` varchar(10) NOT NULL,
  `point` int(2) NOT NULL,
  `example` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `challenge`
--

INSERT INTO `challenge` (`id`, `title`, `body`, `php`, `js`, `js_fun`, `php_fun`, `output`, `Difficulty`, `point`, `example`) VALUES
(1, 'problem1', 'problem 1 body', '', 'C:\\xampp\\htdocs\\projects\\PFE\\solicode\\backend\\files\\problems-file\\problem1.js', 'function sum(n,x){return;}', '', '[3,4,5,6]', 'easy', 10, ''),
(2, 'Sum of Two Numbers\r\n', 'Description: Write a function that takes two numbers and returns their sum.\r\n', '', 'C:\\xampp\\htdocs\\projects\\PFE\\solicode\\backend\\files\\problems-file\\Sum_of_Two_Numbers2_28_.js', 'function sumOfTwoNumbers(num1,num2){\r\n   // write your code here\r\n   return \r\n}', 'function SumOfTwoNumbers(num1,num2){\r\n   // write your code here\r\n   return \r\n}', '[3,4,5,6]', 'easy', 10, ''),
(3, ' Check if a String is a Palindrome', 'Description: Write a function that checks if a given string is a palindrome (reads the same forwards and backwards).\r\n', '', 'C:\\xampp\\htdocs\\projects\\PFE\\solicode\\backend\\files\\problems-file\\Palindrome.js', 'function palindrome(str){\r\n  //write your code here\r\n\r\n  return ;\r\n\r\n}', 'function palindrome(str){\r\n  //write your code here\r\n\r\n  return ;\r\n\r\n}', '[\r\ntrue,\r\nfalse,\r\ntrue\r\n]', ' Medium', 20, '');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) UNSIGNED NOT NULL,
  `body` text NOT NULL,
  `catigory` varchar(20) NOT NULL,
  `catigory_id` int(11) UNSIGNED NOT NULL,
  `creater_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `body`, `catigory`, `catigory_id`, `creater_id`) VALUES
(66, 'rwerwerwe', 'post', 23, 31),
(67, 'erwer', 'article', 20, 31);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) UNSIGNED NOT NULL,
  `post_body` text NOT NULL,
  `file_path` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`file_path`)),
  `create_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creater_id` int(11) UNSIGNED NOT NULL,
  `likes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`likes`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `post_body`, `file_path`, `create_at`, `creater_id`, `likes`) VALUES
(23, '<p>afbvadf  dv df va   </p><p>dfaga</p><p>fvdf</p><p></p><p>vdfv</p><p></p><p>dfv</p>', '{\"img 0\":\"http:\\/\\/localhost\\/projects\\/PFE\\/solicode\\/backend\\/image\\/1717684098_branch fugir.png\",\"img 1\":\"http:\\/\\/localhost\\/projects\\/PFE\\/solicode\\/backend\\/image\\/1717684098_Capture.PNG\",\"img 2\":\"http:\\/\\/localhost\\/projects\\/PFE\\/solicode\\/backend\\/image\\/1717684098_commit-change.png\",\"img 3\":\"http:\\/\\/localhost\\/projects\\/PFE\\/solicode\\/backend\\/image\\/1717684098_comper.PNG\",\"img 4\":\"http:\\/\\/localhost\\/projects\\/PFE\\/solicode\\/backend\\/image\\/1717684098_create repo.png\",\"img 5\":\"http:\\/\\/localhost\\/projects\\/PFE\\/solicode\\/backend\\/image\\/1717684098_create-branch.png\"}', '2024-06-06 15:28:33', 28, '{\"likes\":1,\"students_IDs\":[\"28\"]}'),
(24, '<p>Development is a journey, not a destination. Embrace the process and enjoy the growth along the way. Challenges are opportunities in disguise; they push us to innovate and improve. Stay curious, stay humble, and never stop learning. Together, let&#39;s build a future where technology serves humanity with compassion and purpose</p>', '[]', '2024-06-10 20:48:44', 31, '{\"likes\":0,\"students_IDs\":[]}');

-- --------------------------------------------------------

--
-- Table structure for table `problemstate`
--

CREATE TABLE `problemstate` (
  `id` int(11) UNSIGNED NOT NULL,
  `problem_id` int(11) UNSIGNED NOT NULL,
  `student_id` int(11) UNSIGNED NOT NULL,
  `js_code` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `php_code` varchar(100) NOT NULL,
  `point` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `problemstate`
--

INSERT INTO `problemstate` (`id`, `problem_id`, `student_id`, `js_code`, `status`, `php_code`, `point`) VALUES
(3, 1, 28, NULL, 'valid', '', NULL),
(4, 3, 28, NULL, 'no valid', '', NULL),
(5, 1, 31, NULL, 'valid', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `class_id` varchar(255) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `point` int(4) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `who` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `full_name`, `email`, `pwd`, `class_id`, `photo`, `point`, `phone`, `who`) VALUES
(28, 'khalid', 'e@e.e', '$2y$10$/VbCD.Zd/WHlHBLuVVQ95uRpcpQfWzbcdGqlMz9Buylftg52Fa716', 'WD102', 'http://localhost/projects/PFE/solicode/backend/image/1717723079_01-1.jpg', 0, '', 'student'),
(29, 'fatima', 't@t.com', '$2y$10$.yoeHq1iNN0ZcX3TcGaITuNI0Zyan78t9wfu54iNQcuE9mihC4.LK', 'WD102', 'http://localhost/projects/PFE/solicode/\\backend\\api\\..\\image\\profile_avatar.png', 0, '', 'student'),
(31, 'Ibourk', 'tagmatibourk8@gmail.com', '$2y$10$pl6QYbf3zxk53OYg3FIKiOzufBl.L4NoJYlrhAvWtnmMJg1qT.pJW', 'WD102', 'http://localhost/projects/PFE/solicode/backend/image/1717863814_pexels-olia-danilevich-4974914.jpg', 0, '', 'student'),
(32, 'teacher', 'teacher@gmail.com', '$2y$10$64gvTCMJ184B/oRtKjtcQuke78roJzwsxrk3peDhXzB3jC4niHlWm', 'WD102', 'http://localhost\\projects\\PFE\\solicode\\backend\\api\\..\\image\\profile_avatar.png', 0, '', 'teacher');

-- --------------------------------------------------------

--
-- Table structure for table `student_autho`
--

CREATE TABLE `student_autho` (
  `autho_ele_id` int(11) UNSIGNED NOT NULL,
  `student_id` int(11) UNSIGNED NOT NULL,
  `autho_status` varchar(11) NOT NULL,
  `id` int(11) NOT NULL,
  `start_at` datetime DEFAULT NULL,
  `end_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_autho`
--

INSERT INTO `student_autho` (`autho_ele_id`, `student_id`, `autho_status`, `id`, `start_at`, `end_at`) VALUES
(4, 28, 'end', 1, '2024-06-05 12:49:14', '2024-06-05 12:57:49'),
(6, 28, 'end', 3, '2024-06-06 20:17:52', '2024-06-06 20:17:54'),
(45, 28, 'end', 42, '2024-06-06 23:18:14', '2024-06-06 23:18:16'),
(46, 28, 'none', 43, NULL, NULL),
(48, 28, 'none', 45, NULL, NULL),
(49, 28, 'none', 46, NULL, NULL),
(50, 28, 'none', 47, NULL, NULL),
(51, 28, 'end', 48, NULL, '2024-06-06 23:18:27'),
(52, 28, 'none', 49, NULL, NULL),
(53, 28, 'none', 50, NULL, NULL),
(54, 28, 'none', 51, NULL, NULL),
(55, 28, 'end', 52, '2024-06-06 23:36:40', '2024-06-06 23:36:43'),
(56, 28, 'end', 53, '2024-06-06 23:36:45', '2024-06-06 23:36:47'),
(57, 28, 'end', 54, '2024-06-06 23:36:50', '2024-06-06 23:36:52'),
(58, 28, 'end', 55, '2024-06-06 23:36:54', '2024-06-06 23:36:56'),
(59, 28, 'end', 56, '2024-06-06 23:36:58', '2024-06-06 23:37:01'),
(60, 28, 'end', 57, '2024-06-06 23:37:03', '2024-06-06 23:37:05'),
(61, 28, 'end', 58, NULL, '2024-06-06 23:44:16'),
(62, 28, 'end', 59, NULL, '2024-06-06 23:44:19'),
(63, 28, 'end', 60, NULL, '2024-06-06 23:44:22'),
(64, 28, 'none', 61, NULL, NULL),
(65, 28, 'none', 62, NULL, NULL),
(66, 28, 'none', 63, NULL, NULL),
(67, 28, 'none', 64, NULL, NULL),
(68, 28, 'none', 65, NULL, NULL),
(69, 28, 'none', 66, NULL, NULL),
(70, 28, 'none', 67, NULL, NULL),
(71, 28, 'none', 68, NULL, NULL),
(72, 28, 'none', 69, NULL, NULL),
(73, 31, 'end', 70, '2024-06-10 18:25:13', '2024-06-10 18:27:09'),
(74, 31, 'end', 71, '2024-06-10 18:27:27', '2024-06-10 18:33:51'),
(75, 31, 'end', 72, '2024-06-10 18:31:09', '2024-06-10 18:34:39'),
(76, 31, 'end', 73, '2024-06-10 18:36:54', '2024-06-10 21:25:59'),
(77, 31, 'end', 74, '2024-06-10 21:26:02', '2024-06-10 21:26:04'),
(78, 31, 'end', 75, '2024-06-10 21:26:06', '2024-06-10 21:26:09'),
(79, 31, 'end', 76, '2024-06-10 21:26:11', '2024-06-10 21:26:12'),
(80, 31, 'end', 77, '2024-06-10 21:26:14', '2024-06-10 21:26:17'),
(81, 31, 'end', 78, '2024-06-10 21:26:19', '2024-06-10 21:26:21'),
(82, 31, 'end', 79, '2024-06-10 21:26:23', '2024-06-10 21:26:26'),
(83, 31, 'end', 80, '2024-06-10 21:26:33', '2024-06-10 21:26:46'),
(84, 31, 'end', 81, '2024-06-10 21:26:35', '2024-06-10 21:26:49'),
(85, 31, 'end', 82, '2024-06-10 21:26:37', '2024-06-10 21:26:51'),
(86, 31, 'end', 83, '2024-06-10 21:26:39', '2024-06-10 21:26:53'),
(87, 31, 'end', 84, '2024-06-10 21:26:42', '2024-06-10 21:26:58'),
(88, 31, 'none', 85, NULL, NULL),
(89, 31, 'none', 86, NULL, NULL),
(90, 31, 'none', 87, NULL, NULL),
(91, 31, 'none', 88, NULL, NULL),
(92, 31, 'none', 89, NULL, NULL),
(93, 31, 'none', 90, NULL, NULL),
(94, 31, 'end', 91, '2024-06-10 21:27:01', '2024-06-10 21:27:16'),
(95, 31, 'end', 92, '2024-06-10 21:27:04', '2024-06-10 21:27:13'),
(96, 31, 'end', 93, '2024-06-10 21:27:07', '2024-06-10 21:27:09'),
(97, 31, 'none', 94, NULL, NULL),
(98, 31, 'none', 95, NULL, NULL),
(99, 31, 'none', 96, NULL, NULL),
(100, 31, 'none', 97, NULL, NULL),
(101, 31, 'none', 98, NULL, NULL),
(102, 31, 'none', 99, NULL, NULL),
(103, 31, 'none', 100, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(200) NOT NULL,
  `task_body` text NOT NULL,
  `file_path` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`file_path`)),
  `class_id` varchar(10) NOT NULL,
  `creater_id` int(11) UNSIGNED NOT NULL,
  `brief_catigory` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `title`, `task_body`, `file_path`, `class_id`, `creater_id`, `brief_catigory`) VALUES
(86, 'Create an HTML form with the following inputs', '<h2><strong>description:</strong></h2><p>	Build an HTML form with fields for name, email, age, and gender, incorporating HTML5 validation attributes to ensure correct data entry.</p><p></p><ul><li>A text input for full name (required).</li><li>An email input (required).</li><li>A number input for age (required and should be between 18 and 100).</li><li>A dropdown for gender selection.</li><li>A submit button.</li><li>Add basic HTML5 validation to ensure all fields are filled out correctly</li></ul>', '\"{\\\"img 0\\\":\\\"http:\\\\\\/\\\\\\/localhost\\\\\\/projects\\\\\\/PFE\\\\\\/solicode\\\\\\/backend\\\\\\/image\\\\\\/1718042219_examplee.jpg\\\"}\"', 'WD102', 32, 'HTML'),
(87, 'Styling Form ', '<h4>Task:</h4><p>Create a CSS stylesheet to style an HTML page. Apply styling to various elements using different types of selectors.</p><h4>Requirements:</h4><ol><li>Apply styles to the following elements:<ul><li>Heading (<code>&lt;h1&gt;</code>)</li><li>Paragraph (<code>&lt;p&gt;</code>)</li><li>Links (<code>&lt;a&gt;</code>)</li><li>List items (<code>&lt;li&gt;</code>)</li><li>Images (<code>&lt;img&gt;</code>)</li></ul></li><li>Use at least one of each type of selector:<ul><li>Element selector</li><li>Class selector</li><li>ID selector</li></ul></li><li>Apply styles for the following properties:<ul><li>Font family</li><li>Font size</li><li>Text color</li><li>Background color</li><li>Margin and padding</li><li>Border</li><li>Width and height</li><li>Display (e.g., block, inline-block)</li><li>Text alignment</li><li>Text decoration</li><li>Hover effects (e.g., change color on hover)</li></ul></li><li>Use comments to explain your CSS rules.</li></ol><h2></h2>', '\"{\\\"img 0\\\":\\\"http:\\\\\\/\\\\\\/localhost\\\\\\/projects\\\\\\/PFE\\\\\\/solicode\\\\\\/backend\\\\\\/image\\\\\\/1718047601_R (1).jpeg\\\"}\"', 'WD102', 32, 'CSS'),
(88, 'Styling Form ', '<h4>Task:</h4><p>Create a CSS stylesheet to style an HTML page. Apply styling to various elements using different types of selectors.</p><h4>Requirements:</h4><ol><li>Apply styles to the following elements:<ul><li>Heading (<code>&lt;h1&gt;</code>)</li><li>Paragraph (<code>&lt;p&gt;</code>)</li><li>Links (<code>&lt;a&gt;</code>)</li><li>List items (<code>&lt;li&gt;</code>)</li><li>Images (<code>&lt;img&gt;</code>)</li></ul></li><li>Use at least one of each type of selector:<ul><li>Element selector</li><li>Class selector</li><li>ID selector</li></ul></li><li>Apply styles for the following properties:<ul><li>Font family</li><li>Font size</li><li>Text color</li><li>Background color</li><li>Margin and padding</li><li>Border</li><li>Width and height</li><li>Display (e.g., block, inline-block)</li><li>Text alignment</li><li>Text decoration</li><li>Hover effects (e.g., change color on hover)</li></ul></li><li>Use comments to explain your CSS rules.</li></ol><h2></h2>', '\"{\\\"img 0\\\":\\\"http:\\\\\\/\\\\\\/localhost\\\\\\/projects\\\\\\/PFE\\\\\\/solicode\\\\\\/backend\\\\\\/image\\\\\\/1718047699_R (1).jpeg\\\"}\"', 'WD102', 32, 'CSS'),
(89, 'Styling Form ', '<h4>Task:</h4><p>Create a CSS stylesheet to style an HTML page. Apply styling to various elements using different types of selectors.</p><h4>Requirements:</h4><ol><li>Apply styles to the following elements:<ul><li>Heading (<code>&lt;h1&gt;</code>)</li><li>Paragraph (<code>&lt;p&gt;</code>)</li><li>Links (<code>&lt;a&gt;</code>)</li><li>List items (<code>&lt;li&gt;</code>)</li><li>Images (<code>&lt;img&gt;</code>)</li></ul></li><li>Use at least one of each type of selector:<ul><li>Element selector</li><li>Class selector</li><li>ID selector</li></ul></li><li>Apply styles for the following properties:<ul><li>Font family</li><li>Font size</li><li>Text color</li><li>Background color</li><li>Margin and padding</li><li>Border</li><li>Width and height</li><li>Display (e.g., block, inline-block)</li><li>Text alignment</li><li>Text decoration</li><li>Hover effects (e.g., change color on hover)</li></ul></li><li>Use comments to explain your CSS rules.</li></ol><h2></h2>', '\"{\\\"img 0\\\":\\\"http:\\\\\\/\\\\\\/localhost\\\\\\/projects\\\\\\/PFE\\\\\\/solicode\\\\\\/backend\\\\\\/image\\\\\\/1718047699_R (1).jpeg\\\"}\"', 'WD102', 32, 'CSS'),
(90, 'Styling Form ', '<h4>Task:</h4><p>Create a CSS stylesheet to style an HTML page. Apply styling to various elements using different types of selectors.</p><h4>Requirements:</h4><ol><li>Apply styles to the following elements:<ul><li>Heading (<code>&lt;h1&gt;</code>)</li><li>Paragraph (<code>&lt;p&gt;</code>)</li><li>Links (<code>&lt;a&gt;</code>)</li><li>List items (<code>&lt;li&gt;</code>)</li><li>Images (<code>&lt;img&gt;</code>)</li></ul></li><li>Use at least one of each type of selector:<ul><li>Element selector</li><li>Class selector</li><li>ID selector</li></ul></li><li>Apply styles for the following properties:<ul><li>Font family</li><li>Font size</li><li>Text color</li><li>Background color</li><li>Margin and padding</li><li>Border</li><li>Width and height</li><li>Display (e.g., block, inline-block)</li><li>Text alignment</li><li>Text decoration</li><li>Hover effects (e.g., change color on hover)</li></ul></li><li>Use comments to explain your CSS rules.</li></ol><h2></h2>', '\"{\\\"img 0\\\":\\\"http:\\\\\\/\\\\\\/localhost\\\\\\/projects\\\\\\/PFE\\\\\\/solicode\\\\\\/backend\\\\\\/image\\\\\\/1718047700_R (1).jpeg\\\"}\"', 'WD102', 32, 'CSS');

-- --------------------------------------------------------

--
-- Table structure for table `taskstate`
--

CREATE TABLE `taskstate` (
  `task_id` int(11) UNSIGNED NOT NULL,
  `student_id` int(11) UNSIGNED NOT NULL,
  `id` int(11) NOT NULL,
  `github_url` varchar(300) DEFAULT NULL,
  `point` int(2) NOT NULL,
  `code` text NOT NULL,
  `status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taskstate`
--

INSERT INTO `taskstate` (`task_id`, `student_id`, `id`, `github_url`, `point`, `code`, `status`) VALUES
(86, 31, 63, NULL, 0, '<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n  </head>\r\n  <body>\r\n  </body>  \r\n</html>', 'not valid'),
(87, 31, 64, NULL, 0, '<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n  </head>\r\n  <body>\r\n  </body>  \r\n</html>', 'not valid'),
(88, 31, 65, NULL, 0, '<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n  </head>\r\n  <body>\r\n  </body>  \r\n</html>', 'not valid'),
(89, 31, 66, NULL, 12, '<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n  </head>\r\n  <body>\r\n  </body>  \r\n</html>', 'valid'),
(90, 31, 67, NULL, 100, '<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n  </head>\r\n  <body>\r\n  </body>  \r\n</html>', 'valid'),
(86, 28, 68, NULL, 0, '', 'not valid'),
(87, 28, 69, NULL, 0, '', 'not valid'),
(88, 28, 70, NULL, 0, '', 'not valid'),
(89, 28, 71, NULL, 0, '', 'not valid'),
(90, 28, 72, NULL, 0, '', 'not valid'),
(86, 29, 73, NULL, 0, '', 'not valid'),
(90, 29, 74, NULL, 0, '', 'not valid'),
(87, 29, 75, NULL, 0, '', 'not valid'),
(88, 29, 76, NULL, 0, '', 'not valid');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_token`
--
ALTER TABLE `access_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `access_token_ibfk_1` (`student_id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `autho`
--
ALTER TABLE `autho`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `autho_elements`
--
ALTER TABLE `autho_elements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autho_id` (`autho_id`);

--
-- Indexes for table `challenge`
--
ALTER TABLE `challenge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_ibfk_2` (`catigory_id`),
  ADD KEY `comments_ibfk_3` (`creater_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creater_id` (`creater_id`);

--
-- Indexes for table `problemstate`
--
ALTER TABLE `problemstate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `problemstate_ibfk_2` (`problem_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `student_autho`
--
ALTER TABLE `student_autho`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_autho_ibfk_1` (`autho_ele_id`),
  ADD KEY `student_autho_ibfk_2` (`student_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taskstate`
--
ALTER TABLE `taskstate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `taskstate_ibfk_2` (`student_id`),
  ADD KEY `taskstate_ibfk_1` (`task_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_token`
--
ALTER TABLE `access_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `autho`
--
ALTER TABLE `autho`
  MODIFY `id` int(2) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `autho_elements`
--
ALTER TABLE `autho_elements`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `challenge`
--
ALTER TABLE `challenge`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `problemstate`
--
ALTER TABLE `problemstate`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `student_autho`
--
ALTER TABLE `student_autho`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `taskstate`
--
ALTER TABLE `taskstate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access_token`
--
ALTER TABLE `access_token`
  ADD CONSTRAINT `access_token_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `autho_elements`
--
ALTER TABLE `autho_elements`
  ADD CONSTRAINT `autho_elements_ibfk_1` FOREIGN KEY (`autho_id`) REFERENCES `autho` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`creater_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`creater_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `problemstate`
--
ALTER TABLE `problemstate`
  ADD CONSTRAINT `problemstate_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `problemstate_ibfk_2` FOREIGN KEY (`problem_id`) REFERENCES `challenge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_autho`
--
ALTER TABLE `student_autho`
  ADD CONSTRAINT `student_autho_ibfk_1` FOREIGN KEY (`autho_ele_id`) REFERENCES `autho_elements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_autho_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `taskstate`
--
ALTER TABLE `taskstate`
  ADD CONSTRAINT `taskstate_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `taskstate_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
