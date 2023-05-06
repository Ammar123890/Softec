const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    title:{
        type: String,
        required:true
    },
    marketPrice:{
        type: Number,
        required: true
    },
    costPrice:{
        type: Number,
        required: true
        
    },
    margin:{
        type: Number,
        required: true
    },
    inventoyType:{
        type: String,
        required: true
    },

    Image:{
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Inventory', InventorySchema);