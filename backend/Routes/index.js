const router = require('express').Router();

//Paths
const admin= require('./admin')


//Routes
router.use('/admin', admin);



module.exports = router;