# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20)
# Database: tutorium
# Generation Time: 2017-11-21 03:45:10 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table tutor
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tutor`;

CREATE TABLE `tutor` (
  `studentID` int(11) NOT NULL,
  `education` varchar(2000) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `teachList` varchar(2000) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `place` varchar(1000) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `time` varchar(1500) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `uploadEvidence` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isApproved` tinyint(1) NOT NULL DEFAULT '0',
  KEY `tutor_studentID` (`studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
