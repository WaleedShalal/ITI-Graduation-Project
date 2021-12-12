import React, { useContext } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../../Firebase/Firebase';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../../context/Auth';
import Notifications from '../Notifications/Notifications';
import avatar from '../../../assets/images/avatar.jpg';
import Loader from '../Loader/Loader';
import logoImg from '../../../assets/images/logo/logo.png';
import './Header.scss';

function Header() {
  const { user, data } = useContext(AuthContext);
  const { fetchedData } = useSelector((state) => state);
  let location = useLocation();
  const Navigate = useNavigate();
  const addClassActive = () => {
    let item = document.getElementById('notifications__window');
    item.classList.toggle('active');
  };
  const handleSearch = (e) => {
    e.preventDefault();
    Navigate(`/search/${e.target[0].value}`);
  };
  /* ------------------------ will need edit but later ------------------------ */
  window.onclick = (e) => {
    let element = document.getElementById('main__navbarList');
    let elementTwo = document.getElementById('more__option');
    let tragetElement = e.target;
    if (element && elementTwo && tragetElement) {
      if (tragetElement.classList.contains('navbar-toggler-icon'))
        element.classList.toggle('active');
      if (!tragetElement.classList.contains('navbar-toggler-icon'))
        !tragetElement.classList.contains('navbar__list') &&
          !elementTwo.classList.contains('active') &&
          element.classList.contains('active') &&
          element.classList.remove('active');
      elementTwo.classList.remove('active');
    }
  };
  const testClass = () => {
    let element = document.getElementById('more__option');
    element.classList.toggle('active');
  };
  /* ------------------------ will need edit but later ------------------------ */

  return data.email ? (
    <nav className='main__navbar navbar navbar-expand-lg navbar-light'>
      <div className='container-fluid align-items-center'>
        <Link className='navbar__logo navbar-brand nav-link' to='/'>
          <img src={logoImg} alt='' />
        </Link>
        <div className='navbar__search'>
          <form onSubmit={handleSearch} className='search__form d-flex'>
            <input
              className='search__formInput form-control'
              type='search'
              placeholder='Search...'
              aria-label='Search'
            />
            <button className='search__formBtn' type='submit'>
              <i className='fas fa-search text-dark '></i>
            </button>
          </form>
        </div>
        {user && (
          <div className='navbar__listProfile ms-auto '>
            <div className='navbar__listItemProfile nav-item'>
              <div className='list__itemProfile d-flex'>
                <Link
                  className='profile__link nav-link d-flex align-items-center p-1'
                  aria-current='page'
                  to={`/profile/${data.id}`}>
                  <figure className='mb-0 rounded-circle'>
                    <img
                      className='rounded-circle'
                      src={data.imageUrl ? data.imageUrl : avatar}
                      alt=''
                    />
                  </figure>
                  <div className='ms-1'>
                    <h5 className='text-capitalize text-dark mb-0'>
                      {user.displayName}
                    </h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className='navbar__togglerIcon ms-auto'>
          <span className='navbar-toggler-icon'></span>
        </div>
        <ul
          id='main__navbarList'
          className='navbar__list navbar-nav ms-0 mb-2 mb-lg-0 align-items-center'>
          <li className='navbar__listItem nav-item d-flex'>
            <Link
              className='item__link not__optionLink nav-link active'
              aria-current='page'
              to='/'>
              <i className='fa__item fas fa-home'></i>
              <span className='text-capitalize d-block d-lg-none ms-3'>
                home
              </span>
            </Link>
          </li>
          <li className='navbar__listItem nav-item d-flex'>
            <Link
              className='item__link  not__optionLink nav-link'
              to='/messages'>
              <i className='fa__item far fa-comment-alt'></i>
              <span className='item__notification'>3</span>
              <span className='text-capitalize d-block d-lg-none  ms-3'>
                messages
              </span>
            </Link>
          </li>
          <li className='item__forNotification navbar__listItem nav-item d-flex'>
            <div
              className='item__link nav-link'
              onClick={() => addClassActive()}>
              <i className='fa__item  not__optionLink far fa-bell'></i>
              <span className='item__notification'>4</span>
              <span className='text-capitalize d-block d-lg-none  ms-3'>
                notifications
              </span>
            </div>
            <Notifications addClassActive={addClassActive} />
          </li>
          <li className='navbar__listItem nav-item d-flex'>
            <Link className=' item__link  not__optionLink nav-link' to='/cart'>
              <i className='fa__item fas fa-shopping-cart'>
                {fetchedData.purchased.length}
              </i>
              <span className='text-capitalize d-block d-lg-none ms-3'>
                cart
              </span>
            </Link>
          </li>
          <li className='navbar__listItem nested__list nav-item d-flex'>
            <div
              id='more__option'
              className='item__link  nav-link'
              onClick={testClass}>
              <i className='fa__item fas fa-th-large'></i>
              <span className='text-capitalize d-block d-lg-none  ms-3'>
                more
              </span>
              <i className='fas fa-sort-down d-block d-lg-none ms-auto pe-1'></i>
            </div>
            <ul className='list__itemOption list-unstyled text-dark p-2'>
              <li className='option__eCommerce mb-2'>
                <Link
                  className='option__link btn text-capitalize w-100'
                  to='/products/1'>
                  <i className='fas fa-store'></i> ecommerce
                </Link>
              </li>
              <li className='option__setting mb-2'>
                <Link
                  className='option__link btn text-capitalize w-100'
                  to='/edit'>
                  <i className='fas fa-cogs'></i> Edit Profile
                </Link>
              </li>
              <li className='option__logout'>
                {location.pathname === '/register' ? (
                  <NavLink
                    className='option__link btn btn-outline-danger  text-capitalize w-100'
                    to={`/login`}>
                    <i className='fas fa-sign-out-alt'></i> Sign in
                  </NavLink>
                ) : location.pathname === '/login' ||
                  location.pathname === '/welcome' ? (
                  <NavLink
                    className='option__link btn btn-outline-danger  text-capitalize w-100'
                    to={`/register`}>
                    <i className='fas fa-sign-out-alt'></i> Sign up
                  </NavLink>
                ) : (
                  <NavLink
                    className='option__link btn btn-outline-danger  text-capitalize w-100'
                    to={`/welcome`}
                    onClick={() => auth.signOut()}>
                    <i className='fas fa-sign-out-alt'></i> logout
                  </NavLink>
                )}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  ) : (
    <Loader />
  );
}

export default Header;
