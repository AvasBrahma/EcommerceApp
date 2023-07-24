const Order=require('../models/order_Schema');


//function to get all the categiry
module.exports.getAllOrgder=async function(req, res){
    const orderList= await Order.find();

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