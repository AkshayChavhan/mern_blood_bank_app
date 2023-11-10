const { createInventoryController , getInventoryController, getDonarsController, getHospitalController } = require("../controllers/inventoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");



const router = express.Router();

// routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController)


// GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddleware, getInventoryController)


// GET ALL BLOOD RECORDS
router.get("/get-donars", authMiddleware, getDonarsController)


//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddleware, getHospitalController);

module.exports = router ;