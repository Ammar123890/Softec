const router = require('express').Router();

// Controllers
const {
    login,
    register
}= require('../../Controllers/Customer/auth')

// middlewares
const 
{
    userAuthMiddleware
}= require('../../Middleware/verifyUser')

// Routes

router.post('/login', login);
router.post('/register', register);

router.use(userAuthMiddleware);


module.exports = router;





