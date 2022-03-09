import { PrismaClient } from "@prisma/client";

export default async function(){
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const locations = await prisma.locations.findMany();
    return locations;
  } catch (err) {
    console.log(err);
    return -1;
  } finally {
    await prisma.$disconnect();
  }
}