import { Inter } from 'next/font/google'
import Provider from './context/AuthContext'
import './globals.css'
//now we ahve access to useSesion() hook insde adpp taht renders session data cleint side
import ToasterContext from './context/ToasterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next-Auth',
  description: 'Complete Authentication template can be used for any starting projects',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider> 
          <ToasterContext />
          {children}
        </Provider>
        </body>
    </html>
  )
}
