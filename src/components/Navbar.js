import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import './Navbar.css';

function Navbar({isLoggedIn, isAdminLoggedIn, handleLogout}) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();
  

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogoutClick = () => {
    handleLogout();
    console.log('logged out successfully');
  };
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  function handleClickLogin(){
    navigate('user/login');
  }

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Crm
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {isAdminLoggedIn ? (
          // If the user is logged in
              <>
              {/* <li className='nav-item'>
              <Link to="user/create" className='nav-links' onClick={closeMobileMenu}>Create User</Link>
              </li> */}
              <li className='nav-item'>
                  <Link to="user/listUsers" className='nav-links' onClick={closeMobileMenu}>Users List</Link>
              </li>
              <li className='nav-item'>
                  <Link to="user/listUsers" className='nav-links' onClick={closeMobileMenu}>Users List</Link>
              </li>
            </>
            ) : isLoggedIn ? (
              // else, if an admin is logged in
              <>
               <li className='nav-item'>
                <Link to="user/create" className='nav-links' onClick={closeMobileMenu}>Create User</Link>
                </li>
                <li className='nav-item'>
                    <Link to="user/listUsers" className='nav-links' onClick={closeMobileMenu}>Users List</Link>
                </li>
              </>
            ):(<>
              <li className='nav-item'>
                <Link to='user/signUp' className='nav-links' onClick={closeMobileMenu}>Sign Up</Link>
              </li></>)
             }
            

          </ul>
          {isLoggedIn ? (
            <>
            {button && <Button buttonStyle='btn--outlineWhite' onClick={handleLogoutClick} >Log Out</Button>}
            </>
          ):
          <>
           {button && <Button buttonStyle='btn--outlineWhite' onClick={handleClickLogin} >Login</Button>}
          </>

          }
         
        </div>
      </nav>
    </>
  );
}

export default Navbar;