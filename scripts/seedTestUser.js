const User = require("../models/User");
const bcrypt = require("bcrypt");

/**
 * Cria ou verifica a conta de teste padrão do sistema
 * Email: test@gym.pt
 * Password: testUser
 */
const seedTestUser = async () => {
  try {
    const testEmail = "test@gym.pt";
    const testPassword = "testUser";

    console.log("🔍 Verificando conta de teste...");

    // Verificar se a conta de teste já existe
    let testUser = await User.findOne({ email: testEmail }).exec();

    if (testUser) {
      // Se existe, garantir que está ativa
      if (!testUser.active) {
        testUser.active = true;
        await testUser.save();
        console.log("✅ Conta de teste reativada");
      } else {
        console.log("✅ Conta de teste já existe e está ativa");
      }
      return testUser;
    }

    // Se não existe, criar a conta
    console.log("🔧 Criando conta de teste...");

    const hashedPassword = await bcrypt.hash(testPassword, 10);

    const testUserData = {
      username: "testuser",
      email: testEmail,
      password: hashedPassword,
      roles: "User", // Role padrão
      active: true,
      personalTrainer: false,
      sexo: "M",
      peso: 70,
      altura: 175,
      idade: 25,
      activities: [],
      workouts: []
    };

    testUser = await User.create(testUserData);

    console.log("✅ Conta de teste criada com sucesso!");
    console.log(`📧 Email: ${testEmail}`);
    console.log(`🔑 Password: ${testPassword}`);

    return testUser;

  } catch (error) {
    console.error("❌ Erro ao criar/verificar conta de teste:", error.message);

    // Se for erro de duplicação, tentar encontrar o utilizador existente
    if (error.code === 11000) {
      console.log("🔄 Tentando encontrar conta existente...");
      const existingUser = await User.findOne({ email: testEmail }).exec();
      if (existingUser) {
        console.log("✅ Conta de teste encontrada");
        return existingUser;
      }
    }

    throw error;
  }
};

module.exports = seedTestUser;
