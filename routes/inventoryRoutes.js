const { createInventoryController , getInventoryController } = require("../controllers/inventoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");



const router = express.Router();

// routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController)


// GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddleware, getInventoryController)


module.exports = router ;