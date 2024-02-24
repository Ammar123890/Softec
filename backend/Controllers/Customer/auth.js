    const customerModel = require('../../Models/Customer/user');
const generateToken = require('../../Utils/generateToken');
const bcrypt = require('bcryptjs');


/**
 * @description To login the new customer
 * @route POST /api/customer/login
 * @access Private
 */

module.exports.login = async (req, res) => {
    const { name, email, password, preferences, travelStyle } = req.body;

    if (!email || !password || !name || !preferences || !travelStyle) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //Regex
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
        return res
            .status(400)
            .json({ errors: { msg: "Invalid email address", status: false } });
    }

    try{
        const user = await customerModel.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const token = generateToken(user._id);
        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token
        });
    }
    catch{
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

}


/**
 * @description To register the customer 
 * @route POST /api/customer/register
 * @access Public
 */

module.exports.register = async (req, res) => {
    const { name, email, password, preferences, travelStyle } = req.body;

    if (!email || !password || !name || !preferences || !travelStyle) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //Regex
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
        return res
            .status(400)
            .json({ errors: { msg: "Invalid email address", status: false } });
    }

    if(password.length < 6){
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters'
        });
    }

    try{
        let user = await customerModel.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        user = new customerModel({
            name,
            email,
            password,
            preferences,
            travelStyle
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const token = generateToken(user._id);
        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
            token
        });
    }
    catch{
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}