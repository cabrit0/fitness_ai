# 🚀 Guia de Deployment - Render

## 📋 Pré-requisitos

### 1. MongoDB Atlas (Base de Dados Cloud)
1. Vai a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Cria uma conta gratuita
3. Cria um cluster gratuito
4. Configura acesso:
   - **Database Access**: Cria um utilizador com password
   - **Network Access**: Adiciona `0.0.0.0/0` (permitir todos os IPs)
5. Obtém a connection string: `mongodb+srv://username:password@cluster.mongodb.net/fitness_ai`

### 2. Render Account
1. Vai a [Render](https://render.com)
2. Cria conta (pode usar GitHub)

## 🔧 Deployment no Render

### Passo 1: Conectar Repositório
1. No dashboard do Render, clica **"New +"**
2. Seleciona **"Web Service"**
3. Conecta o teu repositório GitHub

### Passo 2: Configurar Serviço
- **Name**: `fitness-ai-api`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

### Passo 3: Variáveis de Ambiente
No dashboard do Render, adiciona estas variáveis:

```
NODE_ENV=production
PORT=10000
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness_ai
ACCESS_TOKEN_SECRET=<gerar_chave_segura>
REFRESH_TOKEN_SECRET=<gerar_chave_segura>
```

**Para gerar chaves JWT seguras:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Passo 4: Deploy
1. Clica **"Create Web Service"**
2. O Render fará o deploy automaticamente
3. Aguarda conclusão (5-10 minutos)

## ✅ Verificação

### URLs Esperadas
- **API**: `https://fitness-ai-api.onrender.com`
- **Health Check**: `https://fitness-ai-api.onrender.com/`

### Testar Endpoints
```bash
# Verificar se API está online
curl https://fitness-ai-api.onrender.com/

# Criar conta de teste
curl -X POST https://fitness-ai-api.onrender.com/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "roles": "User",
    "sexo": "M",
    "peso": 70,
    "altura": 175,
    "idade": 25
  }'

# Login
curl -X POST https://fitness-ai-api.onrender.com/api/v1/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@gym.pt",
    "password": "testUser"
  }'
```

## 🔧 Troubleshooting

### Problemas Comuns

1. **"Application failed to respond"**
   - Verifica se PORT está definido como `10000`
   - Verifica logs no dashboard do Render

2. **"Database connection failed"**
   - Verifica connection string do MongoDB Atlas
   - Confirma que Network Access permite `0.0.0.0/0`

3. **"Build failed"**
   - Verifica se `package.json` tem script `start`
   - Confirma que todas as dependências estão listadas

### Logs
- Acede aos logs no dashboard do Render
- Procura por erros de conexão ou startup

## 📝 Notas Importantes

- **Cold Starts**: Render Free tier tem cold starts (demora ~30s para acordar)
- **Sleep Mode**: Serviço dorme após 15min de inatividade
- **Conta de Teste**: Será criada automaticamente no primeiro startup
- **CORS**: Já configurado para aceitar requests do frontend
