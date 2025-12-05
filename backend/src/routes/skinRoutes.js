import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const router = express.Router();

// Configurar multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'skin-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Rotas públicas
const publicRoutes = express.Router();

publicRoutes.get('/', async (req, res) => {
  try {
    const { hero, rarity, minValue, maxValue } = req.query;
    
    const where = {};
    
    if (hero) {
      where.heroId = hero;
    }
    
    if (rarity) {
      where.rarity = rarity;
    }
    
    if (minValue || maxValue) {
      where.value = {};
      if (minValue) where.value.gte = parseFloat(minValue);
      if (maxValue) where.value.lte = parseFloat(maxValue);
    }
    
    const skins = await prisma.skin.findMany({
      where,
      include: {
        hero: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(skins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

publicRoutes.get('/:id', async (req, res) => {
  try {
    const skin = await prisma.skin.findUnique({
      where: { id: req.params.id },
      include: { hero: true }
    });
    
    if (!skin) {
      return res.status(404).json({ error: 'Skin não encontrada' });
    }
    
    res.json(skin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas admin
router.get('/', authenticateToken, async (req, res) => {
  try {
    const skins = await prisma.skin.findMany({
      include: {
        hero: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(skins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, (req, res, next) => {
  console.log('=== UPLOAD DEBUG ===');
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body keys:', Object.keys(req.body));
  console.log('File antes do multer:', req.file);
  
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Erro no multer:', err);
      return res.status(400).json({ error: err.message });
    }
    console.log('File após multer:', req.file);
    console.log('Body após multer:', req.body);
    next();
  });
}, async (req, res) => {
  try {
    console.log('=== PROCESSANDO REQUEST ===');
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    
    const { name, heroId, rarity, value } = req.body;
    
    if (!name || !heroId || !rarity || !value) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      console.log('✅ Arquivo recebido:', req.file.filename);
      console.log('✅ Caminho completo:', req.file.path);
      console.log('✅ Tamanho:', req.file.size);
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
      console.log('⚠️ Usando imageUrl do body:', imageUrl);
    } else {
      console.error('❌ Nenhum arquivo recebido e nenhum imageUrl no body');
      return res.status(400).json({ error: 'Imagem é obrigatória para criar uma nova skin' });
    }
    
    const skin = await prisma.skin.create({
      data: {
        name,
        heroId,
        rarity,
        value: parseFloat(value),
        imageUrl
      },
      include: {
        hero: true
      }
    });
    
    console.log('Skin criada com imageUrl:', imageUrl);
    res.status(201).json(skin);
  } catch (error) {
    console.error('Erro ao criar skin:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { name, heroId, rarity, value } = req.body;
    const { id } = req.params;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (heroId) updateData.heroId = heroId;
    if (rarity) updateData.rarity = rarity;
    if (value) updateData.value = parseFloat(value);
    
    if (req.file) {
      // Deletar imagem antiga se existir
      const oldSkin = await prisma.skin.findUnique({ where: { id } });
      if (oldSkin && oldSkin.imageUrl && oldSkin.imageUrl.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '../..', oldSkin.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
      console.log('Nova imagem recebida:', req.file.filename);
    } else if (req.body.imageUrl) {
      updateData.imageUrl = req.body.imageUrl;
      console.log('Mantendo imagem existente:', req.body.imageUrl);
    }
    
    const skin = await prisma.skin.update({
      where: { id },
      data: updateData,
      include: {
        hero: true
      }
    });
    
    console.log('Skin atualizada com imageUrl:', skin.imageUrl);
    res.json(skin);
  } catch (error) {
    console.error('Erro ao atualizar skin:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Deletar imagem se existir
    const skin = await prisma.skin.findUnique({ where: { id } });
    if (skin && skin.imageUrl && skin.imageUrl.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '../..', skin.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await prisma.skin.delete({
      where: { id }
    });
    
    res.json({ message: 'Skin deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default {
  public: publicRoutes,
  admin: router
};

