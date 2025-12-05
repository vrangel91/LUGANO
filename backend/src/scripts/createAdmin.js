import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function createAdmin() {
  const username = process.argv[2] || 'admin';
  const password = process.argv[3] || 'admin123';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword
      }
    });

    console.log('✅ Admin criado com sucesso!');
    console.log(`Username: ${admin.username}`);
    console.log(`ID: ${admin.id}`);
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('❌ Admin já existe com este username');
    } else {
      console.error('Erro ao criar admin:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

