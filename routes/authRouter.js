var express = require('express');
var router = express.Router();
const { doSignUp, doLogin  } = require('../controllers/authController');



router.post('/Login',doLogin)



router.post('/signUp',doSignUp)




module.exports = router;
