CREATE DATABASE  IF NOT EXISTS `triatlo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `triatlo`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: triatlo
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tempos`
--

DROP TABLE IF EXISTS `tempos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tempos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `TipoID` int DEFAULT NULL,
  `NatacaoHoras` int DEFAULT NULL,
  `NatacaoMinutos` int DEFAULT NULL,
  `NatacaoSegundos` int DEFAULT NULL,
  `T1Horas` int DEFAULT NULL,
  `T1Minutos` int DEFAULT NULL,
  `T1Segundos` int DEFAULT NULL,
  `CiclismoHoras` int DEFAULT NULL,
  `CiclismoMinutos` int DEFAULT NULL,
  `CiclismoSegundos` int DEFAULT NULL,
  `T2Horas` int DEFAULT NULL,
  `T2Minutos` int DEFAULT NULL,
  `T2Segundos` int DEFAULT NULL,
  `CorridaHoras` int DEFAULT NULL,
  `CorridaMinutos` int DEFAULT NULL,
  `CorridaSegundos` int DEFAULT NULL,
  `Total` time DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `TipoID` (`TipoID`),
  CONSTRAINT `tempos_ibfk_1` FOREIGN KEY (`TipoID`) REFERENCES `triatlos` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempos`
--

LOCK TABLES `tempos` WRITE;
/*!40000 ALTER TABLE `tempos` DISABLE KEYS */;
INSERT INTO `tempos` VALUES (1,'Teste 1',1,0,12,30,0,1,0,0,35,20,0,0,45,0,18,45,'01:08:20'),(2,'Teste 2',1,0,13,45,0,1,10,0,36,15,0,1,0,0,19,10,'01:11:20'),(3,'Teste 3',1,0,11,50,0,1,15,0,34,55,0,0,50,0,18,30,'01:07:20'),(4,'Teste 4',2,0,25,0,0,2,0,1,15,30,0,1,30,0,45,20,'02:31:20'),(5,'Teste 5',2,0,26,10,0,2,10,1,16,45,0,1,40,0,46,10,'02:35:55'),(6,'Teste 6',2,0,24,50,0,1,50,1,14,55,0,1,20,0,44,30,'02:28:25'),(7,'Teste 7',3,0,50,20,0,3,0,2,10,10,0,2,30,1,30,15,'04:16:15'),(8,'Teste 8',3,0,52,35,0,2,50,2,11,25,0,2,20,1,32,40,'04:24:50'),(9,'Teste 9',3,0,49,45,0,3,10,2,9,50,0,2,15,1,29,30,'04:14:30'),(10,'Teste 10',4,1,20,40,0,4,0,3,40,30,0,3,30,3,0,50,'12:09:30'),(11,'Teste 11',4,1,22,55,0,4,10,3,45,15,0,3,40,3,5,10,'12:22:10'),(12,'Teste 12',4,1,19,30,0,3,50,3,38,45,0,3,20,2,58,25,'12:03:50');
/*!40000 ALTER TABLE `tempos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `triatlos`
--

DROP TABLE IF EXISTS `triatlos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `triatlos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `triatlos`
--

LOCK TABLES `triatlos` WRITE;
/*!40000 ALTER TABLE `triatlos` DISABLE KEYS */;
INSERT INTO `triatlos` VALUES (1,'Sprint'),(2,'Olímpico'),(3,'Meio Ironman'),(4,'Ironman');
/*!40000 ALTER TABLE `triatlos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-30 21:20:09
