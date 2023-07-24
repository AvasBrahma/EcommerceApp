const express=require('express');
const router=express.Router();
const orderController=require('../../controllers/order_controller');




router.get('/allorders', orderController.getAllOrder);

router.get('/:id', orderController.getOrderById);

router.post('/add', orderController.postOrders);

router.put('/status/:id', orderController.updateOrderStatus);

router.delete('/:id', orderController.deleteOrder);


module.exports=router;