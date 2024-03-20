
const mongoose = require('mongoose');

const cannectPetDB = async ()=>{
    try {
        const connection=await mongoose.connect('mongodb+srv://vishnunair:smMP1bQuWCfytHvl@cluster0.fjk4inv.mongodb.net/')
        console.log('My pet MongoDB connected');
    } catch (error) {
            console.log(error);
        
    }
}
module.exports=cannectPetDB



