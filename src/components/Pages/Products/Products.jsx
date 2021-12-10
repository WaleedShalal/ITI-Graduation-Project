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
import Pagination from '../../Parts/Pagination/Pagination';
import './Products.scss';

const Products = () => {
  const { fetchedData } = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(fetchedData.filterValue, fetchedData.sortValue);

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8);

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

  /* ---------------------------- start new filter ---------------------------- */

  const toggleFilterOption = (targetElement) => {
    let clickedElement = document.getElementById(targetElement);
    let icon = document.getElementById(`fa__${targetElement}`);
    clickedElement.classList.toggle('active');
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');
  };

  const [minPriceValue, setMinPriceValue] = useState(fetchedData.minPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(fetchedData.maxPrice);

  const handlePriceForm = (e) => {
    e.preventDefault();
    if (minPriceValue && maxPriceValue) {
      dispatch(
        showSortAndFilter(
          e,
          fetchedData.products,
          fetchedData.filter,
          minPriceValue,
          maxPriceValue,
        ),
      );
      setMinPriceValue('');
      setMaxPriceValue('');
    }
  };
  const handlePriceChange = (e) => {
    e.target.name === 'MIN_PRICE_VALUE'
      ? setMinPriceValue(e.target.value)
      : setMaxPriceValue(e.target.value);
  };

  // const textInput = useRef(null);

  // function handleClickElement() {
  //   // textInput.current.focus();
  //   console.log(textInput);
  // }

  return (
    <React.Fragment>
      <section className='main__products container-fluid'>
        <div className='row'>
          <div className='for__filterOptions col-sm-4 col-md-3'>
            <div className='filter__optionWrapper d-flex flex-column justify-content-center align-items-center pt-3'>
              <h3 className='text-capitalize mb-5'>filter</h3>
              <ul className='list-unstyled w-100 px-3'>
                <li>
                  <div
                    className='d-flex'
                    onClick={() => toggleFilterOption('showCategory')}>
                    <h6 className='text-capitalize'>category</h6>
                    <span className='ms-auto'>
                      <i id='fa__showCategory' className='fas fa-plus'></i>
                    </span>
                  </div>
                  <div id='showCategory' className='category  py-1'>
                    <div className='text-center'>
                      <select
                        className='category__select w-100'
                        value={fetchedData.filterValue}
                        name='FILTER_VALUE'
                        onChange={(e) =>
                          dispatch(
                            showSortAndFilter(
                              e,
                              fetchedData.products,
                              fetchedData.filter,
                              fetchedData.minPrice,
                              fetchedData.maxPrice,
                            ),
                          )
                        }>
                        <option value='all'>All</option>
                        <option value="men's clothing">men's clothing</option>
                        <option value="women's clothing">
                          women's clothing
                        </option>
                        <option value='jewelery'>jewelery</option>
                        <option value='electronics'>electronics</option>
                      </select>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className='d-flex'
                    onClick={() => toggleFilterOption('showSort')}>
                    <h6 className='text-capitalize'>sort</h6>
                    <span className='ms-auto'>
                      <i id='fa__showSort' className='fas fa-plus'></i>
                    </span>
                  </div>
                  <div id='showSort' className='sort py-1'>
                    <div className=' text-center'>
                      <select
                        className='sort__select w-100'
                        value={fetchedData.sortValue}
                        name='SORT_VALUE'
                        onChange={(e) =>
                          dispatch(
                            showSortAndFilter(
                              e,
                              fetchedData.products,
                              fetchedData.filter,
                              fetchedData.minPrice,
                              fetchedData.maxPrice,
                            ),
                          )
                        }>
                        <option value='latest'>Latest</option>
                        <option value='lowest'>Lowest</option>
                        <option value='highest'>Highest</option>
                      </select>
                    </div>
                  </div>
                </li>
                <li className='text-capitalize'>
                  <div
                    className='d-flex'
                    onClick={() => toggleFilterOption('showPrice')}>
                    <h6 className='text-capitalize'>price</h6>
                    <span className=' ms-auto'>
                      <i id='fa__showPrice' className='fas fa-plus'></i>
                    </span>
                  </div>
                  <div id='showPrice' className='price py-1'>
                    <div className=' d-flex justify-content-between'>
                      <form
                        className='price__form d-flex flex-wrap justify-content-center'
                        name='PRICE_VALUE'
                        onSubmit={handlePriceForm}>
                        <div className='w-50 p-1'>
                          <input
                            type='number'
                            placeholder='Min'
                            className='w-100'
                            name='MIN_PRICE_VALUE'
                            value={minPriceValue}
                            onChange={(e) => handlePriceChange(e)}
                          />
                        </div>
                        <div className='w-50 p-1'>
                          <input
                            type='number'
                            placeholder='Max'
                            className='w-100'
                            name='MAX_PRICE_VALUE'
                            value={maxPriceValue}
                            onChange={(e) => handlePriceChange(e)}
                          />
                        </div>
                        <div className='d-flex justify-content-center mt-3'>
                          <button
                            type='submit'
                            className=' btn btn-outline-primary text-uppercase'>
                            ok
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </li>
                <li>
                  <div className=''>
                    <Link className='d-flex' to='/admin'>
                      <span>Edit Products</span>
                      <span className='ms-auto'>
                        <i className='far fa-edit'></i>
                      </span>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-sm-8 col-md-9'>
            <div className='options__wrapper row'>
              <div className='options d-flex flex-wrap justify-content-between py-4 '>
                <div className='col d-flex'>
                  <h5 className='text-capitalize'>results</h5>
                  <h5 className='ms-1'>({currentProducts.length})</h5>
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
              <div className='products d-flex flex-wrap justify-content-evenly mb-3'>
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
                      {/* <p className='card-text'>{product.price}$</p> */}
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
              <Pagination
                dataPerPage={productPerPage}
                totalData={fetchedData.filter.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
    //       <div className='col-9'>
    //         <div className='options__wrapper row '>
    //           <div className='options d-flex flex-wrap justify-content-between py-3 '>
    //             <div className='col-sm-6 col-lg text-center py-1'>
    //               <Link className='option__edit' to='/admin'>
    //                 Edit Products <i className='far fa-edit'></i>
    //               </Link>
    //             </div>
    //             <div className='filter col-sm-6 col-lg text-center py-1'>
    //               <span>Filter by : </span>
    //               <select
    //                 value={fetchedData.filterValue}
    //                 name='FILTER_VALUE'
    //                 onChange={(e) =>
    //                   dispatch(
    //                     showSortAndFilter(
    //                       e,
    //                       fetchedData.products,
    //                       fetchedData.filter,
    //                     ),
    //                   )
    //                 }>
    //                 <option value='all'>All</option>
    //                 <option value="men's clothing">men's clothing</option>
    //                 <option value="women's clothing">women's clothing</option>
    //                 <option value='jewelery'>jewelery</option>
    //                 <option value='electronics'>electronics</option>
    //               </select>
    //             </div>
    //             <div className='sort col-sm-6 col-lg  text-center py-1'>
    //               <span>Sort by : </span>
    //               <select
    //                 value={fetchedData.sortValue}
    //                 name='SORT_VALUE'
    //                 onChange={(e) =>
    //                   dispatch(
    //                     showSortAndFilter(
    //                       e,
    //                       fetchedData.products,
    //                       fetchedData.filter,
    //                     ),
    //                   )
    //                 }>
    //                 <option value='latest'>Latest</option>
    //                 <option value='lowest'>Lowest</option>
    //                 <option value='highest'>Highest</option>
    //               </select>
    //             </div>
    //             {fetchedData.purchased.length > 0 && (
    //               <div className='button col-sm-6 col-lg text-center py-1'>
    //                 <button
    //                   className='btn btn-outline-danger btn-sm'
    //                   onClick={() => dispatch(removeAllCart())}>
    //                   Remove All
    //                 </button>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //         <div className='row py-4'>
    //           <div className='products d-flex flex-wrap justify-content-between'>
    //             {currentProducts.map((product) => (
    //               <div key={product.id} className='card'>
    //                 <div className='card__header'>
    //                   <figure className='text-center'>
    //                     <img
    //                       src={product.image}
    //                       className='card-img-top'
    //                       alt='...'
    //                     />
    //                   </figure>
    //                   <div className='product__detailsWrapper'>
    //                     <Link
    //                       to={`/products/productdetails/${product.id}`}
    //                       className='product__details text-capitalize '>
    //                       details
    //                     </Link>
    //                   </div>
    //                 </div>
    //                 <div className='card-body text-dark'>
    //                   <p className='card-text'>{product.title}</p>
    //                   <p className='card-text'>{product.price}$</p>
    //                   {/* <p className='card-text'>{product.price}$</p> */}
    //                   <div className='btn-container'>
    //                     <button
    //                       onClick={() => dispatch(addCart(product))}
    //                       className='product__addBtn btn btn-primary'>
    //                       Add Cart
    //                     </button>
    //                     {fetchedData.purchased.map((pur) =>
    //                       pur.id === product.id ? (
    //                         <button
    //                           key={product.id}
    //                           onClick={() => dispatch(removeCart(product))}
    //                           className='product__removeBtn btn btn-outline-danger'>
    //                           Remove Cart
    //                         </button>
    //                       ) : null,
    //                     )}
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <Pagination
    //       dataPerPage={productPerPage}
    //       totalData={fetchedData.filter.length}
    //       paginate={paginate}
    //     />
    //   </section>
    // </React.Fragment>
  );
};

export default Products;
