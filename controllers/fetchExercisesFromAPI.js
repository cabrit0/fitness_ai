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

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json({ message: error.message });
    });
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

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json({ message: error.message });
    });
});

// @desc Get all targetMuscles
// @route  GET exercises/allBodyParts
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

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json({ message: error.message });
    });
});

// @desc Get all equipment
// @route  GET exercises/allEquipment
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

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json({ message: error.message });
    });
});

const getExercisesByBodyPart = asyncHandler(async (req, res) => {
  const bodyPart = req.body.bodyPart;
  const apiKey = process.env.RAPIDAPI_KEY;

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises?bodypart=${bodyPart}`,
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
    res.json({ message: error.message });
  }
});

const getExercisesByTargetMuscle = asyncHandler(async (req, res) => {
  const targetMuscle = req.body.targetMuscle;
  const apiKey = process.env.RAPIDAPI_KEY;

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises?target=${targetMuscle}`,
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
    res.json({ message: error.message });
  }
});

const getExercisesByEquipment = asyncHandler(async (req, res) => {
  const equipment = req.body.equipment;
  const apiKey = process.env.RAPIDAPI_KEY;

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises?equipment=${equipment}`,
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
    res.json({ message: error.message });
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
};
