// backend/routes/api/session.js
const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

//******************** GET CURRENT USER ********************
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

//user login
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  console.log(password);

  const user = await User.login({ credential, password });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
      statusCode: 401,
    });
  }

  await setTokenCookie(res, user);

  const { id, username, email, firstName, lastName } = user;

  res.json({
    user: { id, firstName, lastName, email, username },
  });
  next();
});

//user logout
router.delete("/", (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
