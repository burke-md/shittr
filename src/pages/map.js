import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { useSession, signIn } from "next-auth/react"
import ShowMap from "../components/map/ShowMap"

const queryClient = new QueryClient()

export default function App() {
  const { data: session } = useSession()
  return (
    <QueryClientProvider client={queryClient}>
      {session && 
      <ShowMap />}
      {!session && 
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>}
    </QueryClientProvider>
  )
}