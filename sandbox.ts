import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const main = async () => {
  const findSome = await prisma.link.findMany({ take: 100 });
  console.log(findSome);

  // Find the first 100 rows in the `Link` table that match a criteria
  const findManyExample = await prisma.link.findMany({
    where: {
      id: 'example',
    },
    take: 100,
  });
  console.log(findManyExample);

  // Find the first 100 rows in the `Link` table, but only return a few columns
  const findLink = await prisma.link.findMany({
    select: {
      id: true,
      createdAt: true,
    },
    take: 100,
  });
  console.log(findLink);

  const updateUserLinks = await prisma.user.update({
    where: {
      id: '6620a99e-2e90-46de-bc6d-225d02058c43',
    },
    data: {
      links: {
        connect: {
          id: findSome[0].id,
        },
      },
    },
    include: {
      links: true,
    },
  });

  console.log(updateUserLinks);
};

main()
  .catch((e) => console.error('Error in Prisma Client query: ', e))
  .finally(async () => await prisma.$disconnect())
