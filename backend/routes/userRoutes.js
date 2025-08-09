const express = require("express");

const router = express.Router();
const {
  testApi,
  registerUser,
  loginUser,
  secureRoute,
} = require("../controller/userController");
const {authMiddleware } = require('../middleware/AuthMiddleware')
router.get("/test", testApi);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/secure", authMiddleware, secureRoute);

module.exports = router;
