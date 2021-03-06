const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.get("/me", async (req, res) => {
  const user = await User.findById(req.user_id).select("-password");
  res.send(user);
});

router.get("/", async (req, res) => {
  res.send("Register page");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body); // req.body is the user input by client
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

module.exports = router;
