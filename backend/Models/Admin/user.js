const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    profilePic: {
        type: String,
        default: null
    },
    name: String,
    email: String,
    password: {
        type: String,
        select: false
    },
},
    { timestamps: true }
)


module.exports = mongoose.model('Admin', adminSchema);