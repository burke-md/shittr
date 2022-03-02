import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function(req, res){
  
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const {user: userData} = req.body;
    const user = await prisma.users.create({
      data: {
        userName:userData.userName,
        passHash: userData.passHash,
      },
    });

    res.status(201);
    res.json({user});
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({error: "Unable to handle request"});
  } finally {
    await prisma.$disconnect();
  }
}