import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Починаємо заповнення бази даних (seeding)...');

  // Створюємо базові категорії
  const categories = [
    { name: 'Тварини', slug: 'tvaryny' },
    { name: 'Документи', slug: 'dokumenty' },
    { name: 'Техніка та електроніка', slug: 'tekhnika' },
    { name: 'Особисті речі', slug: 'osobysti-rechi' },
  ];

  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    console.log(`Категорія створена: ${created.name}`);
  }

  console.log('Заповнення успішно завершено!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });