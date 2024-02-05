const { json } = require('express');
const jwt =require('jsonwebtoken')

const userAuth=(req,res,next)=>{
    try {
                    // Authorization we are saving, "Bearer" and "token".  
                    //  Bearer is in first position.(first postion is 0)[0]. and tockn in second position. that is [1]. here we are splitting the tokn in the Authorization .        
       const token =req.headers["authorization"].split(' ')[1]
    //    console.log(token);
        jwt.verify(token,process.env.JWT_PASSWORD, (err, decodedToken) => {
            // console.log(decodedToken, '-----decodedToken-------');
            if (decodedToken) {
                req.userId=decodedToken.userId
                next()
            }else{
                res.status(401).json({message:'unauthorized user'})
            }
        })

    } catch (error) {
        console.log(error);
        
    }
}

const adminAuth=(req,res,next)=>{
    try {
                    // Authorization we are saving, "Bearer" and "token".  
                    //  Bearer is in first position.(first postion is 0)[0]. and tockn in second position. that is [1]. here we are splitting the tokn in the Authorization .        
       const token =req.headers["authorization"].split(' ')[1]
    //    console.log(token);
        jwt.verify(token,process.env.JWT_PASSWORD, (err, decodedToken) => {
            console.log(decodedToken, '-----decodedToken-------');
            if (decodedToken && decodedToken.role === 1  ) {
                req.userId=decodedToken.userId
                next()
            }else{
                res.status(401).json({message:'unauthorized user'})
            }
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({message:'unauthorized user'})
        
    }
}





module.exports={userAuth,adminAuth}