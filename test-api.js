/**
 * Script de teste simples para verificar os endpoints da API de exercícios
 * Execute com: node test-api.js
 * 
 * Nota: Este script requer que o servidor esteja a correr e que tenha
 * um token JWT válido configurado.
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3500/api/v1/exercises';

// Substitua por um token JWT válido
const JWT_TOKEN = 'your_jwt_token_here';

const headers = {
  'Authorization': `Bearer ${JWT_TOKEN}`,
  'Content-Type': 'application/json'
};

async function testEndpoints() {
  console.log('🧪 Testando endpoints da API de exercícios...\n');

  const tests = [
    {
      name: 'Obter todas as partes do corpo',
      url: `${BASE_URL}/allBodyParts`,
      method: 'GET'
    },
    {
      name: 'Obter todos os músculos alvo',
      url: `${BASE_URL}/allTargetMuscles`,
      method: 'GET'
    },
    {
      name: 'Obter todos os equipamentos',
      url: `${BASE_URL}/allEquipments`,
      method: 'GET'
    },
    {
      name: 'Obter exercícios por parte do corpo (chest)',
      url: `${BASE_URL}/bodyPart/chest`,
      method: 'GET'
    },
    {
      name: 'Obter exercícios por músculo alvo (pectorals)',
      url: `${BASE_URL}/target/pectorals`,
      method: 'GET'
    },
    {
      name: 'Obter exercícios por equipamento (barbell)',
      url: `${BASE_URL}/equipment/barbell`,
      method: 'GET'
    },
    {
      name: 'Obter exercício por ID (0001)',
      url: `${BASE_URL}/0001`,
      method: 'GET'
    }
  ];

  for (const test of tests) {
    try {
      console.log(`📋 ${test.name}...`);
      
      const response = await axios({
        method: test.method,
        url: test.url,
        headers: headers,
        timeout: 10000
      });

      if (response.status === 200) {
        console.log(`✅ Sucesso! Status: ${response.status}`);
        if (Array.isArray(response.data)) {
          console.log(`   📊 Retornou ${response.data.length} itens`);
        } else {
          console.log(`   📊 Retornou objeto único`);
        }
      } else {
        console.log(`⚠️  Status inesperado: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        console.log(`❌ Erro ${error.response.status}: ${error.response.data?.message || 'Erro desconhecido'}`);
      } else if (error.request) {
        console.log(`❌ Erro de rede: Servidor não responde`);
      } else {
        console.log(`❌ Erro: ${error.message}`);
      }
    }
    console.log('');
  }

  console.log('🏁 Testes concluídos!');
}

// Verificar se o token foi configurado
if (JWT_TOKEN === 'your_jwt_token_here') {
  console.log('⚠️  AVISO: Configure um token JWT válido na variável JWT_TOKEN');
  console.log('   Para obter um token, faça login através do endpoint /api/v1/auth/login');
  console.log('');
}

testEndpoints().catch(console.error);
