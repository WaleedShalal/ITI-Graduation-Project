import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import {
  adminDeleteAction,
  fetchProducts,
  fetchDefaultProducts,
} from '../../../store/cartActions';
import userImage from '../../../assets/images/user-img.png';

import './Admin.scss';

const Admin = () => {
  const { fetchedData } = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <nav className='main__navbar navbar navbar-expand-lg navbar-light'>
        <div className='container-fluid'>
          <a className='navbar__logo navbar-brand' href='#'>
            Minuteف
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <div className='navbar__search'>
              <form className='search__form d-flex'>
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
            <ul className='navbar__list navbar-nav ms-auto mb-2 mb-lg-0 align-items-center'>
              <li className='navbar__listItem  nav-item'>
                <div className='list__itemProfile'>
                  <a
                    className='nav-link active d-flex align-items-center p-1'
                    aria-current='page'
                    href='#'>
                    <figure className='mb-0 rounded-circle'>
                      <img
                        className='w-100 rounded-circle'
                        src={userImage}
                        alt=''
                      />
                    </figure>
                    <div className='ms-1'>
                      <h5 className='text-capitalize mb-0'>waleed elbana</h5>
                    </div>
                  </a>
                </div>
              </li>
              <li className='navbar__listItem nav-item'>
                <a
                  className='item__link nav-link active'
                  aria-current='page'
                  href='#'>
                  <i className='fa__item fas fa-home'></i>
                </a>
              </li>
              <li className='navbar__listItem nav-item'>
                <a className='item__link nav-link' href='#'>
                  <i className='fa__item far fa-comment-alt'></i>
                  <span className='item__notification'></span>
                </a>
              </li>
              <li className='navbar__listItem nav-item'>
                <a className='item__link nav-link' href='#'>
                  <i className='fa__item far fa-bell'></i>
                  <span className='item__notification'></span>
                </a>
              </li>
              <li className='navbar__listItem nav-item'>
                <a className=' item__link nav-link' href='#'>
                  <i class='fa__item fas fa-shopping-cart'></i>
                </a>
              </li>
              <li className='navbar__listItem nested__list  nav-item'>
                <div className='item__link'>
                  <i class='fa__item fas fa-th-large'></i>
                </div>
                <ul className='list__itemOption list-unstyled text-dark p-2'>
                  <li className='option__eCommerce mb-2'>
                    <a className='btn text-capitalize w-100' href='#'>
                      <i class='fas fa-store'></i> ecommerce
                    </a>
                  </li>
                  <li className='option__setting mb-2'>
                    <a className='btn text-capitalize w-100' href='#'>
                      <i class='fas fa-cogs'></i> setting
                    </a>
                  </li>
                  <li className='option__logout'>
                    <a className=' btn btn-outline-danger  text-capitalize w-100'>
                      <i class='fas fa-sign-out-alt'></i> logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <div className='admin '>
        <h1 className='text-center mb-5'>Admin</h1>
        <div className='container'>
          <div className=' d-flex justify-content-between mb-3'>
            <NavLink to='/productform/new'>
              <button
                onClick={() => navigate('/productform/new')}
                className='btn btn-primary m-1'>
                Add
              </button>
            </NavLink>
            <button
              onClick={() => dispatch(fetchDefaultProducts())}
              className='btn btn-primary m-1'>
              Reset Default
            </button>
          </div>
          <div className=' table-responsive text-center'>
            <table className='admin-table table text-white '>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Pro.Img</th>
                  <th scope='col'>Pro.Des</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Edit</th>
                  <th scope='col'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {fetchedData.products.map((product, index) => {
                  return (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img className='cart-img' src={product.image} alt='' />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>
                        <i
                          onClick={() => navigate(`/productform/${product.id}`)}
                          style={{ cursor: 'pointer' }}
                          className='fas fa-edit'></i>
                      </td>
                      <td>
                        <i
                          onClick={() => dispatch(adminDeleteAction(product))}
                          className='fas fa-trash'
                          style={{ cursor: 'pointer' }}></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default Admin;
