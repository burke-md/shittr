import { PrismaClient } from '@prisma/client';

export default async function(data){
  const prisma = new PrismaClient({ log: ["query"] });

  try { 
    const deleteLocation = await prisma.locations.delete({
      where: {
        id: data.id,
      },
    })
    return deleteLocation;
   } catch (err) {
    console.log(err);
    return -1;
  } finally {
    await prisma.$disconnect();
  }
}