import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

// npm run seed

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        const saltRounds = 10;
        args.data.password = await bcrypt.hash(args.data.password, saltRounds);
        return query(args);
      },
    },
  },
});

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
  await prisma.store.deleteMany({});
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
  for (let i = 0; i < 5; i++) {
    await prisma.aPIServices.create({
      data: {
        serviceId: getRandomBigInt(BigInt(1e18), BigInt(1e19)),
        name: faker.company.name(),
        email: faker.internet.email(),
        status: faker.helpers.arrayElement(["active", "inactive"]),
      },
    });
  }

  // Seed data for Subscription
  for (let i = 0; i < 5; i++) {
    await prisma.subscription.create({
      data: {
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()), // Ensure price is a number
        duration: getRandomNumber(1, 24), // Duration in months
      },
    });
  }

  // Seed data for User
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        name: faker.internet.username(),
      },
    });
  }

  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        email: "nguyennhutbinh" + i + "@gmail.com",
        password: "Binh@123",
        name: faker.internet.username(),
      },
    });
  }

  // Seed data for Store
  const users = await prisma.user.findMany();
  const subscriptions = await prisma.subscription.findMany();
  const apiServices = await prisma.aPIServices.findMany();
  const marketplacesData = await prisma.marketplace.findMany();

  for (let i = 0; i < 10; i++) {
    await prisma.store.create({
      data: {
        name: faker.company.name(),
        storeCode: faker.string.alphanumeric(10),
        token: faker.string.alphanumeric(20),
        tokenExpiredIn: faker.date.future(),
        idTiktokShop: faker.string.alphanumeric(15),
        userId: faker.helpers.arrayElement(users).id,
        marketplaceId: faker.helpers.arrayElement(marketplacesData).id,
        subscriptionid: faker.helpers.arrayElement(subscriptions).id,
        startDate: faker.date.past(),
        expireDate: faker.date.future(),
        apiServiceId: faker.helpers.arrayElement(apiServices).id,
      },
    });
  }

  // Seed data for Product
  const stores = await prisma.store.findMany();

  for (let i = 0; i < 20; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        accountId: faker.helpers.arrayElement(stores).id,
      },
    });
  }

  // Seed data for Order
  for (let i = 0; i < 20; i++) {
    await prisma.order.create({
      data: {
        trackingId: faker.string.alphanumeric(10),
        status: faker.helpers.arrayElement([
          "UNPAID",
          "ON_HOLD",
          "AWAITING_SHIPMENT",
          "AWAITING_COLLECTION",
          "IN_TRANSIT",
          "DELIVERED",
          "COMPLETED",
          "CANCELLED",
        ]),
        storeId: faker.helpers.arrayElement(stores).id,
      },
    });
  }

  // Seed data for Warehouse
  for (let i = 0; i < 10; i++) {
    await prisma.warehouse.create({
      data: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        storeId: faker.helpers.arrayElement(stores).id,
        default: faker.datatype.boolean(),
      },
    });
  }
  console.log("Seed data created successfully");
}

// async function main() {
//   const dataDirectory = path.join(__dirname, "seedData");

//   const orderedFileNames = ["user.json"];

//   await deleteAllData(orderedFileNames);

//   for (const fileName of orderedFileNames) {
//     const filePath = path.join(dataDirectory, fileName);
//     const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//     const modelName = path.basename(fileName, path.extname(fileName));
//     const model: any = prisma[modelName as keyof typeof prisma];

//     if (!model) {
//       console.error(`No Prisma model matches the file name: ${fileName}`);
//       continue;
//     }

//     for (const data of jsonData) {
//       await model.create({
//         data,
//       });
//     }

//     console.log(`Seeded ${modelName} with data from ${fileName}`);
//   }
// }

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
