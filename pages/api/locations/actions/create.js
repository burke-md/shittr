import { PrismaClient } from "@prisma/client";

export default async function(data){
  const prisma = new PrismaClient({ log: ["query"] });

  try {
      const location = await prisma.locations.create({
        data: {
          latitude:data.latitude,
          longitude: data.longitude,
        },
      });
      return location;
  } catch (err) {
    console.log(err);
    return -1;
  } finally {
    await prisma.$disconnect();
  }
}