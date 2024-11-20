import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import styles from './NavBar.module.css'
import Logo from '../../assets/images/logo.svg'

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      { user ? (
        <nav className={styles.container}>
          <Link to='/'><img className='logo' src={Logo} /></Link>
          <ul>
          <li>Welcome, {user.username}</li>
            <Link to="/"><li>Home</li></Link>
            <Link to="/questions"><li>Questions</li></Link>
            <Link to="/questions/new"><li>New Question</li></Link>
            <Link to="" onClick={handleSignout}><li>Sign Out</li></Link>
          </ul>
        </nav>
      ) : (
        <nav className={styles.container}>
          <Link to='/'><img className='logo' src={Logo} /></Link>
          <ul>
            <Link to="/signin"><li>Sign In</li></Link>
            <Link to="/signup"><li>Sign Up</li></Link>
          </ul>
        </nav>
      )}
    </>
  )
}

export default NavBar;