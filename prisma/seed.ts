import { PrismaClient, DrinkType, SweetenerType, MilkStrength, OrderType } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  console.log('🧹 Resetting database...');
  await prisma.rating.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.boostUsage.deleteMany();
  await prisma.boost?.deleteMany?.();
  await prisma.boost.deleteMany();
  await prisma.preferences.deleteMany();
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();
  await prisma.team.deleteMany();

  console.log('🏗️ Creating teams...');
  const teams = await Promise.all(
    Array.from({ length: 2 }, () =>
      prisma.team.create({
        data: {
          name: faker.company.name(),
        },
      })
    )
  );

  console.log('👥 Creating users with preferences...');
  const users = await Promise.all(
    Array.from({ length: 5 }, async () => {
      const team = faker.helpers.arrayElement([...teams, undefined]);

      const user = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          contactNumber: faker.number.int({ min: 1000000000, max: 9999999999 }),
          teamId: team?.id,
        },
      });

      await prisma.preferences.create({
        data: {
          userId: user.id,
          drinkType: faker.helpers.arrayElement(Object.values(DrinkType)),
          sweetenerType: faker.helpers.arrayElement(Object.values(SweetenerType)),
          sugarAmount: faker.number.int({ min: 0, max: 3 }),
          milkStrength: faker.helpers.arrayElement(Object.values(MilkStrength)),
          notes: faker.lorem.words(3),
        },
      });

      return user;
    })
  );

  console.log('🍹 Creating boosts and boost usages...');
  const boosts = await Promise.all(
    Array.from({ length: 3 }, () =>
      prisma.boost.create({
        data: {
          boost: faker.hacker.verb(),
          cooldown: faker.number.int({ min: 10, max: 60 }),
          notes: faker.lorem.words(2),
        },
      })
    )
  );

  for (const user of users) {
    const usedBoosts = faker.helpers.arrayElements(boosts, faker.number.int({ min: 1, max: boosts.length }));
    for (const boost of usedBoosts) {
      await prisma.boostUsage.create({
        data: {
          userId: user.id,
          boostId: boost.id,
          remaining: faker.number.int({ min: 1, max: 5 }),
          notes: faker.lorem.words(2),
        },
      });
    }
  }

  console.log('🛍️ Creating items...');
  const items = await Promise.all(
    Array.from({ length: 4 }, () =>
      prisma.item.create({
        data: {
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price({ min: 1, max: 10 })),
        },
      })
    )
  );

  console.log('📦 Creating orders, items, and ratings...');
  for (const user of users) {
    const team = teams.find(t => t.id === user.teamId) ?? faker.helpers.arrayElement(teams);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        teamId: team.id,
        notes: faker.lorem.sentence(),
        completed: faker.datatype.boolean(),
        orderType: faker.helpers.arrayElement(Object.values(OrderType)),
      },
    });

    const orderItems = faker.helpers.arrayElements(items, faker.number.int({ min: 1, max: 3 }));
    for (const item of orderItems) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          itemId: item.id,
          quantity: faker.number.int({ min: 1, max: 5 }),
        },
      });
    }

    await prisma.rating.create({
      data: {
        userId: user.id,
        orderId: order.id,
        quality: faker.number.int({ min: 1, max: 5 }),
        service: faker.number.int({ min: 1, max: 5 }),
        overall: faker.number.int({ min: 1, max: 5 }),
        voiceNote: Buffer.from(faker.lorem.words(2), 'utf-8'),
        notes: faker.lorem.words(3),
      },
    });
  }

  console.log('✅ Seeding complete!');
}

seed()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
