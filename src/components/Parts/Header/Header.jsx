import React, { useContext } from 'react';
import { NavLink, Link, useLocation ,useNavigate } from 'react-router-dom';
import { auth } from '../../../Firebase/Firebase';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../../context/Auth';
import Notifications from '../Notifications/Notifications';
import avatar from "../../../assets/images/avatar.jpg";
import './Header.scss';

function Header() {
  const { user, data} = useContext(AuthContext);
  const { fetchedData } = useSelector((state) => state);
  const location = useLocation();
  const Navigate = useNavigate(); 
  const handleSearch = (e) =>{
    e.preventDefault();
    Navigate(`/search/${e.target[0].value}`)
  }
  return (
    <nav className='main__navbar navbar navbar-expand-lg navbar-light'>
      <div className='container-fluid align-items-center'>
        <Link className='navbar__logo navbar-brand nav-link' to='/'>
          <img src='./logo.png' alt='' />
        </Link>
        <div className='navbar__search'>
          <form  onSubmit={handleSearch} className='search__form d-flex'>
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
                {/* <div className='list__itemProfileDecoration'></div> */}
              </div>
            </div>
          </div>
        )}
        <input type='checkbox' id='check' />
        <label htmlFor='check' className='ms-auto'>
          <span className='navbar-toggler-icon'></span>
        </label>
        <ul className='navbar__list navbar-nav ms-0 mb-2 mb-lg-0 align-items-center'>
          <li className='navbar__listItem nav-item d-flex'>
            <Link
              className='item__link nav-link active'
              aria-current='page'
              to='/'>
              <i className='fa__item fas fa-home'></i>
              <span className='text-capitalize d-block d-lg-none ms-3'>
                home
              </span>
            </Link>
            {/* <div className='item__linkDecoration'></div> */}
          </li>
          <li className='navbar__listItem nav-item d-flex'>
            <Link className='item__link nav-link' to='/messages'>
              <i className='fa__item far fa-comment-alt'></i>
              <span className='item__notification'></span>
              <span className='text-capitalize d-block d-lg-none  ms-3'>
                messages
              </span>
            </Link>

            {/* <div className='item__linkDecoration'></div> */}
          </li>
          <li className='item__forNotification navbar__listItem nav-item d-flex'>
            <input type='checkbox' id='notification' />
            <label
              htmlFor='notification'
              className='item__forNotification item__link nav-link'>
              <i className='fa__item far fa-bell'></i>
              <span className='item__notification'></span>
              <span className='text-capitalize d-block d-lg-none  ms-3'>
                notifications
              </span>
            </label>
            <Notifications />
            {/* <div className='item__linkDecoration'></div> */}
          </li>
          <li className='navbar__listItem nav-item d-flex'>
            <Link className=' item__link nav-link' to='/cart'>
              <i className='fa__item fas fa-shopping-cart'>
                {fetchedData.purchased.length}
              </i>
              <span className='text-capitalize d-block d-lg-none ms-3'>
                cart
              </span>
            </Link>
            {/* <div className='item__linkDecoration'></div> */}
          </li>
          <li className='navbar__listItem nested__list nav-item d-flex'>
            <div className='item__link nav-link'>
              <i className='fa__item fas fa-th-large'></i>
              <span className='text-capitalize d-block d-lg-none  ms-3'>
                more
              </span>
              <i className='fas fa-sort-down d-block d-lg-none ms-auto pe-1'></i>
            </div>
            <ul className='list__itemOption list-unstyled text-dark p-2'>
              <li className='option__eCommerce mb-2'>
                <Link className='btn text-capitalize w-100' to='/products/1'>
                  <i className='fas fa-store'></i> ecommerce
                </Link>
                {/* <div className='item__linkDecoration'></div> */}
              </li>
              <li className='option__setting mb-2'>
                <Link className='btn text-capitalize w-100' to='/edit'>
                  <i className='fas fa-cogs'></i> Edit Profile
                </Link>
                {/* <div className='item__linkDecoration'></div> */}
              </li>
              <li className='option__logout'>
                {location.pathname === '/register' ? (
                  <NavLink
                    className=' btn btn-outline-danger  text-capitalize w-100'
                    to={`/login`}>
                    <i className='fas fa-sign-out-alt'></i> Sign in
                  </NavLink>
                ) : location.pathname === '/login' ||
                  location.pathname === '/wellcome' ? (
                  <NavLink
                    className=' btn btn-outline-danger  text-capitalize w-100'
                    to={`/register`}>
                    <i className='fas fa-sign-out-alt'></i> Sign up
                  </NavLink>
                ) : (
                  <NavLink
                    className=' btn btn-outline-danger  text-capitalize w-100'
                    to={`/wellcome`}
                    onClick={() => auth.signOut()}>
                    <i className='fas fa-sign-out-alt'></i> logout
                  </NavLink>
                )}
              </li>
            </ul>
            {/* <div className='item__linkDecoration'></div> */}
          </li>
        </ul>
      </div>
    </nav>

    /* ------------------------------- start edit ------------------------------- */

    // <nav className='main__navbar navbar navbar-expand-lg navbar-light'>
    //   <div className='container-fluid'>
    //     <Link className='navbar__logo navbar-brand' to='/'>
    //       Minuteف
    //     </Link>
    //     <button
    //       className='navbar-toggler'
    //       type='button'
    //       data-bs-toggle='collapse'
    //       data-bs-target='#navbarSupportedContent'
    //       aria-controls='navbarSupportedContent'
    //       aria-expanded='false'
    //       aria-label='Toggle navigation'>
    //       <span className='navbar-toggler-icon'></span>
    //     </button>
    //     <div className='collapse navbar-collapse' id='navbarSupportedContent'>
    //       <div className='navbar__search'>
    //         <form className='search__form d-flex'>
    //           <input
    //             className='search__formInput form-control'
    //             type='search'
    //             placeholder='Search...'
    //             aria-label='Search'
    //           />
    //           <button className='search__formBtn' type='submit'>
    //             <i className='fas fa-search text-dark '></i>
    //           </button>
    //         </form>
    //       </div>
    //       <ul className='navbar__list navbar-nav ms-auto mb-2 mb-lg-0 align-items-center'>
    //         {user && (
    //           <li className='navbar__listItem  nav-item'>
    //             <div className='list__itemProfile'>
    //               <Link
    //                 className='nav-link active d-flex align-items-center p-1'
    //                 aria-current='page'
    //                 to='/profile'>
    //                 <figure className='mb-0 rounded-circle'>
    //                   <img
    //                     className='w-100 rounded-circle'
    //                     src={data.imageUrl ? data.imageUrl : image}
    //                     alt=''
    //                   />
    //                 </figure>
    //                 <div className='ms-1'>
    //                   <h5 className='text-capitalize mb-0'>
    //                     {user.displayName}
    //                   </h5>
    //                 </div>
    //               </Link>
    //               <div className='list__itemProfileDecoration'></div>
    //             </div>
    //           </li>
    //         )}
    //         <li className='navbar__listItem nav-item'>
    //           <Link
    //             className='item__link nav-link active'
    //             aria-current='page'
    //             to='/'>
    //             <i className='fa__item fas fa-home'></i>
    //           </Link>
    //         </li>
    //         <li className='navbar__listItem nav-item'>
    //           <Link className='item__link nav-link' to='/messages'>
    //             <i className='fa__item far fa-comment-alt'></i>
    //             <span className='item__notification'></span>
    //           </Link>
    //         </li>
    //         <li className='item__forNotification navbar__listItem nav-item'>
    //           <input type='checkbox' id='notification' />
    //           <label
    //             htmlFor='notification'
    //             className='item__forNotification item__link nav-link'>
    //             <i className='fa__item far fa-bell'></i>
    //             <span className='item__notification'></span>
    //           </label>
    //           <Notifications />
    //         </li>
    //         <li className='navbar__listItem nav-item'>
    //           <Link className=' item__link nav-link' to='/cart'>
    //             <i className='fa__item fas fa-shopping-cart'>
    //               {fetchedData.purchased.length}
    //             </i>
    //           </Link>
    //         </li>
    //         <li className='navbar__listItem nested__list  nav-item'>
    //           <div className='item__link'>
    //             <i className='fa__item fas fa-th-large'></i>
    //           </div>
    //           <ul className='list__itemOption list-unstyled text-dark p-2'>
    //             <li className='option__eCommerce mb-2'>
    //               <Link className='btn text-capitalize w-100' to='/products'>
    //                 <i className='fas fa-store'></i> ecommerce
    //               </Link>
    //             </li>
    //             <li className='option__setting mb-2'>
    //               <Link className='btn text-capitalize w-100' to='/edit'>
    //                 <i className='fas fa-cogs'></i> Edit Profile
    //               </Link>
    //             </li>
    //             <li className='option__logout'>
    //               {location.pathname === '/register' ? (
    //                 <NavLink
    //                   className=' btn btn-outline-danger  text-capitalize w-100'
    //                   to={`/login`}>
    //                   <i className='fas fa-sign-out-alt'></i> Sign in
    //                 </NavLink>
    //               ) : location.pathname === '/login' ||
    //                 location.pathname === '/wellcome' ? (
    //                 <NavLink
    //                   className=' btn btn-outline-danger  text-capitalize w-100'
    //                   to={`/register`}>
    //                   <i className='fas fa-sign-out-alt'></i> Sign up
    //                 </NavLink>
    //               ) : (
    //                 <NavLink
    //                   className=' btn btn-outline-danger  text-capitalize w-100'
    //                   to={`/wellcome`}
    //                   onClick={() => auth.signOut()}>
    //                   <i className='fas fa-sign-out-alt'></i> logout
    //                 </NavLink>
    //               )}
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Header;
