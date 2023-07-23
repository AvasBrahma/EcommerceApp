const express=require('express');
const router=express.Router();

const adminContoller=require('../controllers/admin_controller');


router.use('/user', require('./user'));

router.use('/category', require('./category'));

router.use('/product', require('./product'));


module.exports=router;