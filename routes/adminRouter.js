var express = require('express');
const { addPetData } = require('../controllers/adminController');
const multer = require('multer');
var router = express.Router();


const fileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/PetFiles')
    },
    filename:(req,file,callback)=>{
        callback(null,Date.now()+"-"+file.originalname)
    }
})
const upload = multer({ storage: fileStorage });

router.post('/addPetData',upload.single('ImagePet'), addPetData)


module.exports=router;