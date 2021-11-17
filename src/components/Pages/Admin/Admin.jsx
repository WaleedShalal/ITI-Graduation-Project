import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  adminDeleteAction,
  fetchProducts,
  fetchDefaultProducts,
} from '../../../store/cartActions';
import './Admin.scss';

const Admin = () => {
  const { fetchedData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className='admin'>
        <h1>Admin</h1>
        <div className='d-flex justify-content-between mb-2'>
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
        <div className='table-responsive text-center'>
          <table className='admin-table table '>
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
    </React.Fragment>
  );
};

export default Admin;
