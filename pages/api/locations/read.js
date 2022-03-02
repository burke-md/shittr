import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";


export default async function(req, res){
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const locations = await prisma.locations.findMany();
    res.status(200);
    res.json({locations});
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({error: "Unable to handle request"});
  } finally {
    await prisma.$disconnect();
  }
}