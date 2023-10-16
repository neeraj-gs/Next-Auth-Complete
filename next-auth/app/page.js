import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import User from "./components/User"
//user compeont occurs after a second of flash because it is client side rendered
//conenction of next-auth is checked using the cleint renderd or server seide renderd 


export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <section>
      <h1>Home</h1>
      <h1>Server Side Rendered</h1>
      <pre>{JSON.stringify(session)}</pre>
      <h1>Client Side Renderd</h1>
      <User /> 
    </section>
  )
}
