const db = require('../models');
const expressAsyncHandler =  require('express-async-handler');
const data = require("../data");
const { search } = require('../routers/uploadRouter');


module.exports.productdetail = expressAsyncHandler(async( req,res) => {
    const product = await db.products.findOne({
        include:[{
            model: db.productdetail
        },
        {
            model: db.categories,
        }],
        where:{
            idProduct: req.params.id
        }
    })
    if (product){
        res.send(product)
    }
    else {
        res.status(404).send({message: 'Không tìm thấy sản phẩm'})
    }
});

module.exports.products =  expressAsyncHandler(async(req,res)=>{
    const limit =  10;
    const search = req.query.search || '';
    const page = req.query.page >= 0 ? req.query.page : 0;
    const offset = page ? parseInt(page * limit) : 0;
    const products = await db.products.findAll({
        include: [
            {
                model: db.productdetail,
                offset: 0,
                limit: 1,
            },
            {
                model: db.categories,
            },
            
        ],
        offset: offset,
        limit: limit,
    })
    const pages = await db.products.count();
    const totalPages = Math.ceil(pages/ limit);
    res.send({products, totalPages});
});

module.exports.postProducts =  expressAsyncHandler(async (req, res) => {
    const createc =  await db.categories.bulkCreate(data.categories);
    const createpd = await db.products.bulkCreate(data.products);
    const createp =   await db.productdetail.bulkCreate(data.productdetail);
    res.send({createc,createp,createpd});

});