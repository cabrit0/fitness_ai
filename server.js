require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const seedTestUser = require("./scripts/seedTestUser");

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/user/activities", require("./routes/activityRoutes"));
app.use("/api/v1/exercises", require("./routes/exercisesRoutes"));
app.use("/api/v1/user/calendarOptions", require("./routes/calendarRoutes"));
app.use(
  "/api/v1/user/workouts&exercises",
  require("./routes/workoutsExercisesRoutes")
);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 - Not Found" });
  } else {
    res.type("txt").send("404 - Not Found");
  }
});

app.use(errorHandler);

// Iniciar servidor independentemente da conexão MongoDB
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  });
};

mongoose.connection.once("open", async () => {
  console.log("✅ Connected to MongoDB");

  // Garantir que a conta de teste existe e está ativa
  try {
    await seedTestUser();
  } catch (error) {
    console.error("⚠️  Falha ao verificar conta de teste:", error.message);
    console.error("⚠️  O servidor continuará a funcionar, mas a conta de teste pode não estar disponível");
  }

  startServer();
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err.message);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.name}`,
    "mongoErrLog.log"
  );

  // Iniciar servidor mesmo com erro de MongoDB (para desenvolvimento)
  if (process.env.NODE_ENV === 'development') {
    console.log("⚠️  Iniciando servidor em modo desenvolvimento sem MongoDB");
    startServer();
  }
});

// Timeout para iniciar servidor se MongoDB não conectar (útil para desenvolvimento)
setTimeout(() => {
  if (mongoose.connection.readyState === 0) {
    console.log("⏰ Timeout: Iniciando servidor sem MongoDB");
    startServer();
  }
}, 10000); // 10 segundos
