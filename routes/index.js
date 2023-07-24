const express=require('express');
const router=express.Router();


router.use('/user', require('./user'));

router.use('/category', require('./category'));

router.use('/product', require('./products'));

router.use('/order', require('./order'));

module.exports=router;