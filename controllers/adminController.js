
// const PETS = require('../Models/petSchema')

// const addPetData=async (req,res)=>{
//     try {

//         const {petType, petBreeds, petGender, petName, petDateofbirth, petPrice, petColour} = req.query;
//         const petThumbUpload=req.file.filename;

//         console.log(req.query,'----pet basic information----');
//         console.log(req.file.filename,'-----filedata');

//         await PETS({
//             petType,
//             petBreeds,
//             petGender,
//             petName,
//             petDateofbirth,
//             petPrice,
//             petColour,
//             petThumbUpload,
//         }).save();
//         res.status(201).json({ message: 'Pet data added successfully' });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }
// module.exports={addPetData}

const PETS = require('../Models/petSchema');

const addPetData = async (req, res) => {
    try {
        const {
            petType,
            petBreeds,
            petGender,
            petName,
            petDateofbirth,
            petPrice,
            petColour,
        } = req.query;

        const {
            PetThumbnail,
            PetImage,
            PetVideo,
            PetPdf,
        } = req.files;

        console.log(req.query, '----pet basic information----');
        console.log(req.files, '-----filedata');

        // Assuming these files are not mandatory, so check if they exist before using their filenames
        const petThumbUpload = PetThumbnail ? PetThumbnail[0].filename : '';
        const petImageUpload = PetImage ? PetImage[0].filename : '';
        const petVideoUpload = PetVideo ? PetVideo[0].filename : '';
        const petPdfUpload = PetPdf ? PetPdf[0].filename : '';

        await PETS({
            petType,
            petBreeds,
            petGender,
            petName,
            petDateofbirth,
            petPrice,
            petColour,
            petThumbUpload,
            petImageUpload,
            petVideoUpload,
            petPdfUpload,
        }).save();
        res.status(201).json({ message: 'Pet data added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addPetData };
