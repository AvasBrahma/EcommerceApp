const Order=require('../models/order_Schema');
const OrderItem=require('../models/orderItem_Schema');


//function to get all the orders
module.exports.getAllOrder=async function(req, res){
    const orderList= await Order.find().populate('user', 'name').sort({'dateOrdered':-1});

    if(orderList){
        res.status(200).json({
            success:true,
            message: 'List of Order :',
            orderList
        })
    }else{
        res.status(500).json({
            success: false,
            message: 'No Category'
        })
    }

}


//function to post Orders 
module.exports.postOrders=async function(req, res){

     const orderItemsIds=Promise.all(req.body.orderItems.map(async orderitems=>{
        let newOrderItem=new OrderItem({
            quantity: orderitems.quantity,
            product: orderitems.product
        })
        newOrderItem=await newOrderItem.save(); // returning promise 
         
        return newOrderItem._id;
     }))

     const orderItemIdsResolved=await orderItemsIds;

    let order= new Order({
        orderItems: orderItemIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice:req.body.totalPrice,
        user: req.body.user
    })
    
    order= await order.save();
    if(order){
        return res.status(200).send({
            order,
            message: 'Order Added.....',
        });
    }else{
        return res.status(404).send('Cannot add Order...')
    }
   
  
}