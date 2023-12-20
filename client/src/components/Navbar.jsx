import React, { useContext } from 'react'
import Logo from '../img/DSC05742.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {

    const { currentUser, logout }  = useContext(AuthContext)
    // THIS IS A WAY TO GET THE PROPERTIES OF AN OBJECT
    console.log(currentUser?.username)

    return (
        <div className='navbar'>
            <div className='container'>
                <div className='logo'>
                    <Link to="/">
                        <img src={Logo} alt='logo' />
                    </Link>
                </div>
                <div className='links'>
                    <Link className='link' to="/?cat=1">
                        <h6>BLOG</h6>
                    </Link>
                    <Link className='link' to="/?cat=2">
                        <h6>PROJECT</h6>
                    </Link>
                    <Link className='link' to="/?cat=3">
                        <h6>LIFE</h6>
                    </Link>
                    <Link className='link' to="/?cat=4">
                        <h6>RESUME</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <span onClick={logout}>Logout</span>
                    ) : (
                        <Link className='link' to="/login">Login</Link>
                    )}
                    <span className='write'>
                        <Link className="link" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar