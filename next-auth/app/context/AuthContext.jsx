'use client' //we mark the page if we use any hooks or providers

import { SessionProvider } from 'next-auth/react'

export default function Provider({children}){
   return (
      <SessionProvider>
         {children}
      </SessionProvider>
   )
}
//nextjs docs recommed to do any provider inside a  sepreate route