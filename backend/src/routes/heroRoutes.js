import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Rotas públicas
const publicRoutes = express.Router();

publicRoutes.get('/', async (req, res) => {
  try {
    const heroes = await prisma.hero.findMany({
      include: {
        _count: {
          select: { skins: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas admin
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Nome do herói é obrigatório' });
    }
    
    const hero = await prisma.hero.create({
      data: { name }
    });
    
    res.status(201).json(hero);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Herói já existe' });
    }
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se há skins vinculadas
    const hero = await prisma.hero.findUnique({
      where: { id },
      include: {
        _count: {
          select: { skins: true }
        }
      }
    });
    
    if (!hero) {
      return res.status(404).json({ error: 'Herói não encontrado' });
    }
    
    if (hero._count.skins > 0) {
      return res.status(400).json({ 
        error: `Não é possível deletar. Existem ${hero._count.skins} skin(s) vinculada(s) a este herói.` 
      });
    }
    
    await prisma.hero.delete({
      where: { id }
    });
    
    res.json({ message: 'Herói deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default {
  public: publicRoutes,
  admin: router
};

