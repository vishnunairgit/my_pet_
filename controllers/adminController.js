
const PETS = require('../Models/petSchema')




const addPetData=async (req,res)=>{
    console.log("hii");
    await PETS({petType:req.query.petType,
        petBreeds:req.query.petBreeds,
        petGender:req.query.petGender,
        petName:req.query.petName,
        petDateofbirth:req.query.petDateofbirth,
        petPrice:req.query.petPrice,
        petColour:req.query.petColour,
        petThumb:req.file.filename,
        petImageUpload:req.file.filename,
        petvideoUpload:req.file.filename,
        petPdfUpload:req.file.filename,
    }).save()

}

module.exports={addPetData}