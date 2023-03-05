/* eslint-disable @typescript-eslint/no-var-requires */
// prisma/seed.ts

const { PrismaClient } = require('@prisma/client');

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@scms.com' },
    update: {},
    create: {
      email: 'admin@scms.com',
      name: 'Super Admin',
      password: 'meriyara',
    },
  });

  console.log({ superAdmin });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
