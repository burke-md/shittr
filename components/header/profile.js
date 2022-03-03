import Image from 'next/image'
import { useSession } from "next-auth/react"
import styles from '../../styles/Header.module.css'

export default function Profile() {
  const { data: session } = useSession()

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  console.log(session?.user)
  return (
    <>
      {session && 
      <p>
        <span className={styles.name}>
        {session.user.name}
        </span>
        <Image 
          loader={myLoader}
          src={session.user.image}
          alt="Github user photo"
          width={50}
          height={50}
        />
      </p>}
      {!session && 
      <p>
        Guest User
      </p>}
    </>
  )
}