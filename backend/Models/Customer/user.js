const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePic: {
        type: String,
        default: null
    },
    preferences: {
        type: Array,
        default: []
    },
    travelStyle: {
        type: Array,
        default: []
    }    
},
{timestamps: true}
);

module.exports= mongoose.model('User', userSchema);
