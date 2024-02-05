// const { response } = require('../app')
const { token } = require("morgan");
const USERS = require("../models/userModels");
// password hashing
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require('jsonwebtoken');


const doSignUp = async (req, res) => {
  try {
    // console.log(req.body,'signup data'); frond end sending  details we ll get here.

    // to checking  the email is already used or not
    const users = await USERS.findOne({ email: req.body.email });
    if (users) {
      res.status(200).json({ message: "email is already exist" });
      return;
    }

    // password hashing function
    const hash = await bcrypt.hash(req.body.password, saltRounds);

    // Now we can store the password hash in db.
    const response = await USERS({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      // confirmPassword:req.body.confirmPassword
    }).save();

    res.status(200).json({ message: "signUp successful" });
  } catch (error) {
    console.error("Error during signUp:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const doLogin = async (req, res) => {
  // console.log(req.body, "-----logindata------1--");
  // USERS.updateOne({_id:'6592a73ff369e26a561a5d2f'},{$set:{'role':1}}).then((response)=>{
  //   console.log(response,'---res----');
  // })
  try {
    const user = await USERS.findOne({ email: req.body.email });
    console.log(user, "-----user----2---");

    if (user) {
      // Checking password: comparing the database password and user-entered password
      const hashRes = await bcrypt.compare(req.body.password, user.password);
      // console.log(hashRes,"-----password correct--3--");

      if (hashRes) {
        // console.log("Password correct-----4----");

        // Generating JWT Token
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user?.role,
          },
          process.env.JWT_PASSWORD,
          { expiresIn: '1d' }
        );
        // console.log(token,'----tocken---- step-5');
        // befour passing / storing user dettails to localStorage we need to hide the password
        user.password=undefined
        res.status(200).json({ message:"Login successful", token , user });
      } else {
        // console.log("Password incorrect------4-----");
        res.status(200).json({ message: "Invalid user credentials", token: null });
      }
    } else {
      res.status(200).json({ message: "Invalid user credentials", token: null });
    }
  } catch (error) {
    // console.error('Error During Login:', error);
    res.status(500).json({ message: 'Internal server error', token: null });
  }
};


module.exports = { doSignUp, doLogin }
