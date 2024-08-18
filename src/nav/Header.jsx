import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Header = () => {

  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }
  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Workout App</h1>            
            </Link>
            <nav>

              {user && (<div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Logout</button>
              </div>)}


              {!user && (<div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>)}


            </nav>
        </div>
    </header>
  )
}

export default Header
