const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");



// test api
// http://localhost:8081/api/v1/inventory/create-inventory
// method :- > POST
// json payload ->
// {
//     "email" :"akshay1@gmail.com",
//     "organisation":"6548ded53ef367461839ba85",
//     "bloogGroup" : "O+",
//     "inventoryType": 20
// }
// Headera Authorization /Authorization : - add your bearer token

const createInventoryController = async (req, res) => {
    try {
        const { email , inventoryType } = req.body;
        // validation
        const user = await userModel.findOne({ email: email })
        if (!user) {
            throw new Error("User not found.")
        }
        console.log("inventoryType,user.role ,req.body =>",inventoryType,user.role ,req.body)
        if(inventoryType === "in" && user.role !== "donar"){
            throw new Error("Not a donor account")
        }
        if(inventoryType === "out" && user.role !== "hospital"){
            throw new Error("Not a hospital account")
        }

        // save record
        const inventory = new inventoryModel(req.body)              
        await inventory.save();
        res.status(200).send({
            message: 'New Blood Record created successfully.',
            success : true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in create inventory API.",
            error: error,
            success: false
        })
    }
}

// GET ALL BLOOD RECORS
const getInventoryController = async (req, res) => {
    console.log("ENTERED");
    try {
      const inventory = await inventoryModel
        .find({
          organisation: req.body.userId,
        })
        .populate("donar")
        .populate("hospital")
        .sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        messaage: "get all records successfully",
        inventory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get All Inventory",
        error,
      });
    }
  };

module.exports = { createInventoryController , getInventoryController }