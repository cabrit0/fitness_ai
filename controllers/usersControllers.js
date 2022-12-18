const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc   Get all users
// @route  GET /users
// @Access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc   Create new user
// @route  POST /users
// @Access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles, altura, peso, sexo, idade } = req.body;

  //confirm data
  if (
    !username ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length ||
    !altura ||
    !peso ||
    !sexo ||
    !idade
  ) {
    return res.status(400).json({ message: "All fields must be provided" });
  }

  //Check duplicates      ** use .exec() when async/await and receiving data
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(400).json({ message: "Duplicate username" });
  }

  //hash passwords
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = {
    username,
    password: hashedPwd,
    roles,
    altura,
    peso,
    sexo,
    idade,
  };

  //create user
  const user = await User.create(userObject);

  if (user) {
    //created user
    res.status(201).json({ message: `new user ${username} created` });
  } else {
    res.status(404).json({ message: "Invalid user data received" });
  }
});

// @desc   Update user
// @route  PATCH /users
// @Access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password, workouts } = req.body;
  console.log(id, username, roles, active);

  //confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required except password" });
  }

  const user = await User.findById(id).exec();
  //console.log(user);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //check duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  //allow updates to the original
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    //hash password
    user.password = await bcrypt(password, 10);
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

// @desc   Delete user
// @route  DELETE /users
// @Access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await User.deleteOne();
  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
