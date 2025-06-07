# 🧪 Scripts de Teste - Fitness AI

## 📋 Conta de Teste Padrão

O sistema mantém automaticamente uma conta de teste sempre ativa com as seguintes credenciais:

- **Email**: `test@gym.pt`
- **Password**: `testUser`
- **Username**: `testuser`
- **Role**: `User`
- **Status**: Sempre ativo

## 🚀 Funcionamento Automático

### Inicialização do Servidor
Sempre que o servidor é iniciado (`npm start` ou `npm run dev`), o sistema:

1. ✅ Conecta à base de dados MongoDB
2. 🔍 Verifica se a conta de teste existe
3. 🔧 Cria a conta se não existir
4. ✅ Garante que está sempre ativa
5. 📝 Regista o estado no console

### Logs Esperados
```
Connected to MongoDB
🔍 Verificando conta de teste...
✅ Conta de teste já existe e está ativa
Server running at 3500
```

## 🛠️ Execução Manual

### Comando NPM
Para verificar/criar a conta manualmente:
```bash
npm run seed:test
```

### Execução Direta
```bash
node scripts/runSeedTestUser.js
```

## 📊 Dados da Conta de Teste

A conta é criada com os seguintes dados padrão:

```javascript
{
  username: "testuser",
  email: "test@gym.pt",
  password: "testUser", // (hash bcrypt)
  roles: "User",
  active: true,
  personalTrainer: false,
  sexo: "M",
  peso: 70,
  altura: 175,
  idade: 25,
  activities: [],
  workouts: []
}
```

## 🔧 Manutenção

### Reativar Conta
Se a conta for desativada por algum motivo, será automaticamente reativada na próxima inicialização do servidor.

### Resetar Dados
Para resetar completamente a conta de teste:
1. Eliminar o utilizador da base de dados
2. Reiniciar o servidor ou executar `npm run seed:test`

## ⚠️ Notas Importantes

- A conta é **sempre recriada** se não existir
- A conta é **sempre reativada** se estiver inativa
- Os dados são **consistentes** em todas as execuções
- **Não modificar** as credenciais no código sem atualizar a documentação
