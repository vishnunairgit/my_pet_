var express = require('express');
const { getAllDogPetsData , getSinglePetData , getMyBookingData , GetAllPetCat } = require('../controllers/userController');
const { userAuth } = require('../middlewares/Authorization');
var router = express.Router();

/* GET users listing. */
router.get( '/getAllDogPetsData', userAuth , getAllDogPetsData )
router.get( '/getSinglePetData', userAuth , getSinglePetData )
router.get( '/getMyBookingData', userAuth , getMyBookingData )
router.get( '/GetAllPetCat', userAuth , GetAllPetCat )


// GetPetCat
// router.get( '/getAllDogPetsDatacarousal', userAuth , getAllDogPetsDatacarousal )




module.exports = router;
// 