import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function(req, res){
  
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const {user: userData} = req.body;
    const dbUser = await prisma.users.findFirst({
      where: {
        userName: userData.username,
      },
    })

    const isPassValid = await bcrypt.compare(userData.password, dbUser.passHash)

    //IMPORTANT add security and JWT here
    if(isPassValid) {
      console.log(`LOGIN`);
    } else{
      console.log(`bad pass :${isPassValid}`)   
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