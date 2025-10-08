const emailValidation = require("../helpers/emailValidation");
const userSchema = require("../model/userSchema");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
async function logInController(req, res) {
   const {email, password} = req.body
  
   const existingUser = await userSchema.findOne({email})
   if (!email) {
     return res.status(400).json({
      success: false,
      message: "plz give your email",
    });
   }
   if (!emailValidation(email)) {
    return res.status(400).json({
      success: false,
      message: "plz give a valied email",
    });
  }
   if (!existingUser) {
     return res.status(400).json({
      success: false,
      message: "This email is not registered",
    });
   }
   if (!existingUser.isVerified) {
     return res.status(400).json({
      success: false,
      message: "plz vevifie your email",
    });
   }

   const isMatch = await bcrypt.compare(password, existingUser.password);

   if (!isMatch) {
      return res.status(400).json({
      success: false,
      message: "password is not matched",
    });
   }

  const accessToken = jwt.sign({
    userid: existingUser._id,
    firstName: existingUser.firstName,
    email: existingUser.email,
    role: existingUser.role
  },
  "ecommerceapi",
  {
    expiresIn: "10m"
  }
 )

   res.status(200).json({
    success: true,
    message: " log in successfull",
    access: accessToken
   })
}
module.exports = logInController