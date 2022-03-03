import { useSession, signIn, signOut } from "next-auth/react"

export default function LogButton({ session }) {
  if(session)console.log(`session`, session.user.name)
  return (
    <>
    {session && <button
      onClick={()=> signOut()}       >Sign Out</button>}
    {!session && <button
      onClick={()=> signIn()}
    >Sign In</button>}
    </>
  )
}