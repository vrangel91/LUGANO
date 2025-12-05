import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function seed() {
  try {
    // Criar admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.admin.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        password: hashedPassword
      }
    });
    console.log('✅ Admin criado:', admin.username);

    // Criar heróis
    const heroes = [
      'Pudge',
      'Invoker',
      'Juggernaut',
      'Phantom Assassin',
      'Anti-Mage',
      'Crystal Maiden',
      'Windranger',
      'Templar Assassin'
    ];

    const createdHeroes = [];
    for (const heroName of heroes) {
      const hero = await prisma.hero.upsert({
        where: { name: heroName },
        update: {},
        create: { name: heroName }
      });
      createdHeroes.push(hero);
      console.log(`✅ Herói criado: ${hero.name}`);
    }

    // Criar algumas skins de exemplo
    const rarities = ['Comum', 'Raro', 'Mítico', 'Lendário', 'Arcana', 'Imortal'];
    const sampleSkins = [
      { name: 'Arcana do Invoker', hero: 'Invoker', rarity: 'Arcana', value: 150.00 },
      { name: 'Imortal do Pudge', hero: 'Pudge', rarity: 'Imortal', value: 200.00 },
      { name: 'Lendária do Juggernaut', hero: 'Juggernaut', rarity: 'Lendário', value: 80.00 },
      { name: 'Mítica da PA', hero: 'Phantom Assassin', rarity: 'Mítico', value: 50.00 },
      { name: 'Rara do Anti-Mage', hero: 'Anti-Mage', rarity: 'Raro', value: 30.00 }
    ];

    for (const skinData of sampleSkins) {
      const hero = createdHeroes.find(h => h.name === skinData.hero);
      if (hero) {
        await prisma.skin.create({
          data: {
            name: skinData.name,
            heroId: hero.id,
            rarity: skinData.rarity,
            value: skinData.value,
            imageUrl: '/placeholder.jpg'
          }
        });
        console.log(`✅ Skin criada: ${skinData.name}`);
      }
    }

    console.log('\n🎉 Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro no seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

