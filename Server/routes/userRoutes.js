const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

// Route for fetching user profile data
router.get("/profile", authenticateToken, getUserProfile);

// Route for updating user profile data
router.put("/profile", authenticateToken, updateUserProfile);

module.exports = router;
