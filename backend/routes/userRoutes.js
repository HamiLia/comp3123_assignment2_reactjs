const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { handleValidation } = require("../middleware/validate");
const userController = require("../controllers/userController");

router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("username required"),
    body("email").isEmail().withMessage("valid email required"),
    body("password").isLength({ min: 6 }).withMessage("password min 6 chars"),
  ],
  handleValidation,
  userController.signup
);

router.post(
  "/login",
  [
    body().custom((body) => {
      if (!body.email && !body.username)
        throw new Error("email or username required");
      if (!body.password) throw new Error("password required");
      return true;
    }),
  ],
  handleValidation,
  userController.login
);

module.exports = router;
