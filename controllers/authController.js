// import packages
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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


// test 
// http://localhost:8081/api/v1/auth/login
// type:-> POST
// {
//     "email": "akshay4@gmail.com",
//     "password": "Akshay@123"
// }

const loginController = async (req, res) => {
    try {
        const existUser = await userModel.findOne({
            email: req.body.email
        })

        if (!existUser) {
            return res.status(404).send({
                success: false,
                message: "Invalid credentials."
            })
        }

        // check role
        if (existUser.role !== req.body.role) {
            return res.status(500).send({
                success: false,
                message: "Role doesn't match."
            })
        }

        // compare password
        const comparePwd = await bcrypt.compare(req.body.password, existUser.password)

        if (!comparePwd) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials."
            })
        }

        console.log("existUser => ", existUser);

        // token
        const token = jwt.sign({ userId: existUser._id }, process.env.JWT_SECRET,
            { expiresIn: '1d' })

        // delete password from response
        // Define a function to remove the password field from the object
        function omitPassword(user) {
            if (user && user.toObject) {
                const userObject = user.toObject();
                delete userObject.password;
                return userObject;
            }
            return user;
        }
        return res.status(200).send({
            success: true,
            message: "Successfully login.",
            token,
            existUser: omitPassword(existUser)
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Login API"
        })
    }
}

// GET CURRENT USER
// test 
// http://localhost:8081/api/v1/auth/current-user
// type:-> GET
// {
//     "email": "akshay4@gmail.com",
//     "password": "Akshay@123"
// }
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        return res.status(200).send({
            success: true,
            message: "User fetched successfully.",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Unable to get user"
        })
    }
}


module.exports = { registerController, loginController, currentUserController };

