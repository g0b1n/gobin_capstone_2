import React from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useUser } from './Context/UserContext';
import './NavBar.css'

function NavBar() {

  const { user, setUser, isLoggedIn } = useUser();
  const navigate = useNavigate()

  // handle logout
  const handleLogout = () => {
    setUser(null);
    // remove token from local storage
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <nav>
        <div className='nav-title'>
            <Link to='/'>Football</Link>
        </div>
        <div className='searchBar'>
          <input type='text' placeholder='Search' />
        </div>
        <div>
          <Link to = '/' className='nav-matches'>Matches</Link>
          <Link to = "/leagues" className='nav-league'>Leagues</Link>
        </div>
        <div>
          {isLoggedIn ? (
            <>
            <span className='nav-username' onClick={() => navigate('/profile')}>{user.username}</span>
            <button className='nav-logout-btn' onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
            <Link to = "/login">
              <button className='nav-login-btn'>Login</button>
            </Link>
            <Link to = "/register">
              <button className='nav-register-btn'>Register</button>
            </Link>
            </>
          )}
        </div>
    </nav>
  )
}

export default NavBar;
