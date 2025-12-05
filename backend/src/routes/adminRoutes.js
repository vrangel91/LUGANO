import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth.js';
import skinRoutes from './skinRoutes.js';
import heroRoutes from './heroRoutes.js';

const prisma = new PrismaClient();
const router = express.Router();

// Contador de tentativas de login (simples, em produção usar Redis)
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutos

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username e senha são obrigatórios' });
    }
    
    // Verificar tentativas
    const attempts = loginAttempts.get(req.ip) || { count: 0, lockoutUntil: null };
    if (attempts.lockoutUntil && Date.now() < attempts.lockoutUntil) {
      const remaining = Math.ceil((attempts.lockoutUntil - Date.now()) / 1000 / 60);
      return res.status(429).json({ 
        error: `Muitas tentativas. Tente novamente em ${remaining} minuto(s).` 
      });
    }
    
    const admin = await prisma.admin.findUnique({
      where: { username }
    });
    
    if (!admin) {
      attempts.count++;
      if (attempts.count >= MAX_ATTEMPTS) {
        attempts.lockoutUntil = Date.now() + LOCKOUT_TIME;
      }
      loginAttempts.set(req.ip, attempts);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const validPassword = await bcrypt.compare(password, admin.password);
    
    if (!validPassword) {
      attempts.count++;
      if (attempts.count >= MAX_ATTEMPTS) {
        attempts.lockoutUntil = Date.now() + LOCKOUT_TIME;
      }
      loginAttempts.set(req.ip, attempts);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Login bem-sucedido, resetar tentativas
    loginAttempts.delete(req.ip);
    
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verificar token
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Rotas protegidas
router.use('/skins', skinRoutes.admin);
router.use('/heroes', heroRoutes.admin);

export default router;

