import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function(req, res){
  
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const {user: userData} = req.body;
    const dbUser = await prisma.users.findFirst({
      where: {
        userName: userData.username,
      },
    })

    //IMPORTANT add security and JWT here
    if(dbUser.passHash === userData.passHash) {
      console.log(`LOGIN`);
    }

    res.status(201);
    res.json({});
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({error: "Unable to handle request"});
  } finally {
    await prisma.$disconnect();
  }
}