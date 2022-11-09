const authController = require("../controllers/authControllers");
const router = require("express").Router();

// Register
router.post("/register", authController.registerUser);

// Login
router.post("/login", authController.loginUser);

// Refresh
router.post("/refresh", authController.requestRefreshToken);
module.exports = router;
