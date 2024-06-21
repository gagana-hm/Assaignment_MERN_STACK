-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `t_employee`
--

DROP TABLE IF EXISTS `t_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_employee` (
  `f_id` int NOT NULL AUTO_INCREMENT,
  `f_Image` varchar(45) NOT NULL,
  `f_Name` varchar(45) NOT NULL,
  `f_Email` varchar(100) NOT NULL,
  `f_Mobile` varchar(45) NOT NULL,
  `f_Designation` varchar(45) NOT NULL,
  `f_Gender` varchar(45) NOT NULL,
  `f_Course` varchar(45) NOT NULL,
  `f_Createdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`f_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_employee`
--

LOCK TABLES `t_employee` WRITE;
/*!40000 ALTER TABLE `t_employee` DISABLE KEYS */;
INSERT INTO `t_employee` VALUES (1,'./uploads/1718903442870.png','gagana','hmgaan1982@safd.com','123456712','trainee','Other','bsc','2024-06-19 22:48:55'),(2,'image_url_here','gagana','hmgaadn1982@safd.com','1234567128','mba','male','bsc','2024-06-19 22:50:23'),(3,'image_url_here','John Doe','john.doe@example.com','1234567890','Manager','Male','Computer Science','2024-06-19 23:16:54'),(4,'uploads/1718918439741-643250410.jpg','John Doe','jon.doe@example.com','23453478912','Manager','Male','Computer Science','2024-06-19 23:17:54'),(5,'gagana','John Doe','jon.doe@example.com','23453478912','Manager','Male','Computer Science','2024-06-19 23:18:31'),(6,'gagana','John Doe','jon.doe@example.com','23453478912','Manager','Male','Computer Science','2024-06-19 23:18:48'),(7,'gagana','John Doe','jon.doe@example.com','23453478912','Manager','Male','Computer Science','2024-06-19 23:23:28'),(8,'gagana','John Doe','jon.doe@example.com','23453478912','Manager','Male','Computer Science','2024-06-19 23:23:36'),(9,'123abc','ABC','abc12@example.com','12323122','intern','Male','Computer Science','2024-06-19 23:37:05'),(10,'uploads\\1718884561209.jpg','gagana',' 234a@gmail.com',' 123456789',' trainee','Female',' be','2024-06-20 17:26:01'),(11,'uploads\\1718903210824.jpg','gagana1','gang234dfsda@gmail.com','1234567878',' trainee','Female',' bsc','2024-06-20 22:36:50'),(12,'uploads\\1718918772444-651336721.jpg','GAGANA H M','hmgagana4@gmail.com','8105058378','hr','M','MCA','2024-06-21 02:56:12'),(13,'uploads\\1718919160248-104578671.jpg','GAGANA H M','hmgagana4@gaail.com','8105058371','hr','M','MCA','2024-06-21 03:02:40');
/*!40000 ALTER TABLE `t_employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21 12:30:10
