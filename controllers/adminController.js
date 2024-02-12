

const PETS = require('../Models/petSchema');
// const { response } = require('../app');
// const { resource } = require('../app');

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

        // console.log(req.query, '----pet basic information----');
        // console.log(req.files, '-----filedata');

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

const SubmitEditPet = (req, res) => {
    const {
        _id,
        petType,
        petBreeds,
        petGender,
        petName,
        petDateofbirth,
        petPrice,
        petColour,
        petThumbUpload, // Updated field for thumbnail
        petImageUpload,
        petVideoUpload,
        petPdfUpload,
    } = req.body;

    PETS.findByIdAndUpdate(_id, {
        petType,
        petBreeds,
        petGender,
        petName,
        petDateofbirth,
        petPrice,
        petColour,
        petThumbUpload, // Assigning the updated thumbnail
        petImageUpload,
        petVideoUpload,
        petPdfUpload,
    }, { new: true })
    .then((updatedPet) => {
        res.status(200).json({ updatedPet });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    });

}

const deletePet = async (req, res) => {
    try {
        const { petId } = req.query;

        const deletedPet = await PETS.findByIdAndDelete({petId});

        if (!deletedPet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        console.error('Error deleting pet:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




module.exports = { addPetData , SubmitEditPet, deletePet };
