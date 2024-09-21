import React from 'react'
import {Link} from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { UserContext } from './UserContext'
const Header = () => {

  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  }, [])

  async function logout() {
    await fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST'
    })
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (

    <header>
        <Link to="/" className='logo'>Yangy's Blog</Link>
        <nav>
          {username && (
            <>
               {/*<div className='topics'>
                    <li><Link to="/category/all">All Posts</Link></li>
                    <li><Link to="/category/javascript">JavaScript</Link></li>
                    <li><Link to="/category/python">Python</Link></li>
                    <li><Link to="/category/react">React</Link></li>
                </div>
*/}
              <Link to='/create'>Create New Post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
                {/*<div className='topics'>
                    <li><Link to="/category/all">All Posts</Link></li>
                    <li><Link to="/category/javascript">JavaScript</Link></li>
                    <li><Link to="/category/python">Python</Link></li>
                    <li><Link to="/category/react">React</Link></li>
                </div>*/}
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
    </header>
  )
}

export default Header