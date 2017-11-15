-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: tutorium
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
  `account_studentID` int(11) NOT NULL AUTO_INCREMENT,
  `accountType` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `accountID` varchar(200) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`account_studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
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
  `password` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `attendanceID` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `attendance_studentID` int(11) NOT NULL,
  `attendance_tutorID` int(11) NOT NULL,
  PRIMARY KEY (`attendanceID`),
  KEY `studentID_idx` (`attendance_studentID`),
  KEY `tutorID_idx` (`attendance_tutorID`),
  CONSTRAINT `attendance_studentID` FOREIGN KEY (`attendance_studentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `attendance_tutorID` FOREIGN KEY (`attendance_tutorID`) REFERENCES `tutor` (`tutorID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankaccount`
--

DROP TABLE IF EXISTS `bankaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bankaccount` (
  `bankAccount_studentID` int(11) NOT NULL,
  `bankaccountNo` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`bankaccountNo`,`bankAccount_studentID`),
  KEY `bankAccount_studentID` (`bankAccount_studentID`),
  CONSTRAINT `bankAccount_studentID` FOREIGN KEY (`bankAccount_studentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccount`
--

LOCK TABLES `bankaccount` WRITE;
/*!40000 ALTER TABLE `bankaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `bankaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankaccountpayment`
--

DROP TABLE IF EXISTS `bankaccountpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bankaccountpayment` (
  `bankAccountPayment_paymentID` int(11) NOT NULL,
  `bankAccountNo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`bankAccountPayment_paymentID`),
  CONSTRAINT `bankAccountPayment_paymentID` FOREIGN KEY (`bankAccountPayment_paymentID`) REFERENCES `paymentrecord` (`paymentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccountpayment`
--

LOCK TABLES `bankaccountpayment` WRITE;
/*!40000 ALTER TABLE `bankaccountpayment` DISABLE KEYS */;
/*!40000 ALTER TABLE `bankaccountpayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact` (
  `contact_studentID` int(11) NOT NULL,
  `phone` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `LineID` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FacebookURL` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`contact_studentID`),
  CONSTRAINT `contact_studentID` FOREIGN KEY (`contact_studentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  KEY `course_tutorID_idx` (`course_tutorID`),
  CONSTRAINT `course_tutorID` FOREIGN KEY (`course_tutorID`) REFERENCES `tutor` (`tutorID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courserequest`
--

DROP TABLE IF EXISTS `courserequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courserequest` (
  `requestID` int(11) NOT NULL AUTO_INCREMENT,
  `courseRequest_studentID` int(11) NOT NULL,
  `courseRequest_tutorID` int(11) NOT NULL,
  `Subject` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `level` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`requestID`),
  KEY `courseRequest_studentID_idx` (`courseRequest_studentID`),
  KEY `courseRequest_tutorID_idx` (`courseRequest_tutorID`),
  CONSTRAINT `courseRequest_studentID` FOREIGN KEY (`courseRequest_studentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `courseRequest_tutorID` FOREIGN KEY (`courseRequest_tutorID`) REFERENCES `tutor` (`tutorID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courserequest`
--

LOCK TABLES `courserequest` WRITE;
/*!40000 ALTER TABLE `courserequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `courserequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditcard`
--

DROP TABLE IF EXISTS `creditcard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creditcard` (
  `creditCard_studentID` int(11) NOT NULL,
  `cardNo` int(11) NOT NULL AUTO_INCREMENT,
  `expireDate` date NOT NULL,
  `secureCode` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`cardNo`,`creditCard_studentID`),
  KEY `creditCard_studentID` (`creditCard_studentID`),
  CONSTRAINT `creditCard_studentID` FOREIGN KEY (`creditCard_studentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditcard`
--

LOCK TABLES `creditcard` WRITE;
/*!40000 ALTER TABLE `creditcard` DISABLE KEYS */;
/*!40000 ALTER TABLE `creditcard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditcardpayment`
--

DROP TABLE IF EXISTS `creditcardpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creditcardpayment` (
  `creditCardPayment_paymentID` int(11) NOT NULL,
  `creditCardNo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`creditCardPayment_paymentID`),
  CONSTRAINT `creditCardPayment_paymentID` FOREIGN KEY (`creditCardPayment_paymentID`) REFERENCES `paymentrecord` (`paymentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditcardpayment`
--

LOCK TABLES `creditcardpayment` WRITE;
/*!40000 ALTER TABLE `creditcardpayment` DISABLE KEYS */;
/*!40000 ALTER TABLE `creditcardpayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `education` (
  `educationID` int(11) NOT NULL AUTO_INCREMENT,
  `education_tutorID` int(11) NOT NULL,
  `schoolName` varchar(100) NOT NULL,
  `faculty` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `grade` varchar(20) NOT NULL,
  `gpax` double NOT NULL,
  `info` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`educationID`),
  KEY `education_studentID_idx` (`education_tutorID`),
  CONSTRAINT `education_studentID` FOREIGN KEY (`education_tutorID`) REFERENCES `tutor` (`tutorID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrolled`
--

DROP TABLE IF EXISTS `enrolled`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enrolled` (
  `enrolled_courseID` int(11) NOT NULL,
  `enrolled_studentID` int(11) NOT NULL,
  PRIMARY KEY (`enrolled_courseID`,`enrolled_studentID`),
  KEY `enrolled_studentID_idx` (`enrolled_studentID`),
  CONSTRAINT `enrolled_courseID` FOREIGN KEY (`enrolled_courseID`) REFERENCES `course` (`couseID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `enrolled_studentID` FOREIGN KEY (`enrolled_studentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrolled`
--

LOCK TABLES `enrolled` WRITE;
/*!40000 ALTER TABLE `enrolled` DISABLE KEYS */;
/*!40000 ALTER TABLE `enrolled` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentrecord`
--

DROP TABLE IF EXISTS `paymentrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentrecord` (
  `paymentID` int(11) NOT NULL AUTO_INCREMENT,
  `paymentRecord_studentID` int(11) NOT NULL,
  `paymentRecord_tutorID` int(11) NOT NULL,
  `paidDate` datetime NOT NULL,
  `amount` double NOT NULL,
  PRIMARY KEY (`paymentID`),
  KEY `paymentRecord_studentID_idx` (`paymentRecord_studentID`),
  KEY `paymentRecord_tutorID_idx` (`paymentRecord_tutorID`),
  CONSTRAINT `paymentRecord_studentID` FOREIGN KEY (`paymentRecord_studentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `paymentRecord_tutorID` FOREIGN KEY (`paymentRecord_tutorID`) REFERENCES `tutor` (`tutorID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentrecord`
--

LOCK TABLES `paymentrecord` WRITE;
/*!40000 ALTER TABLE `paymentrecord` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservation` (
  `reservationID` int(11) NOT NULL AUTO_INCREMENT,
  `reservation_studentID` int(11) NOT NULL,
  `reservation_tutorID` int(11) NOT NULL,
  `date` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  PRIMARY KEY (`reservationID`),
  KEY `reservation_studentID_idx` (`reservation_studentID`),
  KEY `reservation_tutorID_idx` (`reservation_tutorID`),
  CONSTRAINT `reservation_studentID` FOREIGN KEY (`reservation_studentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `reservation_tutorID` FOREIGN KEY (`reservation_tutorID`) REFERENCES `tutor` (`tutorID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `studentID` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `gender` enum('male','female','others') COLLATE utf8_unicode_ci NOT NULL,
  `educationLevel` enum('pratom','matthayomton','matthayomplai','bachelor','master','doctor') COLLATE utf8_unicode_ci NOT NULL,
  `facebookURL` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lineID` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teaching`
--

DROP TABLE IF EXISTS `teaching`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teaching` (
  `teaching_tutorID` int(11) NOT NULL,
  `subject` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `level` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`teaching_tutorID`,`subject`,`level`),
  CONSTRAINT `teaching_tutorID` FOREIGN KEY (`teaching_tutorID`) REFERENCES `tutor` (`tutorID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teaching`
--

LOCK TABLES `teaching` WRITE;
/*!40000 ALTER TABLE `teaching` DISABLE KEYS */;
/*!40000 ALTER TABLE `teaching` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor`
--

DROP TABLE IF EXISTS `tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutor` (
  `tutor_studentID` int(11) NOT NULL,
  `tutorID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`tutorID`),
  KEY `tutor_studentID` (`tutor_studentID`),
  CONSTRAINT `tutor_studentID` FOREIGN KEY (`tutor_studentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
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
  KEY `reportedStudentID_idx` (`reportedStudentID`),
  CONSTRAINT `reportedStudentID` FOREIGN KEY (`reportedStudentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `reporterStudentID` FOREIGN KEY (`reporterStudentID`) REFERENCES `student` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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

-- Dump completed on 2017-11-15 21:36:47
