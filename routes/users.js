var express = require('express');
const { getAllPetsData , getSinglePetData , getMyBookingData , GetAllPetCat, GetAllPetDog } = require('../controllers/userController');
const { userAuth } = require('../middlewares/Authorization');
var router = express.Router();

/* GET users listing. */
router.get( '/getAllPetsData', userAuth , getAllPetsData )
router.get( '/getSinglePetData', userAuth , getSinglePetData )
router.get( '/getMyBookingData', userAuth , getMyBookingData )
router.get( '/GetAllPetCat', userAuth , GetAllPetCat )
router.get( '/GetAllPetDog', userAuth , GetAllPetDog )


// GetPetCat
// router.get( '/getAllDogPetsDatacarousal', userAuth , getAllDogPetsDatacarousal )




module.exports = router;
// 