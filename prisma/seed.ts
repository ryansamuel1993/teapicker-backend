import { PrismaClient, DrinkType, SweetenerType, MilkStrength, OrderType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { generateRandomAvatarUrl } from '../src/utils/maps/user';
import { MediaType } from '../src/user/types';

const prisma = new PrismaClient();

async function seed() {
  console.log('🧹 Resetting database...');
  await prisma.rating.deleteMany(),
  await prisma.orderItem.deleteMany(),
  await prisma.order.deleteMany(),
  await prisma.preferences.deleteMany(),
  await prisma.userMedia.deleteMany(),
  await prisma.item.deleteMany(),
  await prisma.user.deleteMany(),
  await prisma.team.deleteMany(),
  await prisma.emailLog.deleteMany(),
  await prisma.smsLog.deleteMany(),


  console.log('🏗️ Creating 1 team...');
  const team = await prisma.team.create({
    data: {
      name: faker.company.name(),
    },
  });

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

  console.log('👤 Creating Ryan Samuel...');
  const ryan = await prisma.user.create({
    data: {
      name: 'Ryan Samuel',
      email: 'ryan_samuel1993@hotmail.com',
      contactNumber: '+447854651647',
      teamId: team.id,
      media: {
        create: {
          url: generateRandomAvatarUrl(),
          type: MediaType.Avatar,
        },
      },
    },
  });

  await prisma.preferences.create({
    data: {
      userId: ryan.id,
      drinkType: faker.helpers.arrayElement(Object.values(DrinkType)),
      sweetenerType: faker.helpers.arrayElement(Object.values(SweetenerType)),
      sugarAmount: faker.number.int({ min: 0, max: 3 }),
      milkStrength: faker.helpers.arrayElement(Object.values(MilkStrength)),
      notes: faker.lorem.words(3),
    },
  });

  const ryanOrder = await prisma.order.create({
    data: {
      userId: ryan.id,
      teamId: team.id,
      notes: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
      orderType: faker.helpers.arrayElement(Object.values(OrderType)),
    },
  });

  const ryanOrderItems = faker.helpers.arrayElements(items, faker.number.int({ min: 1, max: 3 }));
  for (const item of ryanOrderItems) {
    await prisma.orderItem.create({
      data: {
        orderId: ryanOrder.id,
        itemId: item.id,
        quantity: faker.number.int({ min: 1, max: 5 }),
      },
    });
  }

  await prisma.rating.create({
    data: {
      userId: ryan.id,
      orderId: ryanOrder.id,
      quality: faker.number.int({ min: 1, max: 5 }),
      service: faker.number.int({ min: 1, max: 5 }),
      overall: faker.number.int({ min: 1, max: 5 }),
      voiceNote: Buffer.from(faker.lorem.words(2), 'utf-8'),
      notes: faker.lorem.words(3),
    },
  });

  console.log('👥 Creating test users with controlled order history...');

  const testUsers = [
    {
      id: 'user1',
      name: 'Alice',
      orders: ['2024-01-01', '2024-02-01', '2024-03-01'],
    },
    {
      id: 'user2',
      name: 'Bob',
      orders: ['2024-06-01'],
    },
    {
      id: 'user3',
      name: 'Charlie',
      orders: ['2024-04-01', '2024-05-01'],
    },
  ];

  for (const { id, name, orders } of testUsers) {
    const user = await prisma.user.create({
      data: {
        id,
        name,
        email: faker.internet.email(),
        contactNumber: faker.phone.number(),
        teamId: team.id,
        media: {
          create: {
            url: generateRandomAvatarUrl(),
            type: MediaType.Avatar,
          },
        },
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

    for (const date of orders) {
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          teamId: team.id,
          notes: faker.lorem.sentence(),
          completed: true,
          orderType: OrderType.EXTERNAL,
          createdAt: new Date(date),
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
