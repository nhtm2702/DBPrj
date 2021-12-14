const bcrypt = require('bcryptjs');

const data = {
    users: [
      {
        userEmail: 'admin',
        userPassword: bcrypt.hashSync('12345678', 8), 
        userFname: 'My',
        userLname: 'Tra',
        address:'',
        phone: '0328919372',
        isAdmin: true,
      },

      {
        userEmail: 'tramy123@gmail.com',
        userPassword: bcrypt.hashSync('02072002', 8), 
        userFname: 'My',
        userLname: 'Nguyen',
        address:'',
        phone: '094607186',
        isAdmin: false,
      },
      {
        userEmail: 'mymy27@gmail.com',
        userPassword: bcrypt.hashSync('02072002', 8), 
        userFname: 'Tra',
        userLname: 'Nguyen',
        address:'',
        phone: '0123456789',
        isAdmin: false,
      },   
      {
        userEmail: 'tramy0207@gmail.com',
        userPassword: bcrypt.hashSync('02072002', 8), 
        userFname: 'Tra',
        userLname: 'My',
        address:'',
        phone: '0123456789',
        isAdmin: true,
        }
    
    ],
    products:[
        {
            idProduct:1,
            productName: 'Son Kem Lì Black Rouge Half N Half Water Vetvet 31.1g .#HV04 Litchi Temptation Cam Cháy',      
            productPrice:194000,
            productDescription:"Nằm trong Bộ sưu tập Half N Half Collection hứa hẹn tạo nên một làn sóng làm đẹp hiện đại hơn, nổi bật hơn, giúp bạn khám phá thêm một phần cá tính và vẻ đẹp tiềm ẩn. Một phiên bản tự tin trong chính con người của bạn!",
            quantityInStock:10,
            idCategory:1,
        },
        {
            idProduct: 2,
            productName: 'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red 36.6g .#A01',
            productPrice:209000,
            productDescription: "Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.",
            quantityInStock:2,
            idCategory:1,
        },
        {
            idProduct: 3,
            productName: 'Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red 36.6g .#A06',
            productPrice:209000,
            productDescription:"Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint The Red với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.",
            quantityInStock:1,
            idCategory:1,
        },
        {
            idProduct: 4,
            productName: 'Son Kem Lì Black Rouge Air Fit Velvet Tint Bad Rose Mịn Môi 36.8g #A21 Prickly Rose',
            productPrice:209000,
            productDescription:"Son Kem Lì Black Rouge Mịn Môi Air Fit Velvet Tint Bad Rose lấy cảm hứng từ những cánh hồng đỏ thắm cùng với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.",
            quantityInStock:8,
            idCategory:1,
        },
        {
            idProduct: 5,
            productName: 'Son Thỏi Black Rouge Rose Velvet Lipstick Nhung Lì Mềm Mịn 24.5g .#R03 Latte Rose Cam Đào',
            productPrice:207000,
            productDescription:"Son Thỏi Black Rouge Rose Velvet Lipstick Nhung Lì Mềm Mịn 24.5g nằm trong bộ sưu tập lấy cảm hứng từ hoa hồng - loài hoa thống trị cái đẹp. Rose Velvet Lipstick sở hữu cho mình chất son sáp mịn mượt nhẹ tênh cùng bảng màu đẹp đến khó cưỡng.",
            quantityInStock:5,
            idCategory:1,
        },
        {
            idProduct: 6,
            productName: 'Son Kem Lì Black Rouge Air Fit Velvet Tint Beauty&Midnight Mịn Môi 36.8g .#A26 Winter Moon Nâu Trầm',
            productPrice:209000,
            productDescription:"Son kem lì mịn thuộc dòng Air Fit Velvet Tint 5 BAM của Black Rouge với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.",
            quantityInStock:4,
            idCategory:1,
        },
        {
            idProduct: 7,
            productName: 'Son Kem Lì Black Rouge Air Fit Velvet Tint Beauty&Midnight Mịn Môi 36.8g .#A23 Vintage Sunset CamNude',
            productPrice:209000,
            productDescription:"Son kem lì mịn thuộc dòng Air Fit Velvet Tint 5 BAM của Black Rouge với chất son nhẹ tênh, giúp bạn hạn chế tối đa tình trạng khô môi. Son lên chuẩn sắc và giữ màu đến 8 tiếng và có một lớp base hồng nhẹ giúp môi luôn có sức sống. Thiết kế thân vuông đặc trưng của thương hiệu Black Rouge với logo được in hologram óng ánh sang trọng.",
            quantityInStock:4,
            idCategory:1,
        }
        
    ],
    productdetail: [
        {
            idProduct: 1,
            idImage: 1,
            image:"..//../image/Product/lips/lip1.jpg",
        },
        {
            idProduct: 2,
            idImage: 1,
            image: "..//../image/Product/lips/lip2.jpg",
        },
        {
            idProduct: 3,
            idImage: 1,
            image: "..//../image/Product/lips/lip3.jpg",
        },
        {
            idProduct: 4,
            idImage: 1,
            image: "..//../image/Product/lips/lip4.jpg",
        },
        {
            idProduct: 5,
            idImage: 1,
            image: "..//../image/Product/lips/lip5.jpg",
        },
        {
            idProduct: 6,
            idImage: 1,
            image: "..//../image/Product/lips/lip6.jpg",
        },
        {
            idProduct: 21,
            idImage: 2,
            image: "..//../image/Product/face/face1.jpg",
        },
        {
            idProduct: 22,
            idImage: 2,
            image: "..//../image/Product/face/face2.jpg",
        },
	{
            idProduct: 23,
            idImage: 2,
            image: "..//../image/Product/face/face3.jpg",
        },
	{
            idProduct: 24,
            idImage: 2,
            image: "..//../image/Product/face/face4.jpg",
        },
        {
            idProduct: 30,
            idImage: 3,
            image: "..//../image/Product/eyes/eyes1.jpg",
        },
	{
            idProduct: 31,
            idImage: 3,
            image: "..//../image/Product/eyes/eyes2.jpg",
        },
	{
            idProduct: 32,
            idImage: 3,
            image: "..//../image/Product/eyes/eyes3.jpg",
        }
    ],
    categories:[
        {
            idCategory: 1,
            categoryName: 'Môi',
        },
        {
            idCategory:2,
            categoryName:'Mặt',
        },
        {
            idCategory:3,
            categoryName:'Mắt',
        }
    ]
};
  
  module.exports = data;