const { model } = require('mongoose')
const adminModel = require('../../Models/Admin/user')
const generateToken = require('../../Utils/generateToken')


/**
 * @description To login the new admin
 * @route POST /api/admin/login
 * @access Private
 */

module.exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }
        const user = await adminModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

}
    
