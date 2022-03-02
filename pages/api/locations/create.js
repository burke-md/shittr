import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function(req, res){
  const prisma = new PrismaClient({ log: ["query"] });

  try {
      const {location: locationData} = req.body;
      const location = await prisma.locations.create({
        data: {
          latitude:locationData.latitude,
          longitude: locationData.longitude,
        },
      });
      res.status(201);
      res.json({location});
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({error: "Unable to handle request"});
  } finally {
    await prisma.$disconnect();
  }
}