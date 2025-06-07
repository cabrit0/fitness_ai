# Fitness AI API

Uma API Node.js/Express para gestão de fitness com integração à ExerciseDB API.

## 🚀 Funcionalidades

- Autenticação de utilizadores com JWT
- Gestão de atividades e treinos
- Integração com ExerciseDB API para obter exercícios
- Filtros por parte do corpo, músculo alvo e equipamento

## 🔧 Configuração

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
```bash
cp .env.example .env
```

Edite o ficheiro `.env` com os seus valores:
- `RAPIDAPI_KEY`: Obtenha em https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb
- `DATABASE_URI`: String de conexão MongoDB
- `ACCESS_TOKEN_SECRET` e `REFRESH_TOKEN_SECRET`: Chaves JWT seguras

### 3. Executar a Aplicação
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📚 Endpoints da API de Exercícios

### Obter Todos os Exercícios
```
GET /api/v1/exercises/allExercises
```

### Obter Exercício por ID
```
GET /api/v1/exercises/:id
```

### Obter Listas de Filtros
```
GET /api/v1/exercises/allBodyParts
GET /api/v1/exercises/allTargetMuscles
GET /api/v1/exercises/allEquipments
```

### Filtrar Exercícios
```
GET /api/v1/exercises/bodyPart/:bodyPart
GET /api/v1/exercises/target/:targetMuscle
GET /api/v1/exercises/equipment/:equipment
```

## 🔄 Correções Implementadas

### Problemas Corrigidos:
1. **URLs incorretas**: Corrigidos endpoints para usar path parameters em vez de query parameters
2. **Rota incorreta**: Corrigido mapeamento de `/allExercisesByBodyPart`
3. **Métodos HTTP**: Alterado de body parameters para URL parameters
4. **Tratamento de erros**: Padronizado uso de async/await
5. **Validação**: Adicionada validação de parâmetros obrigatórios
6. **Logging**: Adicionado logging de erros para debug

### Melhorias Adicionadas:
- Endpoint para obter exercício por ID
- Códigos de status HTTP apropriados
- Mensagens de erro mais descritivas
- Documentação completa

## 🧪 Testes

Para testar os endpoints:

```bash
# Obter todos os exercícios
curl http://localhost:3500/api/v1/exercises/allExercises

# Obter exercícios por parte do corpo
curl http://localhost:3500/api/v1/exercises/bodyPart/chest

# Obter exercício específico
curl http://localhost:3500/api/v1/exercises/0001
```

## 📝 Notas Técnicas

- A API ExerciseDB requer autenticação via RapidAPI
- Todos os endpoints retornam dados em formato JSON
- Implementado rate limiting e CORS
- Logs de erro são guardados para debugging
