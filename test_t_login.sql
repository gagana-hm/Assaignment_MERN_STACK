
--

DROP TABLE IF EXISTS `t_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_login` (
  `f_sno` int NOT NULL AUTO_INCREMENT,
  `f_userName` varchar(45) NOT NULL,
  `f_Pwd` varchar(45) NOT NULL,
  PRIMARY KEY (`f_sno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_login`
--

INSERT INTO `t_login` VALUES (1,'gagana','gagana@123');
