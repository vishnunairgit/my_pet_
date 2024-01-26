
const mongoose = require('mongoose');
const cannectPetDB = async ()=>{
    try {
        const connection=await mongoose.connect('mongodb+srv://infovishnunair:vishnunairmypetapp-1@cluster0.fjk4inv.mongodb.net/')
        console.log('My pet MongoDB connected');
    } catch (error) {
            console.log(error);
        
    }
}
module.exports=cannectPetDB


// const mongoose = require('mongoose');

// const connectPetDB = async () => {
//   try {
//     const connection = await mongoose.connect(
//       'mongodb+srv://infovishn:<password>@cluster0.fjk4inv.mongodb.net/MY_PET_FE', 
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log('My pet MongoDB connected');
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = connectPetDB;
