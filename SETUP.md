# Guia de Configuração - Lugano

## Passo a Passo para Iniciar o Projeto

### 1. Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Crie o arquivo .env (copie o conteúdo abaixo)
# DATABASE_URL="file:./dev.db"
# JWT_SECRET="seu_jwt_secret_super_seguro_aqui_mude_em_producao"
# WHATSAPP_NUMBER="5511999999999"
# PORT=3000
# CORS_ORIGIN="http://localhost:5173"

# Configure o Prisma
npm run prisma:generate
npm run prisma:migrate

# (Opcional) Crie dados de exemplo
npm run seed

# Inicie o servidor
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### 2. Frontend

```bash
# Em outro terminal, entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

### 3. Acessar o Sistema

- **Site Público**: http://localhost:5173
- **Painel Admin**: http://localhost:5173/admin

**Credenciais padrão (após rodar seed):**
- Username: `admin`
- Senha: `admin123`

### 4. Criar Novo Admin

```bash
cd backend
npm run create-admin [username] [password]
```

## Estrutura de Pastas

```
backend/
├── prisma/
│   └── schema.prisma      # Schema do banco de dados
├── src/
│   ├── routes/            # Rotas da API
│   ├── middleware/        # Middlewares (auth)
│   ├── scripts/           # Scripts auxiliares
│   └── server.js          # Servidor principal
├── uploads/               # Imagens enviadas (criada automaticamente)
└── dev.db                 # Banco SQLite (criado após migrate)

frontend/
├── src/
│   ├── components/        # Componentes Vue
│   ├── views/             # Páginas
│   ├── services/          # Serviços de API
│   ├── router/            # Configuração de rotas
│   └── style.css          # Estilos globais
└── index.html
```

## Variáveis de Ambiente (.env)

Crie um arquivo `.env` na pasta `backend/` com:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="seu_jwt_secret_super_seguro_aqui_mude_em_producao"
WHATSAPP_NUMBER="5511999999999"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

**Importante:**
- `JWT_SECRET`: Use uma string aleatória e segura em produção
- `WHATSAPP_NUMBER`: Número no formato internacional (ex: 5511999999999)
- `CORS_ORIGIN`: URL do frontend (ajuste para produção)

## Comandos Úteis

### Backend
- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm start` - Inicia servidor em produção
- `npm run prisma:generate` - Gera cliente Prisma
- `npm run prisma:migrate` - Executa migrações
- `npm run prisma:studio` - Abre Prisma Studio (interface visual do banco)
- `npm run seed` - Popula banco com dados de exemplo
- `npm run create-admin` - Cria novo usuário admin

### Frontend
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build para produção
- `npm run preview` - Preview da build

## Troubleshooting

### Erro: "Cannot find module"
Execute `npm install` novamente nas pastas backend e frontend.

### Erro: "Prisma Client not generated"
Execute `npm run prisma:generate` na pasta backend.

### Erro: "Database not found"
Execute `npm run prisma:migrate` na pasta backend.

### Imagens não aparecem
Verifique se a pasta `backend/uploads/` existe e se o servidor está servindo arquivos estáticos.

### CORS Error
Verifique se `CORS_ORIGIN` no `.env` do backend corresponde à URL do frontend.

## Próximos Passos

1. Configure o número do WhatsApp no `.env`
2. Crie seu primeiro admin
3. Adicione heróis e skins pelo painel admin
4. Personalize as cores e estilos conforme necessário

