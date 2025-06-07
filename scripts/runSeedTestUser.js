require("dotenv").config();
const connectDB = require("../config/dbConn");
const seedTestUser = require("./seedTestUser");
const mongoose = require("mongoose");

// Capturar erros não tratados
process.on('unhandledRejection', (reason, promise) => {
  console.error("❌ Erro durante o processo:");

  if (reason.name === "MongooseServerSelectionError" ||
      reason.message.includes("ECONNREFUSED") ||
      reason.message.includes("MongoNetworkError")) {
    console.error("🔌 MongoDB não está a correr ou não está acessível");
    console.error("💡 Certifica-te que o MongoDB está instalado e a correr em localhost:27017");
    console.error("💡 Ou atualiza a DATABASE_URI no ficheiro .env");
  } else {
    console.error(reason.message || reason);
  }

  process.exit(1);
});

/**
 * Script standalone para criar/verificar a conta de teste
 * Uso: npm run seed:test
 */
const runSeed = async () => {
  try {
    console.log("🚀 Iniciando verificação da conta de teste...");

    // Conectar à base de dados com timeout
    try {
      await connectDB();

      // Aguardar conexão
      await new Promise((resolve, reject) => {
        mongoose.connection.once("open", () => {
          resolve();
        });

        mongoose.connection.once("error", (err) => {
          reject(err);
        });
      });

      console.log("📡 Conectado à base de dados");

      // Executar seed
      await seedTestUser();

      console.log("🎉 Processo concluído com sucesso!");

    } catch (dbError) {
      console.error("❌ Erro durante o processo:");

      if (dbError.name === "MongooseServerSelectionError" ||
          dbError.message.includes("ECONNREFUSED") ||
          dbError.message.includes("MongoNetworkError")) {
        console.error("🔌 MongoDB não está a correr ou não está acessível");
        console.error("💡 Certifica-te que o MongoDB está instalado e a correr em localhost:27017");
        console.error("💡 Ou atualiza a DATABASE_URI no ficheiro .env");
      } else {
        console.error(dbError.message);
      }

      throw dbError;
    }

  } catch (error) {
    process.exit(1);
  } finally {
    // Fechar conexão se estiver aberta
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("📡 Conexão à base de dados fechada");
    }
    process.exit(0);
  }
};

runSeed();
