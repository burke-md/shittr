import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, prismaClient } from "@prisma/client";

export default async function(req, res){
  
  const prisma = new PrismaClient({ log: ["query"] });

  try {

  } catch (err) {
    res.status(500);
    res.json({error: "Unable to handle request"});
  } finally {
    await prisma.disconnect();
  }

  res.status(200);
  res.json({ user: "created"});
}