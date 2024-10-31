import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Helper function to generate a random BigInt between min and max (inclusive)
const getRandomBigInt = (min: bigint, max: bigint): bigint => {
  const range = max - min + BigInt(1);
  const randomValue = BigInt(Math.floor(Math.random() * Number(range)));
  return min + randomValue;
};

// Function to clear all data
async function clearAllData() {
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.warehouse.deleteMany({});
  await prisma.shop.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.aPIServices.deleteMany({});
  await prisma.marketplace.deleteMany({});
  console.log("Cleared all data");
}

async function main() {
  // Clear all data
  await clearAllData();

  // Seed data for Marketplace
  const marketplaces = ["TikTok", "eBay", "Amazon"];
  for (const name of marketplaces) {
    await prisma.marketplace.create({
      data: { name },
    });
  }

  // Seed data for APIServices
  // for (let i = 0; i < 5; i++) {
  //   await prisma.aPIServices.create({
  //     data: {
  //       service_id: faker.string.uuid(),
  //       name: faker.company.name(),
  //       email: faker.internet.email(),
  //       status: faker.helpers.arrayElement([0, 1]), // Assuming status is an integer
  //       app_key: faker.string.uuid(),
  //       app_secret: faker.string.uuid(),
  //     },
  //   });
  // }

  // Seed data for Subscription
  for (let i = 0; i < 5; i++) {
    await prisma.subscription.create({
      data: {
        amount: parseFloat(faker.finance.amount()),
        duration: faker.number.int({ min: 1, max: 24 }), // Duration in months
      },
    });
  }

  // Seed data for User
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        name: faker.person.fullName(),
        joined_date: faker.date.past(),
        role: faker.helpers.arrayElement(["USER", "ADMIN", "SUPERADMIN"]), // Assuming role is an enum
      },
    });
  }

  // Seed data for User with specific emails
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        email: `nguyennhutbinh${i}@gmail.com`,
        password: await bcrypt.hash("Binh@123", 10),
        name: faker.person.fullName(),
        joined_date: faker.date.past(),
        role: faker.helpers.arrayElement(["USER", "ADMIN", "SUPERADMIN"]), // Assuming role is an enum
      },
    });
  }

  // Seed data for Shops
  const users = await prisma.user.findMany();
  const marketplacesData = await prisma.marketplace.findMany();
  const apiServicesData = await prisma.aPIServices.findMany();
  const subscriptions = await prisma.subscription.findMany();

  for (let i = 0; i < 10; i++) {
    await prisma.shop.create({
      data: {
        shop_id: faker.string.uuid(),
        shop_name: faker.company.name(),
        shop_code: faker.string.alphanumeric(10),
        access_token: faker.string.uuid(),
        access_token_expire_in: faker.date.future(),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        marketplace_id:
          marketplacesData[Math.floor(Math.random() * marketplacesData.length)]
            .id,
        api_service_id:
          apiServicesData[Math.floor(Math.random() * apiServicesData.length)]
            .service_id,
        subscription_start_date: faker.date.past(),
        subscription_expire_date: faker.date.future(),
        refresh_token: faker.string.uuid(),
        refresh_token_expire_in: faker.date.future(),
        seller_base_region: faker.location.country(),
        shop_cipher: faker.string.uuid(),
        subscription_id:
          subscriptions[Math.floor(Math.random() * subscriptions.length)].id,
      },
    });
  }

  // Seed data for Warehouses
  const shops = await prisma.shop.findMany();
  for (let i = 0; i < 10; i++) {
    await prisma.warehouse.create({
      data: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        shop_id: shops[Math.floor(Math.random() * shops.length)].shop_id,
      },
    });
  }

  // Seed data for Products
  for (let i = 0; i < 20; i++) {
    await prisma.product.create({
      data: {
        shop_id: shops[Math.floor(Math.random() * shops.length)].shop_id,
      },
    });
  }

  // Seed data for Orders
  for (let i = 0; i < 20; i++) {
    await prisma.order.create({
      data: {
        tracking_id: faker.string.uuid(),
        status: faker.helpers.arrayElement([
          "UNPAID",
          "ON_HOLD",
          "AWAITING_SHIPMENT",
          "AWAITING_COLLECTION",
          "IN_TRANSIT",
          "DELIVERED",
          "COMPLETED",
          "CANCELLED",
        ]), // Assuming status is an enum
        shop_id: shops[Math.floor(Math.random() * shops.length)].shop_id,
      },
    });
  }

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
