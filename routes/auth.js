const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Perform validation using Joi

  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user is already in the database

  const emailExist = await User.findOne({ email });
  if (emailExist)
    return res
      .status(400)
      .send("A user with the specified email already exists.");

  // Hash passwords

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser._id);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email or password is incorrect.");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).send("Email or password is incorrect.");

  // Create and assign a token
  // Use this on the front-end to know if the user is logged in
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
