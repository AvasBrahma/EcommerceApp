const express=require('express');
const router=express.Router();
const orderController=require('../../controllers/order_controller');




router.get('/allorders', orderController.getAllOrder);


router.post('/add', orderController.postOrders);


module.exports=router;