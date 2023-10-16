'use client'

import { useSession } from 'next-auth/react'

const User = () => {
   const {data:session} = useSession() //to use a session of login or a session conenction
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}

export default User