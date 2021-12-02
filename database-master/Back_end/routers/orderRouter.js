const express = require("express");
const db = require('../models');
const orderRouter = express.Router();
const expressAsyncHandler =  require('express-async-handler');
const {isAuth, isAdmin} = require('../utlis');
const router = require("./searchRouters");
const sequelize = require('sequelize');




orderRouter.post(  '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
      } else {
        const order = await db.orders.create({
          idOrder: (5),
          customerName: req.body.customerName,
          orderDate: req.body.orderDate,
          status: req.body.status,
          phoneNumber: req.body.phoneNumber,
          shippedDate: req.body.shippedDate,
          address: req.body.shipAddress,
          paymentMethod: req.body.paymentMethod,
          shippingPrice: req.body.shippingPrice,
          idUser: req.user.id,
        });
        const array = req.body.orderItems;
        array.forEach(async(element) => {
            await db.orderdetail.create({
              idOrder: order.idOrder,
              idProduct: element.product,
              priceEach: element.price,
              quantityOrder: element.qty,
              sizeProduct: element.size,
            })
            const productSizes = await db.productsizes.findOne({
              where: {
                idSize: element.idsize,
                idProduct: element.product,
              }
            })
            const qty = parseInt(element.qty);
            if(productSizes){
              productSizes.quantityInStock = productSizes.quantityInStock - qty; 
              productSizes.save()
            }
        });
        res
        .status(201)
        .send({ message: 'New Order Created'});
      }
      }
  )
);
orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const orders = await db.orders.findAll({
      include:[{
          model: db.orderdetail
      }],
      where:{
          idUser: req.user.id
      },
    }
  )
  res.send(orders)
}));

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const limit =  10;
    const search = req.query.search || '';
    const page = req.query.page >= 0 ? req.query.page : 0;
    const offset = page ? parseInt(page * limit) : 0;
    const orders = await db.orders.findAll({
      include:[{
          model: db.orderdetail
      },{
        model: db.users
      },
      ],
      offset: offset,
      limit: limit,
    });
    const pages = await db.orders.count();
    const totalPages = Math.ceil(pages/ limit);
    res.send({orders, totalPages});
}));

orderRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
      const today = new Date();
      const orderId = req.params.id
      dateShip = today.getFullYear() +'-'+ (today.getMonth()+1)+'-'+(today.getDate());
      const order = await db.orders.findOne({
        where: {
          idOrder: orderId
        }
      }
  )
      order.status = "Đã hoàn thành";
      order.shippedDate = dateShip;
      order.save();
  res.send(order)
}));


orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await db.orders.findOne({
      where:{
          idOrder: req.params.id
      }
  })
    if (order) {
      const deleteOrder = await order.destroy();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);


orderRouter.get(
  '/detail',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const idOrder = req.query.idOrder;
    const idUser = req.query.idUser;
    const user = await db.users.findOne({
      where:{
        idUser: idUser,
      }
    })
    if (user.isAdmin) {
    const order = await db.orders.findOne({
      where:{
        idOrder:  idOrder,
      },
      include:[{
        model: db.orderdetail,
        include:[{
          model: db.products,
          include:[{
            model: db.productdetail,
          }]
        }]
      }]
    });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }}
    else {
      const order = await db.orders.findOne({
        where:{
          idOrder:  idOrder,
          idUser: idUser,
        },
        include:[{
          model: db.orderdetail,
          include:[{
            model: db.products,
            include:[{
              model: db.productdetail,
            }]
          }]
        }]
      });
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    }

  })
);

orderRouter.get("/plt",
  expressAsyncHandler(async (req, res) => {
    const count = await db.orders.findAll({
      attributes: ['orderDate', [sequelize.fn('COUNT', sequelize.col('orders.idOrder')), 'countOrder']],
      group:["orders.orderDate"],
    })
    res.send(count);
  })
);



module.exports = orderRouter; 