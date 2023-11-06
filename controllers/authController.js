// import packages
const bcrypt = require("bcryptjs");


// import files
const userModel = require("../models/userModel.js");


// test 
// http://localhost:8081/api/v1/auth/register
// type:-> POST
// {
//     "role": "hospital",
//     "name": "mustangcruise",
//     "email": "akshay4@gmail.com",
//     "password": "Akshay@123",
//     "address": "Umari",
//     "phone": "324343253",
//     "hospitalName": "ersfewdewq"
// }
const registerController = async (req, res) => {
    try {
      const exisitingUser = await userModel.findOne({ email: req.body.email });

      //validation
      if (exisitingUser) {
        return res.status(200).send({
          success: false,
          message: "User ALready exists",
        });
      }

      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;

      //rest data
      const user = new userModel(req.body);
      await user.save();
      return res.status(201).send({
        success: true,
        message: "User Registerd Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
      });
    }
  };

module.exports = { registerController } ;

