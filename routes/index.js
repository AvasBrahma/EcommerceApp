const express=require('express');
const router=express.Router();

const adminContoller=require('../controllers/admin_controller');

router.use('/user', require('./user'));

router.use('/admin', require('./admin'));

router.get('/register', adminContoller.admin);


module.exports=router;