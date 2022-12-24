const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    roles: [String],
    active: {
      type: Boolean,
      default: true,
    },
    activities: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    personalTrainer: {
      type: Boolean,
      default: false,
    },
    sexo: {
      type: String,
      required: true,
    },
    peso: {
      type: Number,
      required: true,
    },
    altura: {
      type: Number,
      required: true,
    },
    idade: {
      type: Number,
      required: true,
    },
    workouts: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        exercises: [
          {
            name: {
              type: String,
              required: true,
            },
            bodyPart: {
              type: String,
              required: true,
            },
            target: {
              type: String,
              required: true,
            },
            equipment: {
              type: String,
              required: true,
            },
            animatedGif: {
              type: String,
              required: true,
            },
          },
        ],
        reps: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
