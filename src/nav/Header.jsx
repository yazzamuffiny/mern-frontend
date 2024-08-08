import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Workout App</h1>            
            </Link>
        </div>
    </header>
  )
}

export default Header
