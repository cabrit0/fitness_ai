/**
 * Script para testar o login com a conta de teste
 * Execute com: node test-login.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3500/api/v1';

const testLogin = async () => {
  try {
    console.log('🧪 Testando login com conta de teste...');
    console.log('📧 Email: test@gym.pt');
    console.log('🔑 Password: testUser');
    console.log('');

    // Testar login
    const loginResponse = await axios.post(`${BASE_URL}/auth`, {
      email: 'test@gym.pt',
      password: 'testUser'
    });

    if (loginResponse.status === 200) {
      console.log('✅ Login bem-sucedido!');
      console.log('🎫 Token recebido:', loginResponse.data.accessToken ? 'Sim' : 'Não');
      console.log('👤 Utilizador:', loginResponse.data.foundUser.username);
      console.log('📧 Email:', loginResponse.data.foundUser.email);
      console.log('🔒 Ativo:', loginResponse.data.foundUser.active);
      console.log('');

      // Testar endpoint protegido
      const token = loginResponse.data.accessToken;
      console.log('🔐 Testando endpoint protegido...');
      
      try {
        const usersResponse = await axios.get(`${BASE_URL}/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('✅ Acesso a endpoint protegido bem-sucedido!');
        console.log('👥 Número de utilizadores:', usersResponse.data.length);
      } catch (protectedError) {
        console.log('⚠️  Endpoint protegido:', protectedError.response?.status, protectedError.response?.data?.message);
      }

    } else {
      console.log('❌ Login falhou com status:', loginResponse.status);
    }

  } catch (error) {
    console.error('❌ Erro durante o teste:');
    
    if (error.response) {
      console.error('📊 Status:', error.response.status);
      console.error('📝 Mensagem:', error.response.data?.message || 'Erro desconhecido');
    } else if (error.request) {
      console.error('🔌 Erro de rede: Servidor não responde');
      console.error('💡 Certifica-te que o servidor está a correr em http://localhost:3500');
    } else {
      console.error('🐛 Erro:', error.message);
    }
  }
};

console.log('🚀 Iniciando teste de login...');
console.log('🌐 Servidor: http://localhost:3500');
console.log('');

testLogin();
