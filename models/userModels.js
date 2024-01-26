const mongoose=require ('mongoose')
const userSchema=mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:Number,
        required:true,
        default:3
    },
    password:{
        type:String,
        required:true
    },
    // confirmPassword:{
    //     type:String,
    //     required:true
    // }
})


const users=mongoose.model('users',userSchema)
module.exports=users

// admin-1
// seller-2
// buyer-3