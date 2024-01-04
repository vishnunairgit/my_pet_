var express = require('express');
const { doSignUp, doLogin  } = require('../controllers/authController');
var router = express.Router();


router.post('/signUp',doSignUp)
router.post('/Login',doLogin)



module.exports = router;
