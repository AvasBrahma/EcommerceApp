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
            message: 'No Order Found'
        })
    }

}

//function to get one order details
module.exports.getOrderById=async function(req, res){
    const orderDetail= await Order.findById(req.params.id).populate('user', 'name')
    .populate({path: 'orderItems', populate: {
             path: 'product' , populate: 'category'
    }});

    if(orderDetail){
        res.status(200).json({
            success:true,
            message: 'Order Detail :',
            orderDetail
        })
    }else{
        res.status(500).json({
            success: false,
            message: 'No Order Found'
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
      
     //calculating total price:
     const totalPrices=await Promise.all(orderItemIdsResolved.map(async orderItemId=>{
         const orderItem=await OrderItem.findById(orderItemId).populate('product', 'price');
         const totalPrice=orderItem.product.price * orderItem.quantity;
         return totalPrice;
        }))

    console.log("Total Prices : ", totalPrices);
    const totalPrice=totalPrices.reduce((a,b)=>a+b,0);
    let order= new Order({
        orderItems: orderItemIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
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


//function to update status only in Orders 
module.exports.updateOrderStatus=async function(req, res){
    const order= await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    },{
       new: true
    })

   if(order){
       res.status(200).json({
           success:true,
           message: 'Order Status Updated',
           order
       })
   }else{
       res.status(500).json({
           success: false,
           message: 'Cannot Update the Order Status'
       })
   }
}

// function to delete the Order with id
module.exports.deleteOrder= function(req, res){

    Order.findByIdAndRemove(req.params.id).then(async order=>{
        if(order){
            // looping the orderitems and delete the order items also 
            await order.orderItems.map(async orderItem=>{
                await OrderItem.findByIdAndRemove(orderItem);
            })
            return res.status(200).json({
                success: true,
                message: 'the Order is deleted'
            })
        }else {
            return res.status(400).json({
                success: false,
                message: 'Cannot find the Order'
            })
        }
    }).catch(error=>{
        return res.status(400).json({
            success:false,
            error
        })
    })
}