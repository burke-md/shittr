import LogButton from './logButton'
import Profile from './profile'
import styles from '../../styles/Header.module.css'

export default function Header() {
  
  return (
    <span className={styles.header}>
      <LogButton/>
      <Profile/>
    </span>
  )
}