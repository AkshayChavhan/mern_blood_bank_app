const { createInventoryController } = require("../controllers/inventoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");



const router = express.Router();

// routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController)


module.exports = router ;