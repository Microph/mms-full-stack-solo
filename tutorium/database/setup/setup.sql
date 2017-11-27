-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: tutorium
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (20,'facebook','107701540010684',0,'2017-11-27 16:52:41','2017-11-27 16:52:41'),(21,'facebook','110434556403380',0,'2017-11-27 17:02:29','2017-11-27 17:02:29'),(22,'facebook','113813989397748',0,'2017-11-27 17:05:29','2017-11-27 17:05:29'),(23,'facebook','115803282531362',0,'2017-11-27 17:10:24','2017-11-27 17:10:24'),(24,'facebook','104215220360075',0,'2017-11-27 17:13:39','2017-11-27 17:13:39'),(25,'facebook','105288240252650',0,'2017-11-27 17:21:14','2017-11-27 17:21:14'),(26,'facebook','105218696926268',0,'2017-11-27 17:25:31','2017-11-27 17:25:31'),(27,'facebook','109594286487721',0,'2017-11-27 17:28:59','2017-11-27 17:28:59'),(28,'facebook','107675473347169',0,'2017-11-27 17:36:47','2017-11-27 17:36:47'),(29,'facebook','112112329568864',0,'2017-11-27 17:38:43','2017-11-27 17:38:43'),(30,'facebook','120817842029069',0,'2017-11-27 17:40:05','2017-11-27 17:40:05'),(31,'facebook','124916018285571',0,'2017-11-27 17:41:12','2017-11-27 17:41:12'),(32,'facebook','103339857115329',0,'2017-11-27 17:43:12','2017-11-27 17:43:12'),(33,'facebook','106095683505318',0,'2017-11-27 17:45:17','2017-11-27 17:45:17'),(34,'facebook','107860986661856',0,'2017-11-27 17:46:58','2017-11-27 17:46:58');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('tutorium','8f7dd0890f92a2b12497f2009ac7bab80e9110898d45a281c0221adf66168c2b','2017-11-24 06:38:59','2017-11-24 06:38:59');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditCard`
--

DROP TABLE IF EXISTS `creditCard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creditCard` (
  `studentID` int(11) NOT NULL,
  `cardNO` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `cardHolder` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `CVV` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `expireMonth` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `expireYear` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`studentID`,`cardNO`),
  CONSTRAINT `creditCard_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditCard`
--

LOCK TABLES `creditCard` WRITE;
/*!40000 ALTER TABLE `creditCard` DISABLE KEYS */;
INSERT INTO `creditCard` VALUES (20,'4502747615243334','Top Ofall','987','03','18','2017-11-27 16:57:25','2017-11-27 16:57:25');
/*!40000 ALTER TABLE `creditCard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match` (
  `studentID` int(11) NOT NULL,
  `tutorID` int(11) NOT NULL,
  `subject` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) DEFAULT '0',
  `studentConfirm` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`studentID`,`tutorID`,`subject`),
  KEY `tutorID` (`tutorID`),
  CONSTRAINT `match_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `match_ibfk_2` FOREIGN KEY (`tutorID`) REFERENCES `tutor` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `reportID` int(11) NOT NULL AUTO_INCREMENT,
  `reporterStudentID` int(11) NOT NULL,
  `reportedStudentID` int(11) DEFAULT NULL,
  `topic` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `detail` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `studentID` int(11) DEFAULT NULL,
  PRIMARY KEY (`reportID`),
  KEY `studentID` (`studentID`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (20,'ท็อป','ทุกวิชา','male','bachelor',NULL,'','top@all.sbj','0800000001',NULL,NULL,NULL,'2017-11-27 16:52:41','2017-11-27 16:52:41'),(21,'ณัฐ','มล','female','bachelor',NULL,'','nat@mol.com','0800000002',NULL,NULL,NULL,'2017-11-27 17:02:29','2017-11-27 17:02:29'),(22,'เก่ง','ทุกทาง','male','bachelor',NULL,'','keng@llthe.way','0800000003',NULL,NULL,NULL,'2017-11-27 17:05:29','2017-11-27 17:05:29'),(23,'น้ำฟ้า','ญาณิศา','female','bachelor',NULL,'','namfa@email.com','0800000004',NULL,NULL,NULL,'2017-11-27 17:10:24','2017-11-27 17:10:24'),(24,'ติวเตอร์','พี่บอล','male','bachelor',NULL,'','tutorball@email.com','0800000005',NULL,NULL,NULL,'2017-11-27 17:13:39','2017-11-27 17:13:39'),(25,'จงโจ','อย่างภาคภูมิ','male','bachelor',NULL,'','joe@soproud.com','0800000006',NULL,NULL,NULL,'2017-11-27 17:21:14','2017-11-27 17:21:14'),(26,'นิว','วรรณศิริ','female','bachelor',NULL,'','neo-wan@email.com','0800000007',NULL,NULL,NULL,'2017-11-27 17:25:31','2017-11-27 17:25:31'),(27,'ไอติม','พิชชา','female','matthayomton',NULL,'','ice@cream.piz','0900000001','[{\"subject\":\"thai\",\"level\":\"matthayomton\"}]','[\"BTS ศาลาแดง\"]','[{\"day\":\"saturday\",\"time\":\"09:00-12:00\"}]','2017-11-27 17:28:59','2017-11-27 17:28:59'),(28,'กนกพร','อยู่ดี','female','matthayomplai',NULL,'','kanokp@email.com','0900000002','[{\"subject\":\"biology\",\"level\":\"matthayomplai\"}]','[\"สยาม\"]','[{\"day\":\"saturday\",\"time\":\"09:00-12:00\"}]','2017-11-27 17:36:47','2017-11-27 17:36:47'),(29,'อัญชิสา','มงคลสุข','female','matthayomplai',NULL,'','anchisa.m@email.com','0900000003','[{\"subject\":\"english\",\"level\":\"matthayomplai\"},{\"subject\":\"math\",\"level\":\"matthayomplai\"}]','[\"MRT ห้วยขวาง\"]','[{\"day\":\"saturday\",\"time\":\"13:00-15:00\"}]','2017-11-27 17:38:43','2017-11-27 17:38:43'),(30,'จีน','เกรย์','female','matthayomton',NULL,'','gyne@grey.com','0900000004','[{\"subject\":\"english\",\"level\":\"matthayomton\"},{\"subject\":\"math\",\"level\":\"matthayomton\"}]','[\"สยาม\"]','[{\"day\":\"saturday\",\"time\":\"09:00-12:00\"}]','2017-11-27 17:40:05','2017-11-27 17:40:05'),(31,'ลูซ','เบนซิน','male','matthayomplai',NULL,'','louze@ben.sin','0900000005','[{\"subject\":\"english\",\"level\":\"matthayomplai\"},{\"subject\":\"math\",\"level\":\"matthayomplai\"}]','[\"MRT สีลม\"]','[{\"day\":\"tuesday\",\"time\":\"17:30-20:00\"}]','2017-11-27 17:41:12','2017-11-27 17:41:12'),(32,'วิน','โด้ว','male','matthayomplai',NULL,'','wind.ow@email.com','0900000006','[{\"subject\":\"physics\",\"level\":\"matthayomplai\"}]','[\"สยาม\"]','[{\"day\":\"thursday\",\"time\":\"17:00-19:00\"}]','2017-11-27 17:43:12','2017-11-27 17:43:12'),(33,'โนบิ','โนบิตะ','male','pratom',NULL,'','nobita@dorae.mon','0900000007','[{\"subject\":\"socialstudies\",\"level\":\"pratom\"},{\"subject\":\"math\",\"level\":\"pratom\"}]','[\"MRT ศูนย์วัฒนธรรม\"]','[{\"day\":\"sunday\",\"time\":\"13:00-15:00\"}]','2017-11-27 17:45:17','2017-11-27 17:45:17'),(34,'แซนด์','แพน','female','matthayomton',NULL,'','sandy@email.com','0900000008','[{\"subject\":\"science\",\"level\":\"matthayomton\"}]','[\"สยาม\"]','[{\"day\":\"saturday\",\"time\":\"13:00-15:00\"}]','2017-11-27 17:46:58','2017-11-27 17:46:58');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suspended`
--

DROP TABLE IF EXISTS `suspended`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suspended` (
  `studentID` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`studentID`),
  CONSTRAINT `suspended_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suspended`
--

LOCK TABLES `suspended` WRITE;
/*!40000 ALTER TABLE `suspended` DISABLE KEYS */;
/*!40000 ALTER TABLE `suspended` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor`
--

DROP TABLE IF EXISTS `tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
INSERT INTO `tutor` VALUES (20,'[{\"level\":\"bachelor\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"gradyear\":\"2559\",\"faculty\":\"วิศวกรรมศาสตร์\",\"major\":\"วิศวกรรมคอมพิวเตอร์\"}]','[{\"subject\":\"math\",\"level\":\"matthayomton\"},{\"subject\":\"math\",\"level\":\"matthayomplai\"}]','[\"สยาม\",\"สีลม\"]','[{\"day\":\"saturday\",\"time\":\"13:00-15:00\"},{\"day\":\"sunday\",\"time\":\"13:00-15:00\"}]',NULL,0,'2017-11-27 16:57:32','2017-11-27 16:57:32'),(21,'[{\"level\":\"bachelor\",\"university\":\"เกษตรศาสตร์\",\"gradyear\":\"2558\",\"faculty\":\"มนุษยศาสตร์,\"major\":\"ภาษาญี่ปุ่น\"}]','[{\"subject\":\"english\",\"level\":\"matthayomton\"}]','[\"ลาดพร้าว\"]','[{\"day\":\"saturday\",\"time\":\"09:00-12:00\"}]',NULL,0,'2017-11-27 17:04:18','2017-11-27 17:04:18'),(22,'[{\"level\":\"bachelor\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"gradyear\":\"2562\",\"faculty\":\"วิทยาศาสตร์\",\"major\":\"เคมี\"}]','[{\"subject\":\"science\",\"level\":\"matthayomton\"},{\"subject\":\"chemistry\",\"level\":\"matthayomplai\"},{\"subject\":\"physics\",\"level\":\"matthayomplai\"}]','[\"ตามแนว BTS\"]','[{\"day\":\"sunday\",\"time\":\"10:00-12:00\"}]',NULL,0,'2017-11-27 17:08:39','2017-11-27 17:08:39'),(23,'[{\"level\":\"bachelor\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"gradyear\":\"2562\",\"faculty\":\"เภสัชศาสตร์\",\"major\":\"\"}]','[{\"subject\":\"biology\",\"level\":\"matthayomplai\"},{\"subject\":\"science\",\"level\":\"pratom\"}]','[\"สยาม\"]','[{\"day\":\"thursday\",\"time\":\"17:00-19:00\"}]',NULL,0,'2017-11-27 17:12:18','2017-11-27 17:12:18'),(24,'[{\"level\":\"bachelor\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"gradyear\":\"2560\",\"faculty\":\"อักษรศาสตร์\",\"major\":\"ภูมิศาสตร์\"}]','[{\"subject\":\"thai\",\"level\":\"matthayomplai\"},{\"subject\":\"socialstudies\",\"level\":\"matthayomplai\"},{\"subject\":\"english\",\"level\":\"matthayomplai\"}]','[\"ตามแนว MRT\"]','[{\"day\":\"tuesday\",\"time\":\"17:00-19:30\"},{\"day\":\"saturday\",\"time\":\"13:00-16:30\"}]',NULL,0,'2017-11-27 17:16:24','2017-11-27 17:16:24'),(25,'[{\"level\":\"bachelor\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"gradyear\":\"2562\",\"faculty\":\"วิศวกรรมศาสตร์\",\"major\":\"วิศวกรรมคอมพิวเตอร์\"}]','[{\"subject\":\"math\",\"level\":\"pratom\"},{\"subject\":\"science\",\"level\":\"pratom\"},{\"subject\":\"math\",\"level\":\"matthayomton\"}]','[\"ตามแนว BTS\",\"ตามแนว MRT\"]','[{\"day\":\"saturday\",\"time\":\"09:30-12:00\"},{\"day\":\"sunday\",\"time\":\"09:30-12:00\"}]',NULL,0,'2017-11-27 17:23:33','2017-11-27 17:23:33'),(26,'[{\"level\":\"bachelor\",\"university\":\"จุฬาลงกรณ์มหาวิทยาลัย\",\"gradyear\":\"2561\",\"faculty\":\"เศรษฐศาสตร์\",\"major\":\"\"}]','[{\"subject\":\"socialstudies\",\"level\":\"matthayomton\"},{\"subject\":\"math\",\"level\":\"matthayomplai\"}]','[\"ตามแนว BTS\"]','[{\"day\":\"saturday\",\"time\":\"15:00-17:00\"},{\"day\":\"sunday\",\"time\":\"13:00-15:00\"}]',NULL,0,'2017-11-27 17:27:39','2017-11-27 17:27:39');
/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorRequest`
--

DROP TABLE IF EXISTS `tutorRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutorRequest` (
  `studentID` int(11) NOT NULL,
  `tutorID` int(11) NOT NULL,
  `subject` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`studentID`,`tutorID`,`subject`),
  KEY `tutorID` (`tutorID`),
  CONSTRAINT `tutorRequest_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tutorRequest_ibfk_2` FOREIGN KEY (`tutorID`) REFERENCES `tutor` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorRequest`
--

LOCK TABLES `tutorRequest` WRITE;
/*!40000 ALTER TABLE `tutorRequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutorRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userreport`
--

DROP TABLE IF EXISTS `userreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userreport`
--

LOCK TABLES `userreport` WRITE;
/*!40000 ALTER TABLE `userreport` DISABLE KEYS */;
/*!40000 ALTER TABLE `userreport` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-28  1:01:07
