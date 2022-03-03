import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    if(!isPassValid) {
      res.status(401);
      res.json({error: "Unathorized"});
      return;
    } 

    const tokenUser = { name: userData.username}

    const accessToken = jwt.sign(tokenUser, process.env.JWT_ACCESS_SECRET)

    res.status(201);
    res.json({acessToken: accessToken});

  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({error: "Unable to handle request"});
  } finally {
    await prisma.$disconnect();
  }
}