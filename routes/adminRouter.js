
var express = require('express');
const { addPetData, SubmitEditPet, deletePet, addGrooming } = require('../controllers/adminController');
const multer = require('multer');
const { adminAuth } = require('../middlewares/Authorization');
var router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/PetFiles');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    }
});
 
// Define multer upload middleware for handling multiple files
const upload = multer({ storage: fileStorage }).fields([
    { name: 'PetThumbnail', maxCount: 1 },
    { name: 'PetImage', maxCount: 1 },
    { name: 'PetVideo', maxCount: 1 },
    { name: 'PetPdf', maxCount: 1 },
]);


// grooming section


router.post('/addPetData', adminAuth, upload, addPetData);
router.post('/SubmitEditPet', adminAuth, upload, SubmitEditPet);
router.delete('/deletePet', adminAuth, upload, deletePet);

router.post('/addGrooming', adminAuth, upload, addGrooming);




module.exports = router;
