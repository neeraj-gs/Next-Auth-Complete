//main entry point of our next-auth apllication

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../libs/prismadb';


export const authOptions = {
   adapter : PrismaAdapter(prisma),
   providers:[
      GoogleProvider({
         clientId:process.env.GOOGLE_ID,
         clientSecret:process.env.GOOGLE_SECRET
      }),
      GithubProvider({
         clientId:process.env.GITHUB_ID,
         clientSecret:process.env.GITHUB_SECRET
      }),
      CredentialsProvider({
         name:"Credentials",
         credentials:{
            email: {label: "Email", type:"email"},
            password: {label:"Password",type:"password"},
            username: {label:"Username",type:"text"},
         },
         async authorize(credentials){
            // const user = {id:1,name:"Neeraj",email:'ngs@gmail.com'} //dummy emaail
            // return user; //nextauth gives a prefilled login apge to test our code before entering the register or login page , so we are harcding it

            //chek to see if eamil and password is already registered

            if(!credentials.email || !credentials.email){
               throw new Error('Email and password is required');
            }

            //check if user actually exists
            const user = await prisma.user.findUnique({
               where:{
                  email:credentials.email
               }
            });

            //if no user was found
            if(!user || !user?.handler.password){
               throw new Error('No User Found')
            }

            //if user exists we need ot check to see if password workds
            //to check passwor dwe use bcrypt compare fucntion


         }
      }),
   ],
   secret: process.env.SECRET,
   session:{
      strategy:"jwt", //the session token is the one that allows us to send the users data ont ot he browser or render user information
      //gives sesion data and any inforation to cleint , can access the token
      //2 ways to access data 
      //1. SErver Side Rendering
      //2.CLeint side Rendering
   },
   debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions) //we need to export as a handler
//in rotuer using Nextjs we cant export handler , in api route fiel we need to expose by a http request any metord
export { handler as GET, handler as POST };
//next-auth automcatically priovides a pre-built login page for testing purpise


