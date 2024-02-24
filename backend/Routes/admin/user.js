const router = require('express').Router();


// Controllers
const {
    login
}= require('../../Controllers/Admin/auth')

//middlewares
const
{
    adminAuthMiddleware
} = require('../../Middleware/verifyAdmin')



// Routes
router.post('/login', login);

router.use(adminAuthMiddleware);


module.exports = router; 