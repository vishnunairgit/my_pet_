
const PETS = require('../Models/petSchema')


const getAllDogPetsData=(req,res)=>{

    PETS.find().then((response)=>{
        res.status(200).json(response)
    })
    .catch((Error)=>{
        res.status(500).json(Error)
    })


}

module.exports ={getAllDogPetsData}