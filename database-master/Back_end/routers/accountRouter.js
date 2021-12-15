const express = require("express");
const db = require('../models');
const router = express.Router();
const data1 = require('../data');
const expressAsyncHandler =  require('express-async-handler');
const bcrypt = require('bcryptjs');
const {generateToken, isAuth, isAdmin} = require('../utlis');
const userController = require('../controllers/accountController');
const e = require("express");



router.get("/users", (req,res)=>{
    db.users.findAll().then(users => res.send(users));
});
router.get("/import", expressAsyncHandler(async (req, res) => {
  const create = await db.users.bulkCreate(data1.users);
  res.send({create});
}));
router.get("/seed",userController.seed);

router.post("/signin", userController.singin)

router.post("/check", (req,res)=>{
    res.send(req.body);
});
router.post(
    "/register",
    expressAsyncHandler(async (req, res) => {
      const check = await db.users.findOne({  
            where: {
                userEmail: req.body.email,
        }
    })  
    if(check){
        res.send({message: "Tài khoản đã được sử dụng"})
    }
    else{
      const user = await db.users.create({
        userFname: req.body.fname,
        userLname: req.body.lname,
        userEmail: req.body.email,
        userPassword: bcrypt.hashSync(req.body.password, 8),
      });
      res.send({
        id: user.idUser,
        Fname: user.userFname,
        Lname: user.userLname,
        email: user.userEmail,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    }
    })
  );


router.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const limit =  10;
      const search = req.query.search || '';
      const page = req.query.page >= 0 ? req.query.page : 0;
      const offset = page ? parseInt(page * limit) : 0;      
      const users = await db.users.findAll({
        offset: offset,
        limit: limit,
      });
      const pages = await db.users.count();
      const totalPages = Math.ceil(pages/ limit);
      res.send({users, totalPages});
    })
  );


router.delete(
    '/delete',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const userId = req.query.idUser;
      const user = await db.users.findOne({
        where:{
          idUser: userId}});
      if (user) {
        if (user.isAdmin == 1) {
          res.status(400).send({ message: 'Can Not Delete Admin User' });
          return;
        }
        const deleteUser = await user.destroy();
        res.send({ message: 'User Deleted', user: deleteUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );  

router.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const oldPassword = req.body.oldPassword || '';
    const newPassword = req.body.newPassword || '';
    const user = await db.users.findOne({
      where:{
        idUser: req.user.id,
      }
    })
    if(user){
        if(req.body.Fname) {
          user.userFname = req.body.Fname;
        }
        if (req.body.Lname) {
          user.userLname = req.body.Lname;
        }
        if(req.body.phone) {
          user.phone = req.body.phone;
        }
        if (req.body.address) {
          user.address = req.body.address;
        }
        if (oldPassword && newPassword){
          if (bcrypt.compareSync(oldPassword, user.userPassword)) {
            user.userPassword =  bcrypt.hashSync(newPassword, 8);
            user.save();
            res.send({
              id: user.idUser,
              email: user.userEmail,
              Fname: user.userFname,
              Lname: user.userLname,
              isAdmin: user.isAdmin,
              token: generateToken(user)
            });
            return;
          }
          else {
            res.status(401).send({message: "Không đúng mật khẩu"});
            return;
          }
        }
        const updateUser = user.save();  
        res.send({
          id: user.idUser,
          email: user.userEmail,
          Fname: user.userFname,
          Lname: user.userLname,
          isAdmin: user.isAdmin,
          token: generateToken(user)
        });
    }
  })
  );

router.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const user = await db.users.findOne(
        {
          where: { idUser: req.params.id}
        });
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
);

module.exports = router;