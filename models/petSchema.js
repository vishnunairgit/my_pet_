// const mongoose=require('mongoose')
// const petsSchema=mongoose.Schema({

//     petType:{
//         type:String,
//         enum:['DOG','CAT','BRIDS','FISH','OTHER PETS'],
//         required:true,
//     },
//     petBreeds:{
//         type:String,
//         required:true,
//     },
//     petGender:{
//         type:String,
//         // enum:['MALE','FEMALE'],
//         required:true
//     },
//     petName:{
//         type:String,
//         required:true
//     },
//     petDateofbirth:{
//         type:Date,
//         required:true
//     },
//     petPrice:{
//         type:Number,
//         required:true
//     },
//     petColour:{
//         type:String,
//         required:true
//     },
//     petThumbUpload:{
//         type:String,
//         // required:true
//     },
//     // petImages:{
//     //     type:[String],

//     //     // required:true

//     // },
//     // petVideos:{
//     //     type:[String],

//     //     // required:true
//     // },
//     // petPdfs:{
//     //     type:[String],

//     //     // required:true
//     // },
//     timeStamb:{
//         type:Date,
//         default:new Date(),
//     }

// })

// const pets=mongoose.model('pets',petsSchema)
// module.exports=pets

const mongoose = require('mongoose');

const petsSchema = mongoose.Schema({
    petType: {
        type: String,
        enum: ['DOG', 'CAT', 'BRIDS', 'FISH', 'OTHER PETS'],
        required: true,
    },
    petBreeds: {
        type: String,
        required: true,
    },
    petGender: {
        type: String,
        // enum:['MALE','FEMALE'],
        required: true,
    },
    petName: {
        type: String,
        required: true,
    },
    petDateofbirth: {
        type: Date,
        required: true,
    },
    petPrice: {
        type: Number,
        required: true,
    },
    petColour: {
        type: String,
        required: true,
    },
    petThumbUpload: {
        type: String,
        // required:true
    },
    petImageUpload: [
        {
            type: String,
            // required: true,
        },
    ],
    petVideoUpload: [
        {
            type: String,
            // required: true,
        },
    ],
    petPdfUpload: [
        {
            type: String,
            // required: true,
        },
    ],
    timeStamb: {
        type: Date,
        default: new Date(),
    },
});

const pets = mongoose.model('pets', petsSchema);
module.exports = pets;
