//main entry point of our next-auth apllication

import NextAuth from "next-auth/next";
import prisma from '../../../libs/prismadb';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { CredentialsProvider } from "next-auth/providers";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'


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
            const user = {id:1,name:"Neeraj",email:'ngs@gmail.com'} //dummy emaail
            return user; //nextauth gives a prefilled login apge to test our code before entering the register or login page , so we are harcding it
         }
      }),
   ],
   secret: process.env.SECRET,
   session:{
      strategy:"jwt",
   },
   debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)