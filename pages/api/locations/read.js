import { NextApiRequest, NextApiResponse } from 'next';

export default async function(req, res){
  const prisma = new PrismaClient({ log: ["query"] });

  try {

  } catch (err) {
    res.status(500);
    res.json({error: "Unable to handle request"});
  } finally {
    await prisma.$disconnect();
  }

  res.status(200);
  res.json({ locations: ""});
}