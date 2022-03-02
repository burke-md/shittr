import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function(req, res){
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const {location: locationData} = req.body;

    console.log(`\n locationData\n ${locationData} req.body: ${JSON.stringify(req.body)}`);

    const updateLocation = await prisma.locations.update({
      where: {
        id: locationData.id,
      },
      data: {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      },
    })

    res.status(200);
    res.json({updateLocation});
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({error: "Unable to handle request"});
  } finally {
    await prisma.$disconnect();
  }
}