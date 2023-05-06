const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    customerId:{
        type: String,
        required:true
    },
    productId:{
        type: String,
        required: true
    },
    orderDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    orderTotal:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Order',OrderSchema);