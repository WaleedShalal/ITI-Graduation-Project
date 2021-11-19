import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.scss';

function Header(props) {
  const { fetchedData } = useSelector((state) => state);

  let location = useLocation();
  console.log(location.pathname);
  console.log(location);
  return (
    <div className='header'>
      <div className='container-fluid'>
        <header className='header-navbar'>
          <div className='leftPart'>
            <div className='logo'>
              <Link to='/'>minuteف</Link>
            </div>
            <div className='search-container'>
              <form className='search'>
                <div className='form-content'>
                  <span className='search-icon'>
                    <i className='fas fa-search'></i>
                  </span>
                  <input
                    type='text'
                    name='search'
                    aria-label='Search'
                    className='search-input'
                    placeholder='Search'></input>
                </div>
              </form>
            </div>
          </div>
          <div className='rightPart'>
            <div className='RighC'>
              <NavLink
                style={({ isActive }) => {
                  return {
                    display: 'block',
                    margin: '1rem 0',
                    color: isActive ? 'white' : 'rgba(255, 255, 255, 0.65)',
                  };
                }}
                to={`/`}>
                <i className='fas fa-home '></i>
              </NavLink>
            </div>
            <div className='RighC'>
              <i className='fas fa-comment '></i>
            </div>
            <div className='RighC'>
              <i className='fas fa-bell '></i>
            </div>
            <div className='RighC'>
              <NavLink
                style={({ isActive }) => {
                  return {
                    display: 'block',
                    margin: '1rem 0',
                    color: isActive ? 'white' : 'rgba(255, 255, 255, 0.65)',
                  };
                }}
                to={`/cart`}>
                <i className='fas fa-shopping-bag'></i>{' '}
                {fetchedData.purchased.length}
              </NavLink>
            </div>
            <div className='RighC'>
              <NavLink
                style={({ isActive }) => {
                  return {
                    display: 'block',
                    margin: '1rem 0',
                    color: isActive ? 'white' : 'rgba(255, 255, 255, 0.65)',
                  };
                }}
                to={`/profile`}>
                <i className='fas fa-user-circle'></i>
              </NavLink>
            </div>

            <div className='RighC'>
              {location.pathname === '/register' ? (
                <NavLink
                  style={({ isActive }) => {
                    return {
                      display: 'block',
                      margin: '1rem 0',
                      color: isActive ? 'white' : 'rgba(255, 255, 255, 0.65)',
                    };
                  }}
                  to={`/login`}>
                  Sign in <i className='fas fa-sign-out-alt ps-2'></i>
                </NavLink>
              ) : location.pathname === '/login' ? (
                <NavLink
                  style={({ isActive }) => {
                    return {
                      display: 'block',
                      margin: '1rem 0',
                      color: isActive ? 'white' : 'rgba(255, 255, 255, 0.65)',
                    };
                  }}
                  to={`/register`}>
                  Sign up <i className='fas fa-sign-out-alt ps-2'></i>
                </NavLink>
              ) : (
                <NavLink
                  style={({ isActive }) => {
                    return {
                      display: 'block',
                      margin: '1rem 0',
                      color: isActive ? 'white' : 'rgba(255, 255, 255, 0.65)',
                    };
                  }}
                  to={`/login`}>
                  Logout <i className='fas fa-sign-out-alt ps-2'></i>
                </NavLink>
              )}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
