const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    shippingAddress1:{
        type:String,
        required: true,
    },
    shippingAddress2:{
        type: String,
    },
    city:{
        type: String,
    },
    zip:{
        type: Number,
    },
    country:{
        type:String,
    },
    phone:{
        type:Number,
        required: true,
    }

})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;