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
  const {
    username,
    password,
    email,
    roles,
    altura,
    peso,
    sexo,
    idade,
    personalTrainer,
  } = req.body;

  //confirm data
  if (
    !username ||
    !password ||
    !email ||
    !roles ||
    !altura ||
    !peso ||
    !sexo ||
    !idade
  ) {
    return res.status(400).json({ message: "All fields must be provided" });
  }

  //console.log(username, password, email, roles, altura, peso, sexo, idade)

  //Check duplicates      ** use .exec() when async/await and receiving data
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(400).json({ message: "Duplicate username" });
  }

  //hash passwords
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = {
    username,
    email,
    password: hashedPwd,
    roles,
    altura,
    peso,
    sexo,
    idade,
    personalTrainer,
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
  const {
    id,
    username,
    email,
    roles,
    active,
    password,
    personalTrainer,
    sexo,
    peso,
    altura,
    idade,
  } = req.body;
  console.log(req.body);

  //confirm data
  if (
    !id ||
    !username ||
    !roles ||
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
  user.email = email;
  user.roles = roles;
  user.active = active;
  user.personalTrainer = req.body.personalTrainer;
  user.sexo = req.body.sexo;
  user.peso = req.body.peso;
  user.altura = req.body.altura;
  user.idade = req.body.idade;

  if (password) {
    //hash password
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

// @desc   Delete user
// @route  DELETE /users
// @Access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(id);
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await User.findByIdAndDelete(id);
  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

// @desc   Get user by name
// @route  GET /users
// @Access Private
const getUserByName = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //console.log(name);
  // Check if user exists
  const user = await User.findOne({ username: name })
    .select("-password")
    .lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// @desc   Get user by ID
// @route  GET /users
// @Access Private
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  // Check if user exists
  const user = await User.findById(id).select("-password").lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByName,
};
