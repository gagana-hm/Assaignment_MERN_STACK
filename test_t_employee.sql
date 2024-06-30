

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_employee`
--

LOCK TABLES `t_employee` WRITE;
/*!40000 ALTER TABLE `t_employee` DISABLE KEYS */;
INSERT INTO `t_employee` VALUES (11,'uploads\\1718903210824.jpg','gagana1','gang234dfsda@gmail.com','1234567878',' trainee','Female',' bsc','2024-06-20 22:36:50'),(13,'uploads\\1718919160248-104578671.jpg','GAGANA H M','hmgagana4@gaail.com','8105058371','hr','M','BSC','2024-06-21 03:02:40'),(14,'uploads\\1718956420115-239491213.png','Gagana','abc@xyz.com','123456789','manager','F','BCA','2024-06-21 13:23:40'),(15,'uploads\\1718957005385-676074644.png','Abc','abc@123.com','1234567856','hr','F','BSC','2024-06-21 13:33:25'),(16,'uploads\\1719638917790-932023230.png','abc','axv@gmail.com','123457777','hr','F','BCA','2024-06-29 10:58:37'),(17,'uploads\\1719640397435-109720668.png','abc','asv@gmail.com','1234577723','hr','F','MCA','2024-06-29 11:23:17'),(18,'uploads\\1719640418458-123463311.png','abcw','aqv@gmail.com','1234577721','hr','F','BSC','2024-06-29 11:23:38'),(19,'uploads\\1719640490625-437693801.png','ss','abc@11.com','12345837','hr','F','MCA','2024-06-29 11:24:50'),(20,'uploads\\1719641990594-378402009.png','ss','bc@11.com','123458371','hr','F','BCA','2024-06-29 11:49:50'),(21,'uploads\\1719644650620-197592851.png','aaa','afc@gmail.com','3123555737','manager','M','MCA','2024-06-29 12:34:10'),(22,'uploads\\1719646236752-707313651.png','abc','afg@gmail.com','4567892992','hr','M','M,C,A,BCA,BSC','2024-06-29 13:00:36'),(23,'uploads\\1719648197367-176195359.png','123','123ggg@gmail.com','267383944','manager','M','BCA','2024-06-29 13:33:17'),(24,'uploads\\1719649250026-872353691.png','gagana','def@gmail.com','6789374634','manager','F','MCA,BCA','2024-06-29 13:50:50'),(25,'uploads\\1719649269246-994871564.png','gaganawe','deff@gmail.com','6789374655','manager','F','MCA,BCA','2024-06-29 13:51:09'),(26,'uploads\\1719649412250-34073610.png','Xyz','abc@xyza.com','6783456789','hr','M','MCA','2024-06-29 13:53:32'),(31,'uploads\\1719657001707-205376901.png','Gagana','sfg@123.com','5667335778','hr','M','MCA,BCA','2024-06-29 16:00:01');
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

-- Dump completed on 2024-06-30 23:45:43
