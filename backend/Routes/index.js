const router = require('express').Router();

//Paths
const admin= require('./admin/user')
const customer= require('./customer/user')

//Routes
router.use('/admin', admin);
router.use('/customer', customer);


module.exports = router;