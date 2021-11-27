import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  addCart,
  removeCart,
  removeAllCart,
  showSortAndFilter,
} from '../../../store/cartActions';
import './Products.scss';
import Pagination from '../../Parts/Pagination/Pagination';

const Products = () => {
  const { fetchedData } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = fetchedData.filter.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <section className='main__products container'>
        <div className='options__wrapper row '>
          <div className='options d-flex flex-wrap justify-content-between py-3 '>
            <div className='col-sm-6 col-lg text-center py-1'>
              <Link className='option__edit' to='/admin'>
                Edit Products <i className='far fa-edit'></i>
              </Link>
            </div>
            <div className='filter col-sm-6 col-lg text-center py-1'>
              <span>Filter by : </span>
              <select
                value={fetchedData.filterValue}
                name='FILTER_VALUE'
                onChange={(e) =>
                  dispatch(
                    showSortAndFilter(
                      e,
                      fetchedData.products,
                      fetchedData.filter,
                    ),
                  )
                }>
                <option value='all'>All</option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
                <option value='jewelery'>jewelery</option>
                <option value='electronics'>electronics</option>
              </select>
            </div>
            <div className='sort col-sm-6 col-lg  text-center py-1'>
              <span>Sort by : </span>
              <select
                value={fetchedData.sortValue}
                name='SORT_VALUE'
                onChange={(e) =>
                  dispatch(
                    showSortAndFilter(
                      e,
                      fetchedData.products,
                      fetchedData.filter,
                    ),
                  )
                }>
                <option value='latest'>Latest</option>
                <option value='lowest'>Lowest</option>
                <option value='highest'>Highest</option>
              </select>
            </div>
            {fetchedData.purchased.length > 0 && (
              <div className='button col-sm-6 col-lg text-center py-1'>
                <button
                  className='btn btn-outline-danger btn-sm'
                  onClick={() => dispatch(removeAllCart())}>
                  Remove All
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='row py-4'>
          <div className='products d-flex flex-wrap justify-content-between'>
            {currentProducts.map((product) => (
              <div key={product.id} className='card'>
                <div className='card__header'>
                  <figure className='text-center'>
                    <img
                      src={product.image}
                      className='card-img-top'
                      alt='...'
                    />
                  </figure>
                  <div className='product__detailsWrapper'>
                    <Link
                      to={`/products/productdetails/${product.id}`}
                      className='product__details text-capitalize '>
                      details
                    </Link>
                  </div>
                </div>
                <div className='card-body text-dark'>
                  <p className='card-text'>{product.title}</p>
                  <p className='card-text'>{product.price}$</p>
                  <div className='btn-container'>
                    <button
                      onClick={() => dispatch(addCart(product))}
                      className='product__addBtn btn btn-primary'>
                      Add Cart
                    </button>
                    {fetchedData.purchased.map((pur) =>
                      pur.id === product.id ? (
                        <button
                          key={product.id}
                          onClick={() => dispatch(removeCart(product))}
                          className='product__removeBtn btn btn-outline-danger'>
                          Remove Cart
                        </button>
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          dataPerPage={productPerPage}
          totalData={fetchedData.filter.length}
          paginate={paginate}
        />
      </section>
    </React.Fragment>
  );
};

export default Products;
