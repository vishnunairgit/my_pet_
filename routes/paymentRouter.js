var express = require('express');
const { orders,paymentSuccess }=require('../controllers/paymentController.js')
const { userAuth } = require('../middlewares/Authorization');
var router = express.Router();


router.post('/orders',userAuth,orders)
router.post('/success',userAuth,paymentSuccess)




module.exports = router;


// payment/orders