const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //line removes mongo error
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.DATABASE_URI, {
      serverSelectionTimeoutMS: 10000, // 10 segundos timeout
      socketTimeoutMS: 45000, // 45 segundos
    });
  } catch (err) {
    console.error("❌ Erro ao conectar à base de dados:", err.message);
    throw err;
  }
};

module.exports = connectDB;
