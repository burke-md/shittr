import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function(req, res){
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const {location: locationData} = req.body;
    const deleteLocation = await prisma.locations.delete({
      where: {
        id: locationData.id,
      },
    })
    res.status(200);
    res.json({ deleteLocation});
  } catch (err) {
    res.status(500);
    res.json({error: "Unable to handle request"});
  } finally {
    await prisma.$disconnect();
  }
}