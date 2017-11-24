# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20)
# Database: tutorium
# Generation Time: 2017-11-24 10:13:31 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `studentID` int(11) NOT NULL,
  `accountType` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `accountID` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `isTutor` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`studentID`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;

INSERT INTO `account` (`studentID`, `accountType`, `accountID`, `isTutor`, `createdAt`, `updatedAt`)
VALUES
	(1,'facebook','107701540010684',1,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(2,'facebook','110434556403380',1,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(3,'facebook','113813989397748',1,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(4,'facebook','115803282531362',1,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(5,'facebook','104215220360075',1,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(6,'facebook','105288240252650',1,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(7,'facebook','105218696926268',1,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(8,'facebook','109594286487721',0,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(9,'facebook','107675473347169',0,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(10,'facebook','112112329568864',0,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(11,'facebook','120817842029069',0,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(12,'facebook','124916018285571',0,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(13,'facebook','103339857115329',0,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(14,'facebook','106095683505318',0,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(15,'facebook','107860986661856',0,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(16,'facebook','116502822462042',0,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(17,'facebook','103949853720600',0,'2017-11-24 06:36:34','2017-11-24 06:36:34'),
	(18,'line','U7ca72bd3bf0d065e5c68f5ba4a63be88',1,'2017-11-24 06:36:34','2017-11-24 06:36:34');

/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`username`, `password`, `createdAt`, `updatedAt`)
VALUES
	('tutorium','8f7dd0890f92a2b12497f2009ac7bab80e9110898d45a281c0221adf66168c2b','2017-11-24 06:38:59','2017-11-24 06:38:59');

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table attendance
# ------------------------------------------------------------

DROP TABLE IF EXISTS `attendance`;

CREATE TABLE `attendance` (
  `attendanceID` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `attendance_studentID` int(11) NOT NULL,
  `attendance_tutorID` int(11) NOT NULL,
  PRIMARY KEY (`attendanceID`),
  KEY `studentID_idx` (`attendance_studentID`),
  KEY `tutorID_idx` (`attendance_tutorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table bankaccount
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bankaccount`;

CREATE TABLE `bankaccount` (
  `bankAccount_studentID` int(11) NOT NULL,
  `bankaccountNo` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`bankaccountNo`,`bankAccount_studentID`),
  KEY `bankAccount_studentID` (`bankAccount_studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table bankaccountpayment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bankaccountpayment`;

CREATE TABLE `bankaccountpayment` (
  `bankAccountPayment_paymentID` int(11) NOT NULL,
  `bankAccountNo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`bankAccountPayment_paymentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table contact
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contact`;

CREATE TABLE `contact` (
  `contact_studentID` int(11) NOT NULL,
  `phone` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `LineID` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FacebookURL` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`contact_studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table course
# ------------------------------------------------------------

DROP TABLE IF EXISTS `course`;

CREATE TABLE `course` (
  `couseID` int(11) NOT NULL AUTO_INCREMENT,
  `course_tutorID` int(11) NOT NULL,
  `subject` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `acceptedDateTime` datetime NOT NULL,
  `isAccepted` bit(1) NOT NULL,
  `level` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`couseID`),
  KEY `course_tutorID_idx` (`course_tutorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table courserequest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `courserequest`;

CREATE TABLE `courserequest` (
  `requestID` int(11) NOT NULL AUTO_INCREMENT,
  `courseRequest_studentID` int(11) NOT NULL,
  `courseRequest_tutorID` int(11) NOT NULL,
  `Subject` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `level` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`requestID`),
  KEY `courseRequest_studentID_idx` (`courseRequest_studentID`),
  KEY `courseRequest_tutorID_idx` (`courseRequest_tutorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table creditcard
# ------------------------------------------------------------

DROP TABLE IF EXISTS `creditcard`;

CREATE TABLE `creditcard` (
  `creditCard_studentID` int(11) NOT NULL,
  `cardNo` int(11) NOT NULL AUTO_INCREMENT,
  `expireDate` date NOT NULL,
  `secureCode` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`cardNo`,`creditCard_studentID`),
  KEY `creditCard_studentID` (`creditCard_studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table creditcardpayment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `creditcardpayment`;

CREATE TABLE `creditcardpayment` (
  `creditCardPayment_paymentID` int(11) NOT NULL,
  `creditCardNo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`creditCardPayment_paymentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table enrolled
# ------------------------------------------------------------

DROP TABLE IF EXISTS `enrolled`;

CREATE TABLE `enrolled` (
  `enrolled_courseID` int(11) NOT NULL,
  `enrolled_studentID` int(11) NOT NULL,
  PRIMARY KEY (`enrolled_courseID`,`enrolled_studentID`),
  KEY `enrolled_studentID_idx` (`enrolled_studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table paymentrecord
# ------------------------------------------------------------

DROP TABLE IF EXISTS `paymentrecord`;

CREATE TABLE `paymentrecord` (
  `paymentID` int(11) NOT NULL AUTO_INCREMENT,
  `paymentRecord_studentID` int(11) NOT NULL,
  `paymentRecord_tutorID` int(11) NOT NULL,
  `paidDate` datetime NOT NULL,
  `amount` double NOT NULL,
  PRIMARY KEY (`paymentID`),
  KEY `paymentRecord_studentID_idx` (`paymentRecord_studentID`),
  KEY `paymentRecord_tutorID_idx` (`paymentRecord_tutorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table reservation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reservation`;

CREATE TABLE `reservation` (
  `reservationID` int(11) NOT NULL AUTO_INCREMENT,
  `reservation_studentID` int(11) NOT NULL,
  `reservation_tutorID` int(11) NOT NULL,
  `date` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  PRIMARY KEY (`reservationID`),
  KEY `reservation_studentID_idx` (`reservation_studentID`),
  KEY `reservation_tutorID_idx` (`reservation_tutorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table student
# ------------------------------------------------------------

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `studentID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `gender` enum('male','female','others') COLLATE utf8_unicode_ci NOT NULL,
  `educationLevel` enum('pratom','matthayomton','matthayomplai','bachelor','master','doctor') COLLATE utf8_unicode_ci NOT NULL,
  `facebookURL` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lineID` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `wantList` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `place` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time` varchar(1500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;

INSERT INTO `student` (`studentID`, `name`, `surname`, `gender`, `educationLevel`, `facebookURL`, `lineID`, `email`, `mobile`, `wantList`, `place`, `time`, `createdAt`, `updatedAt`)
VALUES
	(1,'ท็อป','ทุกวิชา','male','master',NULL,'','top@all.sbj','0100000000',NULL,NULL,NULL,'2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(2,'หญิง','งาม','female','bachelor',NULL,'','ying@ng.am','0200000000',NULL,NULL,NULL,'2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(3,'หนุ่ม','หล่อ','male','bachelor',NULL,'','num@lh.or','0300000000',NULL,NULL,NULL,'2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(4,'อริสา','คอฟฟี่','female','bachelor',NULL,'','aris@coof.ee','0400000000',NULL,NULL,NULL,'2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(5,'บอย','ซัง','male','bachelor',NULL,'','boy@s.an','0500000000',NULL,NULL,NULL,'2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(6,'ซิน','แองกูล่าร์','others','bachelor',NULL,'','sin@ngul.ar','0600000000',NULL,NULL,NULL,'2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(7,'ชา','น้ำผึ้ง','female','bachelor',NULL,'','teah@ne.y','0700000000',NULL,NULL,NULL,'2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(8,'กนก','วรรณ','female','matthayomton',NULL,'','k@nok.wan','0900000001','[{\"subject\":\"socialstudies\",\"level\":\"matthayomton\"}]','[\"สยาม\"]','[{\"day\":\"saturday\",\"time\":\"13.00-15.00\"},{\"day\":\"sunday\",\"time\":\"13.00-15.00\"}]','2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(9,'ไอซ์','ครีม','female','matthayomton',NULL,'','ice@cre.am','0900000002','[{\"subject\":\"science\",\"level\":\"matthayomton\"}]','[\"สยาม\"]','[{\"day\":\"wednesday\",\"time\":\"17.00-19.00\"}]','2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(10,'เบล','ล่า','female','matthayomplai',NULL,'','bella@email.com','0900000003','[{\"subject\":\"math\",\"level\":\"matthayomplai\"}]','[\"BTS สุรศักดิ์\"]','[{\"day\":\"saturday\",\"time\":\"13.00-15.00\"},{\"day\":\"sunday\",\"time\":\"13.00-15.00\"}]','2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(11,'ดาว','ประดับฟ้า','female','matthayomplai',NULL,'','daopr@dab.fa','0900000004','[{\"subject\":\"english\",\"level\":\"matthayomplai\"}]','[\"สยาม\"]','[{\"day\":\"sunday\",\"time\":\"10.00-12.00\"}]','2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(12,'โคนัน','เอโด','male','pratom',NULL,'','con@ne.do','0900000005','[{\"subject\":\"science\",\"level\":\"pratom\"}]','[\"BTS สุรศักดิ์\"]','[{\"day\":\"wednesday\",\"time\":\"17.00-19.00\"}]','2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(13,'พุฒิ','อินทร์บู๊ท','male','matthayomplai',NULL,'','puth@inbo.ot','0900000006','[{\"subject\":\"math\",\"level\":\"matthayomplai\"}]','[\"สยาม\"]','[{\"day\":\"saturday\",\"time\":\"10.00-12.00\"}]','2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(14,'ยิ้ม','อ่อน','male','matthayomplai',NULL,'','yim@on.com','0900000007','[{\"subject\":\"GAT\",\"level\":\"\"}]','[\"BTS สุรศักดิ์\"]','[{\"day\":\"saturday\",\"time\":\"13.00-15.00\"},{\"day\":\"sunday\",\"time\":\"13.00-15.00\"}]','2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(15,'พิมพ์','ชนก','female','matthayomton',NULL,'','pim@chan.ok','0900000008','[{\"subject\":\"science\",\"level\":\"matthayomton\"}]','[\"MRT ห้วยขวาง\"]','[{\"day\":\"saturday\",\"time\":\"10.00-12.00\"}]','2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(16,'แอนนา','โฟรซ','female','matthayomplai',NULL,'','ann@froz.en','0900000009','[{\"subject\":\"english\",\"level\":\"matthayomplai\"}]','[\"สยาม\"]','[{\"day\":\"saturday\",\"time\":\"13.00-15.00\"},{\"day\":\"sunday\",\"time\":\"13.00-15.00\"}]','2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(17,'ไทเลอร์','สวิตช์','male','matthayomplai',NULL,'','tyler@swit.ch','0900000010','[{\"subject\":\"math\",\"level\":\"matthayomplai\"}]','[\"MRT ห้วยขวาง\"]','[{\"day\":\"wednesday\",\"time\":\"17.00-19.00\"}]','2017-11-24 06:25:04','2017-11-24 06:25:04'),
	(18,'Kame','Line','male','bachelor',NULL,'','kame@email.com','0111111111',NULL,NULL,NULL,'2017-11-24 06:25:04','2017-11-24 06:25:04');

/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tutor
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tutor`;

CREATE TABLE `tutor` (
  `studentID` int(11) NOT NULL,
  `education` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `teachList` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `place` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `time` varchar(1500) COLLATE utf8_unicode_ci NOT NULL,
  `uploadEvidence` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isApproved` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`studentID`),
  CONSTRAINT `tutor_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;

INSERT INTO `tutor` (`studentID`, `education`, `teachList`, `place`, `time`, `uploadEvidence`, `isApproved`, `createdAt`, `updatedAt`)
VALUES
	(1,'[{\"level\":\"master\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"faculty\":\"วิศวกรรมศาสตร์\",\"major\":\"วิศวกรรมคอมพิวเตอร์\"}]','[{\"subject\":\"math\",\"level\":\"matthayomton\"},{\"subject\":\"math\",\"level\":\"matthayomplai\"}]','[\"สยาม\",\"ตามแนว BTS\"]','[{\"day\":\"sunday\",\"time\":\"13.00-15.00\"}]',NULL,1,'2017-11-24 06:43:40','2017-11-24 06:43:40'),
	(2,'[{\"level\":\"bachelor\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"faculty\":\"อักษรศาสตร์\",\"major\":\"ภาษาอังกฤษ\"}]','[{\"subject\":\"english\",\"level\":\"matthayomplai\"}]','[\"สยาม\"]','[{\"day\":\"saturday\",\"time\":\"10.00-12.00\"}]',NULL,1,'2017-11-24 06:43:40','2017-11-24 06:43:40'),
	(3,'[{\"level\":\"bachelor\",\"university\":\"มหาวิทยาลัยเกษตรศาสตร์\",\"faculty\":\"วิศวกรรมศาสตร์\",\"major\":\"วิศวกรรมโยธา\"}]','[{\"subject\":\"physics\",\"level\":\"matthayomplai\"}]','[\"เซ็นทรัลลาดพร้าว\"]','[{\"day\":\"saturday\",\"time\":\"13.00-15.00\"}]',NULL,1,'2017-11-24 06:43:40','2017-11-24 06:43:40'),
	(4,'[{\"level\":\"bachelor\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"faculty\":\"วิทยาศาสตร์\",\"major\":\"เคมี\"}]','[{\"subject\":\"chemistry\",\"level\":\"matthayomplai\"}]','[\"ตามแนว BTS\",\"ตามแนว MRT\"]','[{\"day\":\"wednesday\",\"time\":\"17.00-19.00\"},{\"day\":\"sunday\",\"time\":\"13.00-15.00\"}]',NULL,1,'2017-11-24 06:43:40','2017-11-24 06:43:40'),
	(5,'[{\"level\":\"bachelor\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"faculty\":\"ครุศาสตร์\",\"major\":\"ชีววิทยา\"}]','[{\"subject\":\"biology\",\"level\":\"matthayomplai\"},{\"subject\":\"science\",\"level\":\"matthayomton\"}]','[\"สยาม\"]','[{\"day\":\"tuesday\",\"time\":\"17.00-19.00\"},{\"day\":\"sunday\",\"time\":\"13.00-15.00\"}]',NULL,1,'2017-11-24 06:43:40','2017-11-24 06:43:40'),
	(6,'[{\"day\":\"tuesday\",\"time\":\"17.00-19.00\"},{\"day\":\"sunday\",\"time\":\"13.00-15.00\"}]','[{\"subject\":\"english\",\"level\":\"matthayomton\"}]','[\"สยาม\"]','[{\"day\":\"saturday\",\"time\":\"10.00-12.00\"}]',NULL,1,'2017-11-24 06:43:40','2017-11-24 06:43:40'),
	(7,'[{\"level\":\"bachelor\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"faculty\":\"รัฐศาสตร์\",\"major\":\"\"}]','[{\"subject\":\"socialstudies\",\"level\":\"matthayomton\"}, {\"subject\":\"GAT\",\"level\":\"\"}]','[\"สยาม\"]','[{\"day\":\"saturday\",\"time\":\"10.00-12.00\"},{\"day\":\"sunday\",\"time\":\"10.00-12.00\"}]',NULL,1,'2017-11-24 06:43:40','2017-11-24 06:43:40');

/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table userreport
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userreport`;

CREATE TABLE `userreport` (
  `reportID` int(11) NOT NULL AUTO_INCREMENT,
  `reporterStudentID` int(11) NOT NULL,
  `reportedStudentID` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `detail` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `reportedDate` date NOT NULL,
  `isRead` bit(1) NOT NULL,
  PRIMARY KEY (`reportID`),
  KEY `reporterStudentID_idx` (`reporterStudentID`),
  KEY `reportedStudentID_idx` (`reportedStudentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
