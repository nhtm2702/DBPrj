-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: br
-- ------------------------------------------------------
-- Server version	8.0.23

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


CREATE DATABASE /*!32312 IF NOT EXISTS*/`br` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `br`;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `idCategory` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) NOT NULL,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4  COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Môi'),(2,'Mặt'),(3,'Mắt');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `idOrder` varchar(255) NOT NULL,
  `idProduct` int NOT NULL,
  `priceEach` int NOT NULL,
  `quantityOrder` int NOT NULL,
  PRIMARY KEY (`idOrder`,`idProduct`),
  KEY `idProduct` (`idProduct`),
  CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`idOrder`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`idProduct`) REFERENCES `products` (`idProduct`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4  COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES 
(10100,1,194000,1),
(10101,2,209000,2),
(10102,35,207000,2),
(10103,21,448000,1),
(10104,4,209000,1),
(10105,6,280000,1),
(10106,12,209000,1),
(10107,7,207000,2),
(10108,36,209000,1),
(10109,22,182000,1),
(10110,24,233000,1),
(10111,8,207000,1),
(10112,3,209000,1),
(10113,1,194000,1),
(10114,22,182000,1),
(10115,24,233000,1);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `idOrder` varchar(255) NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `orderDate` date NOT NULL,
  `status` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `shippedDate` date NOT NULL,
  `address` varchar(255) NOT NULL,
  `shippingPrice` decimal(10,2) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `idUser` int NOT NULL,
  PRIMARY KEY (`idOrder`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4  COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES 
(10100,'Nguyen Huynh Tra My','2021-08-10','Đã giao','0328919372','2021-08-15','3 Phuc Yen, Vinh Phuc',20000,'Tiền mặt',1),
(10101,'Nguyen Huynh Tra My','2021-08-20','Đã giao','0328919372','2021-08-25','3 Phuc Yen, Vinh Phuc',20000,'Tiền mặt',1),
(10102,'Hoang Phuong Thao','2021-08-24','Đã giao','0328762341','2021-12-29','10 Binh Xuyen, Vinh Phuc',20000,'Tiền mặt',2),
(10103,'Be Phuong Thao','2021-09-02','Đã giao','0912325674','2021-09-07','8 Thanh pho Cao Bang',30000,'Tiền mặt',3),
(10104,'Nguyen Thi Van Anh','2021-09-10','Đã giao','0945273918','2021-09-15','8 Luc Yen, Nghe An',30000,'Tiền mặt',4),
(10105,'Nguyen Dieu Quynh','2021-09-24','Đã giao','0328349273','2021-09-29','10 Tran Quoc Hoan, Ha Noi',10000,'Tiền mặt',5),
(10106,'Nguyen Thi Huong','2021-09-24','Đã giao','0320198234','2021-09-29','12 Pham Van Dong, Ha Noi',10000,'Tiền mặt',6),
(10107,'Nguyen Thi Thu Phuong','2021-10-10','Đã giao','0321283847','2021-10-15','12 Phuc Yen, Vinh Phuc',20000,'Tiền mặt',7),
(10108,'Nguyen Thi Thu Phuong','2021-10-12','Đã giao','0321283847','2021-10-17','12 Phuc Yen, Vinh Phuc',20000,'Tiền mặt',7),
(10109,'Nguyen Ngoc Huyen','2021-10-15','Đã giao','0964726384','2021-10-20','3 Luc Yen, Nghe An',30000,'Tiền mặt',8),
(10110,'Nguyen Ngoc Huyen','2021-10-15','Đã giao','0964726384','2021-12-20','3 Luc Yen, Nghe An',30000,'Tiền mặt',8),
(10111,'Duong Bao Ngoc','2021-10-20','Đã giao','0337283984','2021-10-25','96 Phuc Yen, Vinh Phuc',20000,'Tiền mặt',9),
(10112,'Duong Bao Ngoc','2021-10-20','Đã giao','0337283984','2021-10-25','96 Phuc Yen, Vinh Phuc',20000,'Tiền mặt',9),
(10113,'Huynh Thao Linh','2021-11-12','Đã giao','0326472838','2021-11-17','3 Ton That Thuyet, Ha Noi',10000,'Tiền mặt',10),
(10114,'Tran Diem Quynh','2021-11-27','Đã giao','0984627384','2021-12-01','8 Ton That Thuyet, Ha Noi',10000,'Tiền mặt',11),
(10115,'Tran Ha My','2021-12-10','Đã giao','0648281927','2021-12-15','3 Minh Tri, Xuan Hoa',20000,'Tiền mặt',12);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productdetail`
--

DROP TABLE IF EXISTS `productdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productdetail` (
  `idImage` int NOT NULL AUTO_INCREMENT,
  `idProduct` int NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`idImage`,`idProduct`),
  KEY `idProduct` (`idProduct`),
  CONSTRAINT `productdetail_ibfk_1` FOREIGN KEY (`idProduct`) REFERENCES `products` (`idProduct`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4  COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productdetail`
--

LOCK TABLES `productdetail` WRITE;
/*!40000 ALTER TABLE `productdetail` DISABLE KEYS */;
INSERT INTO `productdetail` VALUES 
(1,1,'..//../image/Product/lips/lip1.jpg'),
(2,2,'..//../image/Product/lips/lip2.png'),
(3,3,'..//../image/Product/lips/lip3.png'),
(4,4,'..//../image/Product/lips/lip4.jpg'),
(5,5,'..//../image/Product/lips/lip5.jpg'),
(6,6,'..//../image/Product/eyes/eyes10.jpg'),
(7,7,'..//../image/Product/eyes/eyes8.png'),
(8,8,'..//../image/Product/eyes/eyes2.png'),
(9,9,'..//../image/Product/face/face5.jpg'),
(10,10,'..//../image/Product/eyes/eyes6.png'),
(11,11,'..//../image/Product/lips/lip11.jpg'),
(12,12,'..//../image/Product/lips/lip12.jpg'),
(13,13,'..//../image/Product/lips/lip13.jpg'),
(14,14,'..//../image/Product/lips/lip14.png'),
(15,15,'..//../image/Product/lips/lip15.png'),
(16,16,'..//../image/Product/lips/lip16.png'),
(17,17,'..//../image/Product/lips/lip17.png'),
(18,18,'..//../image/Product/lips/lip18.png'),
(19,19,'..//../image/Product/lips/lip19.png'),
(20,20,'..//../image/Product/lips/lip6.png'),
(21,21,'..//../image/Product/face/face1.png'),
(22,22,'..//../image/Product/face/face2.png'),
(23,23,'..//../image/Product/face/face3.jpg'),
(24,24,'..//../image/Product/face/face4.png'),
(25,25,'..//../image/Product/lips/lip7.png'),
(26,26,'..//../image/Product/face/face6.jpg'),
(27,27,'..//../image/Product/eyes/eyes1.png'),
(28,28,'..//../image/Product/lips/lip8.jpg'),
(29,29,'..//../image/Product/eyes/eyes3.png'),
(30,30,'..//../image/Product/eyes/eyes4.jpg'),
(31,31,'..//../image/Product/eyes/eyes5.jpg'),
(32,32,'..//../image/Product/lips/lip20.png'),
(33,33,'..//../image/Product/eyes/eyes7.png'),
(34,34,'..//../image/Product/lips/lip9.png'),
(35,35,'..//../image/Product/eyes/eyes9.png'),
(36,36,'..//../image/Product/lips/lip10.png');
/*!40000 ALTER TABLE `productdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `idProduct` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL,
  `productPrice` int NOT NULL,
  `productDescription` text NOT NULL,
  `quantityInStock` int NOT NULL,
  `idCategory` int NOT NULL,
  PRIMARY KEY (`idProduct`),
  KEY `idCategory` (`idCategory`),
  FULLTEXT KEY `productName` (`productName`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`idCategory`) REFERENCES `categories` (`idCategory`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4  COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES 
(1,'Son Kem Lì Black Rouge Half N Half Water Vetvet 31.1g .#HV04 Litchi Temptation Cam Cháy',194000,'Nằm trong Bộ sưu tập Half N Half Collection hứa hẹn tạo nên một làn sóng làm đẹp hiện đại hơn, nổi bật hơn, giúp bạn khám phá thêm một phần cá tính và vẻ đẹp tiềm ẩn. Một phiên bản tự tin trong chính con người của bạn!',10,1),
(2,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red 36.6g .#A01',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',2,1),
(3,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red 36.6g .#A06',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',1,1),
(4,'Son Kem Lì Black Rouge Air Fit Velvet Tint Bad Rose Mịn Môi 36.8g #A21 Prickly Rose',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Bad Rose lấy cảm hứng từ những cánh hồng đỏ thắm cùng với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',8,1),
(5,'Son Thỏi Black Rouge Rose Velvet Lipstick Nhung Lì Mềm Mịn 24.5g .#R03 Latte Rose Cam Đào',207000,'Son Thỏi Black Rouge Rose Velvet Lipstick Nhung Lì Mềm Mịn 24.5g nằm trong bộ sưu tập lấy cảm hứng từ hoa hồng - loài hoa thống trị cái đẹp. Rose Velvet Lipstick sở hữu cho mình chất son sáp mịn mượt nhẹ tênh cùng bảng màu đẹp đến khó cưỡng.',5,1),
(6,'Phấn Mắt Khóa Màu Black Rouge Shadow Crystal Heart Lock 30.6g .#CH01 Coral Coffret Cam Đào',280000,'Phấn Mắt Khóa Màu Black Rouge Shadow Crystal Lock Heart 98.6g nằm trong bộ sưu tập lấy cảm hứng từ “heart” đang làm mưa làm gió trên khắp cộng đồng làm đẹp. Hộp phấn nhỏ gọn, bao gồm 4 ô màu bạn vừa có thể kẻ mày, đánh mắt, hightlight lẫn contour sương sương luôn đây. Chỉ với 1 hộp phấn cho bạn thỏa sức mix match với nhiều chất phấn để tạo ra makeup look phù hợp nhất với bản thân.',3,3),
(7,'Gel Nhũ Mắt Black Rouge Pearlvely I Glitter Universe Lấp Lánh 15.1g .#GU01 Mystery Black Ánh Đen',207000,'Với công thức Bling Bling độc quyền - tăng thêm hạt nhũ lớn cho hiệu ứng bắt sáng tối đa, khiến đôi mắt trở nên long lanh hơn bao giờ hết, bạn sẽ siêu cấp lung linh với phiên bản cực mới toanh từ Pearlvely I Glitter Universe.',1,3),
(8,'Bút Kẻ Mắt Nước Black Rouge Power Proof Chống Trôi 9.6g .#P02 Deep Brown Màu Nâu',207000,'Bút Kẻ Mắt Nước Black Rouge Power Proof Chống Trôi 9.6g thuộc bộ sưu tập Pool Party, cho nét kẻ thanh mảnh, chất gel nước cực kì sắc nét & khó lem, lên màu rõ ngay lần di bút đầu tiên.',5,3),
(9,'Kem Che Khuyết Điểm Black Rouge Zoom In HD Cover Fit Concealer Lâu Trôi 25.1g .#X1.0 Porcelain',182000,'Kem Che Khuyết Điểm Lâu Trôi Zoom In HD Cover Fit Concealer của Black Rouge với chất kem mỏng mịn, dễ tán. Che phủ hoàn hảo các khu vực nhiều khuyết điểm một cách nhanh chóng. Thân và nắp kem sử dụng chất liệu coating không bóng, màu đỏ ở nắp nổi bật và thu hút ánh nhìn.',1,2),
(10,'Bảng Phấn Mắt 4 Ô Black Rouge Crystal Heart Lock Shadow 37.5g .#CH04 Ginger Coffret Cam Đất',260000,'Bảng phấn mắt 4 màu đa công dụng Black Rouge Crystal Heart Lock Shadow quay lại với 2 bảng màu trung tính mới. Phù hợp mọi hoàn cảnh từ make up nhẹ nhàng đi học, đi chơi cho đến sắc sảo để dự những bữa tiệc.',3,3),
(11,'Son Bóng Có Màu Black Rouge Half N Half Water Glow 31.4g .#HG04 Over Tension Nâu Đỏ',194000,'Nằm trong Bộ sưu tập Half N Half Collection hứa hẹn tạo nên một làn sóng làm đẹp hiện đại hơn, nổi bật hơn, giúp bạn khám phá thêm một phần cá tính và vẻ đẹp tiềm ẩn. Một phiên bản tự tin trong chính con người của bạn!',8,1),
(12,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Dry Fruit 36.6g .#A13',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Dry Fruit với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',9,1),
(13,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Dry Fruit 36.6g .#A14',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Dry Fruit với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',8,1),
(14,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Mood Filter 36.6g .#A11',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Mood Filter với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',6,1),
(15,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Dry Fruit 36.6g .#A15',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Dry Fruit với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',7,1),
(16,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Mood Filter 36.6g .#A10',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Mood Filter với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',3,1),
(17,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red 36.6g .#A07',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',1,1),
(18,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Dry Fruit 36.6g .#A17',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Dry Fruit với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',2,1),
(19,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red 36.6g .#A02',209000,'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',4,1),
(20,'Son Kem Lì Black Rouge Air Fit Velvet Tint Beauty&Midnight Mịn Môi 36.8g .#A26 Winter Moon Nâu Trầm',209000,'Son kem lì mịn thuộc dòng Air Fit Velvet Tint 5 BAM của Black Rouge với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',4,1),
(21,'Phấn Nước Trang Điểm Black Rouge Peach Cover Velvet Cushion Hương Đào SPF 50+/PA++++ 98.6g .#CP01',448000,'Lấy cảm hứng từ những quả đào mùa thu căng mọng, Black Rouge đã cho ra mắt Peach Cover Velvet Cushion với finish mịn mượt như nhung, che phủ hoàn hảo gương mặt nhưng vẫn mỏng nhẹ và khô thoáng trên da. Thiết kế vỏ cam đào ngọt ngào, nhỏ gọn, tiện mang theo bên mình. Puff đi kèm hình quả đào xinh xắn, giúp tán phấn đều ngay cả những vùng khóe mũi, cánh mũi, bầu mắt...',2,2),
(22,'Kem Che Khuyết Điểm Black Rouge Zoom In HD Cover Fit Concealer Lâu Trôi 25.1g .#X2.0 Beige',182000,'Kem Che Khuyết Điểm Lâu Trôi Zoom In HD Cover Fit Concealer của Black Rouge với chất kem mỏng mịn, dễ tán. Che phủ hoàn hảo các khu vực nhiều khuyết điểm một cách nhanh chóng. Thân và nắp kem sử dụng chất liệu coating không bóng, màu đỏ ở nắp nổi bật và thu hút ánh nhìn.',2,2),
(23,'Phấn Nước Trang Điểm Black Rouge Peach Cover Velvet Cushion Hương Đào SPF 50+/PA++++ 98.6g .#CP02',448000,'Lấy cảm hứng từ những quả đào mùa thu căng mọng, Black Rouge đã cho ra mắt Peach Cover Velvet Cushion với finish mịn mượt như nhung, che phủ hoàn hảo gương mặt nhưng vẫn mỏng nhẹ và khô thoáng trên da. Thiết kế vỏ cam đào ngọt ngào, nhỏ gọn, tiện mang theo bên mình. Puff đi kèm hình quả đào xinh xắn, giúp tán phấn đều ngay cả những vùng khóe mũi, cánh mũi, bầu mắt...',3,2),
(24,'Phấn Tạo Khối & Bắt Sáng Black Rouge Contour & Highlight Up & Down Triple Shading 51.3g',233000,'Phấn Tạo Khối & Bắt Sáng Black Rouge Contour & Highlight Up & Down Triple Shading 51.3g là sản phẩm highlight & shading 2 trong 1 được sử dụng để tạo điểm nhấn và đường nét cho gương mặt đem lại nhiều hiệu quả không ngờ với 3 ô màu chỉ trong một sản phẩm.',2,2),
(25,'Son Kem Lì Black Rouge Air Fit Velvet Tint Beauty&Midnight Mịn Môi 36.8g .#A23 Vintage Sunset CamNude',209000,'Son kem lì mịn thuộc dòng Air Fit Velvet Tint 5 BAM của Black Rouge với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.',4,1),
(26,'Kem Che Khuyết Điểm Black Rouge Zoom In HD Cover Fit Concealer Lâu Trôi 25.1g .#X1.7 Fair',182000,'Kem Che Khuyết Điểm Lâu Trôi Zoom In HD Cover Fit Concealer của Black Rouge với chất kem mỏng mịn, dễ tán. Che phủ hoàn hảo các khu vực nhiều khuyết điểm một cách nhanh chóng. Thân và nắp kem sử dụng chất liệu coating không bóng, màu đỏ ở nắp nổi bật và thu hút ánh nhìn.',4,2),
(27,'Bút Kẻ Mắt Nước Black Rouge Power Proof Chống Trôi 9.6g .#P01 Deep Black Màu Đen',207000,'Bút Kẻ Mắt Nước Black Rouge Power Proof Chống Trôi 9.6g thuộc bộ sưu tập Pool Party, cho nét kẻ thanh mảnh, chất gel nước cực kì sắc nét & khó lem, lên màu rõ ngay lần di bút đầu tiên.',5,3),
(28,'Son Kem Lì Black Rouge Cream Matt Rouge 26.5g .#CM09 Honeyed Cam Đất',194000,'Son kem lì Black Rouge Cream Matt Rouge II của Black Rouge trở lại với một phiên bản đặc biệt hơn, với 5 sắc son đồng hành cùng bạn qua mọi thời điểm. Sự kết hợp hai phong cách vừa hiện đại nhưng không kém phần cổ điển. Tôn lên từng khoảnh khắc rạng rỡ cho đôi môi của bạn.',10,1),
(29,'Bảng Phấn Mắt 4 Ô Black Rouge Crystal Heart Lock Shadow 37.5g .#CH03 Almond Coffret Nâu Beige',260000,'Bảng phấn mắt 4 màu đa công dụng Black Rouge Crystal Heart Lock Shadow quay lại với 2 bảng màu trung tính mới. Phù hợp cho mọi hoàn cảnh từ make up nhẹ nhàng đi học, đi chơi cho đến sắc sảo để dự các bữa tiệc.',1,3),
(30,'Chì Kẻ Mày Black Rouge Half-Hard Drawing Master Eyebrow 12.3g .#E01 Grey Master Nâu Xám',156000,'Chì kẻ mày Half-Hard Drawing Master Eyebrow của Black Rouge với thiết kế đầu chì hình tam giác giúp tạo dáng chân mày thật nhẹ nhàng, mang lại vẻ tự nhiên.Thiết kế đơn giản với chất liệu coating không bóng nhưng lại thể hiện sự hiện đại, sang trọng.',1,3),
(31,'Chì Kẻ Mày Black Rouge Half-Hard Drawing Master Eyebrow 12.3g .#E02 Brown Master Nâu Đen',156000,'Chì kẻ mày Half-Hard Drawing Master Eyebrow của Black Rouge với thiết kế đầu chì hình tam giác giúp tạo dáng chân mày thật nhẹ nhàng, mang lại vẻ tự nhiên.Thiết kế đơn giản với chất liệu coating không bóng nhưng lại thể hiện sự hiện đại, sang trọng.',2,3),
(32,'Son Thỏi Black Rouge Rose Velvet Lipstick Nhung Lì Mềm Mịn 24.5g .#R04 Burgundy Rose Đỏ Rượu',207000,'Son Thỏi Black Rouge Rose Velvet Lipstick Nhung Lì Mềm Mịn 24.5g nằm trong bộ sưu tập lấy cảm hứng từ hoa hồng - loài hoa thống trị cái đẹp. Rose Velvet Lipstick sở hữu cho mình chất son sáp mịn mượt nhẹ tênh cùng bảng màu đẹp đến khó cưỡng.',5,1),
(33,'Chì Kẻ Mày Black Rouge Half-Hard Drawing Master Eyebrow 12.3g .#E03 Ashe Master Nâu Sáng',156000,'Chì kẻ mày Half-Hard Drawing Master Eyebrow của Black Rouge với thiết kế đầu chì hình tam giác giúp tạo dáng chân mày thật nhẹ nhàng, mang lại vẻ tự nhiên.Thiết kế đơn giản với chất liệu coating không bóng nhưng lại thể hiện sự hiện đại, sang trọng.',2,3),
(34,'Son Kem Lì Black Rouge Mịn Môi AirFit Velvet Tint Ver 7 Velvet Crown 37.6g.#A36 Dust Pumpkin Cam Nâu',209000,'Sự trở lại của dòng son đình đám Velvet với một phiên bản đặc biệt, Air Fit Velvet Tint Ver 7 [Velvet Crown] sẽ đưa bạn đến vương quốc của sự quyến rũ khó cưỡng lại.',1,1),
(35,'Gel Nhũ Mắt Black Rouge Pearlvely I Glitter Universe Lấp Lánh 15.1g .#GU02 Iron Red Ánh Đỏ Nổi Bật',207000,'Với công thức Bling Bling độc quyền - tăng thêm hạt nhũ lớn cho hiệu ứng bắt sáng tối đa, khiến đôi mắt trở nên long lanh hơn bao giờ hết, bạn sẽ siêu cấp lung linh với phiên bản cực mới toanh từ Pearlvely I Glitter Universe.',4,3),
(36,'Son Kem Lì Black Rouge Mịn Môi AirFit Velvet Tint Ver 7 Velvet Crown 37.6g.#A37 Unrivaled Chili King',209000,'Sự trở lại của dòng son đình đám Velvet với một phiên bản đặc biệt, Air Fit Velvet Tint Ver 7 [Velvet Crown] sẽ đưa bạn đến vương quốc của sự quyến rũ khó cưỡng lại.',6,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userFname` varchar(255) NOT NULL,
  `userLname` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4  COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES 
(1,'20020223@vnu.edu.vn','02072002','My','Nguyen Huynh Tra','3 Phuc Yen, Vinh Phuc','0328919372',1),
(2,'htp2304@gmail.com','12345678','Thao','Hoang Phuong','10 Binh Xuyen, Vinh Phuc','0328762341',0),
(3,'bephuongthao@gmai.com','19234746','Thao','Be Phuong','8 Thanh pho Cao Bang','0912325674',0),
(4,'vananh@gmail.com','74892019','Anh','Nguyen Thi Van','8 Luc Yen, Nghe An','0945273918',0),
(5,'dieuquynh@gmail.com','73682919','Quynh','Nguyen Dieu','10 Tran Quoc Hoan, Ha Noi','0328349273',0),
(6,'nguyenhuong@gmail.com','19284850','Huong','Nguyen Thi','12 Pham Van Dong, Ha Noi','0320198234',0),
(7,'thuphuong@gmail.com','28472919','Phuong','Nguyen Thi Thu','12 Phuc Yen, Vinh Phuc','0321283847',0),
(8,'ngochuyen@gmail.com','19203877','Huyen','Nguyen Ngoc','3 Luc Yen, Nghe An','0964726384',0),
(9,'baongoc@gmail.com','10982374','Ngoc','Duong Bao','96 Phuc Yen, Vinh Phuc','0337283984',0),
(10,'thaolinh@gmail.com','17263467','Linh','Huynh Thao','3 Ton That Thuyet, Ha Noi','0326472838',0),
(11,'diemquynh@gmail.com','17263748','Quynh','Tran Diem','8 Ton That Thuyet, Ha Noi','0984627384',0),
(12,'hamy@gmail.com','17263748','My','Tran Ha','3 Minh Tri, Xuan Hoa','0648281927',0),
(13,'ngocanh@gmail.com','57693874','Anh','Dinh Ngoc','8 Minh Tri, Xuan Hoa','0839172837',0),
(14,'huyenlinh@gmail.com','95868374','Linh','Dinh Huyen','16 Tran Duy Hung, Ha Noi','0918273647',0),
(15,'quynhanh@gmail.com','84758363','Anh','Nguyen Le Quynh','3 Huong Canh, Vinh Phuc','0337467382',0),
(16,'hoanganh@gmail.com','29843047','Anh','Vu Hoang','100 Hung Vuong, Phuc Yen, Vinh Phuc','0328394772',0);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
