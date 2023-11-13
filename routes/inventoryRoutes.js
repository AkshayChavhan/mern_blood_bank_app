const { createInventoryController , getInventoryController, getDonarsController, getHospitalController, getOrganisationController } = require("../controllers/inventoryController");
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

//GET ORGANISATION RECORDS
router.get("/get-organisation", authMiddleware, getOrganisationController);

module.exports = router ;