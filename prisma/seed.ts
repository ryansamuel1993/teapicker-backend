import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DRINKS = Object.values(DrinkType);
const SWEETENERS = Object.values(SweetenerType);
const PICKER_MODIFIERS = Object.values(PickerModifier);

async function seed() {
  console.log("🧹 Clearing database...");
  await prisma.modifierUsage.deleteMany();
  await prisma.preferences.deleteMany();
  await prisma.teaLog.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧑‍🤝‍🧑 Seeding user...");

  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
      },
    });

    await prisma.preferences.create({
      data: {
        userId: user.id,
        drinkType: faker.helpers.arrayElement(DRINKS),
        sweetenerType: faker.helpers.arrayElement(SWEETENERS),
        sugarAmount: faker.number.int({ min: 0, max: 3 }),
        milkStrength: faker.helpers.arrayElement([
          "strong",
          "white",
          "builders",
        ]),
        notes: faker.lorem.words(3),
      },
    });

    const numModifiers = faker.number.int({ min: 1, max: 3 });
    const modifiers = faker.helpers.arrayElements(
      PICKER_MODIFIERS,
      numModifiers,
    );

    for (const mod of modifiers) {
      await prisma.modifierUsage.create({
        data: {
          userId: user.id,
          modifier: mod,
          remaining: faker.number.int({ min: 1, max: 4 }),
          notes: faker.lorem.words(2),
        },
      });
    }
  }

  console.log("✅ Seed complete!");
  await prisma.$disconnect();
}

seed().catch(async (err) => {
  console.error("❌ Seed failed:", err);
  await prisma.$disconnect();
  process.exit(1);
});
