// backend/routes/api/users.js
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters"),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required"),
  check("username").not().isEmail().withMessage("Username cannot be an email"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last name is required"),
  handleValidationErrors,
];

router.post("/", validateSignup, async (req, res, next) => {
  const { email, username, password, firstName, lastName } = req.body;

  try {
    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      const err = new Error("User already exists");
      err.status = 403;
      err.errors = { email: "User with that email already exists" };
      next(err);
    }

    const usernameExists = await User.findOne({ where: { username } });

    if (usernameExists) {
      const err = new Error("User already exists");
      err.status = 403;
      err.errors = { username: "User with that username already exists" };
      next(err);
    }

    const user = await User.signup({
      email,
      username,
      password,
      firstName,
      lastName,
    });

    const token = await setTokenCookie(res, user);

    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
