import Link from 'next/link'
import Head from 'next/head'
import LoginForm from '../components/LoginForm'

export default function Login(){
  return (
    <>
      <Head>
        <title>Shittr-Login</title>
      </Head>
      <main>
      <h1></h1>
      <LoginForm />
      <h2>
        <Link href="/">
          <a>home</a>
        </Link>
      </h2>
      </main>
      
    </>
  )
}