const mongoose = require('mongoose')

const GroomingSchema = mongoose.Schema({
    petgroomingpackage: {
        type: String,
        // required: true,
    },
    GroomingSesssion: {
        type: [String],
        // required: true,
    },
    ServiceCharge: {
        type: Number,
        // required: true,
    },
    Duration: {
        type: String,
        // required: true
    },
    timeStamb: {
        type: Date, 
        // default: new Date(),
    },
});
const Grooming = mongoose.model('Grooming', GroomingSchema);
module.exports = Grooming;