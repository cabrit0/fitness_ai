const express = require("express");
const asyncHandler = require("express-async-handler");
const axios = require("axios");

// @desc Get all exercises
// @route  GET exercises/allExercises
// @Access Private
const getAllExercises = asyncHandler(async (req, res) => {
  const apiKey = process.env.RAPIDAPI_KEY;

  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    headers: {
      "Accept-Encoding": "gzip,deflate,compress",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching all exercises:", error.message);
    res.status(500).json({
      message: "Failed to fetch exercises",
      error: error.message
    });
  }
});

// @desc Get all bodyParts
// @route  GET exercises/allBodyParts
// @Access Private
const getAllBodyParts = asyncHandler(async (req, res) => {
  const apiKey = process.env.RAPIDAPI_KEY;

  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
    headers: {
      "Accept-Encoding": "gzip,deflate,compress",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching body parts:", error.message);
    res.status(500).json({
      message: "Failed to fetch body parts",
      error: error.message
    });
  }
});

// @desc Get all targetMuscles
// @route  GET exercises/allTargetMuscles
// @Access Private
const getAllTargetMuscles = asyncHandler(async (req, res) => {
  const apiKey = process.env.RAPIDAPI_KEY;

  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/targetList",
    headers: {
      "Accept-Encoding": "gzip,deflate,compress",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching target muscles:", error.message);
    res.status(500).json({
      message: "Failed to fetch target muscles",
      error: error.message
    });
  }
});

// @desc Get all equipment
// @route  GET exercises/allEquipments
// @Access Private
const getAllEquipments = asyncHandler(async (req, res) => {
  const apiKey = process.env.RAPIDAPI_KEY;

  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/equipmentList",
    headers: {
      "Accept-Encoding": "gzip,deflate,compress",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching equipment list:", error.message);
    res.status(500).json({
      message: "Failed to fetch equipment list",
      error: error.message
    });
  }
});

const getExercisesByBodyPart = asyncHandler(async (req, res) => {
  const { bodyPart } = req.params;
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!bodyPart) {
    return res.status(400).json({ message: "Body part parameter is required" });
  }

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
    headers: {
      "Accept-Encoding": "gzip,deflate,compress",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching exercises by body part:", error.message);
    res.status(500).json({
      message: "Failed to fetch exercises by body part",
      error: error.message
    });
  }
});

const getExercisesByTargetMuscle = asyncHandler(async (req, res) => {
  const { targetMuscle } = req.params;
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!targetMuscle) {
    return res.status(400).json({ message: "Target muscle parameter is required" });
  }

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/target/${targetMuscle}`,
    headers: {
      "Accept-Encoding": "gzip,deflate,compress",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching exercises by target muscle:", error.message);
    res.status(500).json({
      message: "Failed to fetch exercises by target muscle",
      error: error.message
    });
  }
});

const getExercisesByEquipment = asyncHandler(async (req, res) => {
  const { equipment } = req.params;
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!equipment) {
    return res.status(400).json({ message: "Equipment parameter is required" });
  }

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}`,
    headers: {
      "Accept-Encoding": "gzip,deflate,compress",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching exercises by equipment:", error.message);
    res.status(500).json({
      message: "Failed to fetch exercises by equipment",
      error: error.message
    });
  }
});

// @desc Get exercise by ID
// @route  GET exercises/:id
// @Access Private
const getExerciseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!id) {
    return res.status(400).json({ message: "Exercise ID parameter is required" });
  }

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
    headers: {
      "Accept-Encoding": "gzip,deflate,compress",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching exercise by ID:", error.message);
    res.status(500).json({
      message: "Failed to fetch exercise by ID",
      error: error.message
    });
  }
});

module.exports = {
  getAllExercises,
  getAllBodyParts,
  getAllTargetMuscles,
  getAllEquipments,
  getExercisesByTargetMuscle,
  getExercisesByBodyPart,
  getExercisesByEquipment,
  getExerciseById,
};
