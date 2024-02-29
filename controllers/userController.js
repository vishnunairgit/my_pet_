// const { response } = require("express");

const PETS = require('../Models/petSchema');

// -------------get all pet data--------------------

const getAllPetsData = (req, res) => {
  PETS.find()
    .then((response) => {
      res.status(200).json(response);
      console.log(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};


// --------------------carousal data----------------
// const getAllDogPetsDatacarousal = (req, res) => {
//   PETS.find()
//     .then((response) => {
//       res.status(200).json(response);
//       console.log(response);
//     })
//     .catch((Error) => {
//       res.status(500).json(Error);
//     });
// };


// ------------------------------------------------

// -------------get single pet data-----getAllDogPetsDatacarousal---------

const getSinglePetData = async (req, res) => {
  try {
    const sinlePetResult = await PETS.findOne({ _id: req.query.petId });
    res.status(200).json(sinlePetResult);
    //  console.log(sinlePetResult,'-----------sinlePetResult---------');
  } catch (error) {
    console.log(error);
  }

  // PETS.findOne({_id:req.query.petId}).then((response)=>{
  //     res.status(200).json(response)
  //     console.log(response,'---------PETS-00000000----------');
  // })
  // .catch((error)=>{
  // console.log(error);
  // })
};

//-------------------------------------------------------------------------

// --------------------my booking-------------------------------
const getMyBookingData = async (req, res) =>{
  try {
    const myBooking = await PETS.find({ petAdoptedBy: req.userId });
    res.status(200).json(myBooking);
  } catch (error) {
    console.error('Error fetching my booking data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
//-------------------------------------------------------------------------

// ------------------------get All Pet Cat-------------------------------
const GetAllPetCat = async (req, res) => {
  try {
    const petType = req.query.petType;
    console.log('Received petType:', petType);

    if (petType !== 'CAT') {
      return res.status(400).json({ error: 'Invalid or missing petType parameter. Only "cat" is allowed.' });
    }
    const getallpetcat = await PETS.find({ petType: 'CAT' });
    if (getallpetcat.length === 0) {
      return res.status(404).json({ error: 'No pet categories found for the specified petType' });
    }
    res.status(200).json(getallpetcat);
    console.log(getallpetcat, '------------getallpetcat------------');
  } catch (error) {
    console.error('Error fetching pet categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//-------------------------------------------------------------------------

const GetAllPetDog = async (req, res) =>{

  try {
    const petType = req.query.petType;
    
    if (petType !== 'DOG') {
      return res.status(400).json({ error: 'Invalid or missing petType parameter. Only "Dog" is allowed.' });
    }
    const getAllPetDog = await PETS.find({petType : 'DOG'})
    if (getAllPetDog.length === 0) {
      return res.status(404).json({error:'No pet categories found for the specified petType' })
    }
    res.status(200).json(getAllPetDog)
    console.log(getAllPetDog, '------------getAllPetDog------------');
    
  } catch (error) {
    console.error('Error fetching pet categories:', error);
    res.status(500).json({error:'Internal Server Error'})
    
  }
}



module.exports = { getAllPetsData, getSinglePetData, getMyBookingData, GetAllPetCat, GetAllPetDog };
