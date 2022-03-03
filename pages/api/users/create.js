import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function(req, res){
  
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const {user: userData} = req.body;
    const passHash = await bcrypt.hash(userData.password, 10);
    const user = await prisma.users.create({
      data: {
        userName:userData.username,
        passHash: passHash,
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