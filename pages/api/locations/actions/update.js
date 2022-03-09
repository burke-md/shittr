export default async function(data){
  const prisma = new PrismaClient({ log: ["query"] });

  try {
     const updateLocation = await prisma.locations.update({
      where: {
        id: data.id,
      },
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    })
    return updateLocation
  } catch (err) {
    console.log(err);
    return -1;
  } finally {
    await prisma.$disconnect();
  }
}