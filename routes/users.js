var express = require('express');
const { getAllDogPetsData } = require('../controllers/userController');
const { userAuth } = require('../middlewares/Authorization');
var router = express.Router();

/* GET users listing. */
router.get('/getAllDogPetsData', userAuth, getAllDogPetsData)

module.exports = router;
