const express = require("express");
const authController = require("../controllers/authController")
// const validatePassword = require("../middleware/validate");
const { registerValidation } = require("../middleware/validate");

const authRoutes = express.Router();



authRoutes.post("/register", registerValidation, authController.registerController);

authRoutes.get("/verify-email/:token",authController.verifyEmailController);


authRoutes.post("/login",authController.loginController);


authRoutes.post("/logout",authController.logoutController);
module.exports = authRoutes;