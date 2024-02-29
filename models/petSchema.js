
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
        required: true,
    },
    petName: {
        type: String,
        // required: true,
    },
    petDateofbirth: {
        type: Date,
        // required: true,
    },
    petPrice: {
        type: Number,
        // required: true,
    },
    petColour: {
        type: String,
        // required: true,
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
    petAdoptedBy:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    paymentOrders: [
        {
          userId: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true,
          },
          razorpayPaymentId: {
            type: String,
            required: true,
          },
          timeStamb: {
            type: Date,
            default: Date.now,
          },
        },
      ],
   
});

const pets = mongoose.model('pets', petsSchema);
module.exports = pets;

// //  petAdoptedBy: {
//     type: mongoose.Schema.Types.ObjectId, // Assuming it's an ObjectId, adjust the type accordingly
//     ref: 'User', // Assuming it's a reference to the User model, adjust the ref accordingly
//   },

// let fileData = new FormData();
