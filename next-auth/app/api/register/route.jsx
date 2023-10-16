import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server'; //allows us to send responses back to cleint
import prisma from '../../libs/prismadb';

export async function POST(request){ //we dont name functino in routes we only call usign the http methord
   const body = await request.json(); //we need to await , or else it goes thoright the fucntion and doe snot wait it 
   const {name,email,password} = body;

   if(!name || !email || !password){
      return new NextResponse('MIssing Fields',{status:400})
   }

   const exist = await prisma.user.findUnique({ //find if already an email exists
      where:{
         email
      }
   });

   if(exist){
      return new NextResponse('Email Already Exists',{status:400})
   }
   
   const hashedPassword = await bcrypt.hash(password,10); //hashing hte password before storing int het database
   //salt is the strength of teh apssword  , here salt = 10 

   const user = await prisma.user.create({
      data:{
         name,
         email,
         hashedPassword
      }
   });

   return NextResponse.json(user)
}