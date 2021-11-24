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
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className='admin mt-5'>
      <div className='container'>
        <div className=' d-flex justify-content-between mb-3'>
          <NavLink to='/productform/new'>
            <button
              onClick={() => navigate('/productform/new')}
              className='text-capitalize btn btn-primary m-1'>
              add product
            </button>
          </NavLink>
          <button
            onClick={() => dispatch(fetchDefaultProducts())}
            className='text-capitalize btn btn-outline-danger m-1'>
            reset default <i className='fas fa-redo-alt'></i>
          </button>
        </div>
        <div className=' table-responsive text-center'>
          <table className='admin-table table-hover table '>
            <thead>
              <tr className='text-dark'>
                <th>ID</th>
                <th>Pro.Img</th>
                <th>Pro.Title</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.products.map((product, index) => {
                return (
                  <tr key={product.id}>
                    <td className='text-dark'>{product.id}</td>
                    <td className='text-dark'>
                      <img className='product-img' src={product.image} alt='' />
                    </td>
                    <td className='text-dark '>{product.title}</td>
                    <td className='text-dark'> {product.price}$</td>
                    <td className='text-dark'>
                      <i
                        onClick={() => navigate(`/productform/${product.id}`)}
                        style={{ cursor: 'pointer' }}
                        className='btn btn-outline-warning fas fa-edit'></i>
                    </td>
                    <td>
                      <i
                        onClick={() => dispatch(adminDeleteAction(product))}
                        className='fas fa-trash m-2 btn btn-outline-danger'
                        style={{ cursor: 'pointer' }}></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
