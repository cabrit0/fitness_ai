/**
 * Script simples para testar a conexão ao MongoDB
 * Execute com: node test-mongodb-connection.js
 */

const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('🔍 Testando conexão ao MongoDB...');
    
    // Conectar ao MongoDB local
    await mongoose.connect('mongodb://localhost:27017/test', {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB está a funcionar!');
    console.log('📡 Conexão estabelecida com sucesso');
    
    // Testar operação básica
    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    // Criar um documento de teste
    const testDoc = new TestModel({ name: 'Teste de conexão' });
    await testDoc.save();
    
    console.log('✅ Operação de escrita bem-sucedida');
    
    // Ler o documento
    const found = await TestModel.findOne({ name: 'Teste de conexão' });
    console.log('✅ Operação de leitura bem-sucedida:', found.name);
    
    // Limpar teste
    await TestModel.deleteOne({ name: 'Teste de conexão' });
    console.log('✅ Limpeza concluída');
    
    console.log('🎉 MongoDB está totalmente funcional!');
    
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:');
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('🔌 MongoDB não está a correr ou não está acessível');
      console.error('💡 Certifica-te que:');
      console.error('   - MongoDB está instalado');
      console.error('   - O serviço MongoDB está a correr');
      console.error('   - A porta 27017 está disponível');
    } else {
      console.error(error.message);
    }
  } finally {
    // Fechar conexão
    await mongoose.connection.close();
    console.log('📡 Conexão fechada');
    process.exit(0);
  }
};

testConnection();
