import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import skinRoutes from './routes/skinRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Middleware para processar JSON apenas se não for multipart/form-data
app.use((req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    return next();
  }
  express.json()(req, res, next);
});

app.use('/uploads', express.static('uploads'));

// Rotas públicas
app.use('/api/skins', skinRoutes.public);
app.use('/api/heroes', heroRoutes.public);
app.use('/api/rarities', (req, res) => {
  res.json([
    'Comum',
    'Incomum',
    'Raro',
    'Mítico',
    'Lendário',
    'Arcana',
    'Imortal'
  ]);
});

// Rotas admin
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', whatsappNumber: process.env.WHATSAPP_NUMBER });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

