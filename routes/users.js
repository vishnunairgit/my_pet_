var express = require('express');
const { getAllDogPetsData } = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/getAllDogPetsData',getAllDogPetsData)

module.exports = router;
