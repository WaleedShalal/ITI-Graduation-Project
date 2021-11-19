import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addCart } from '../../../store/cartActions';
import userImage from '../../../assets/images/user-img.png';
import './ProductDetails.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchedData } = useSelector((state) => state);
  const isFromCart = pathname.includes('cart');
  const productItem = isFromCart
    ? fetchedData.purchased.filter((p) => p.id === parseInt(id))[0]
    : fetchedData.filter.filter((p) => p.id === parseInt(id))[0];
  const handleBack = () => {
    isFromCart ? navigate('/cart') : navigate('/products');
  };
  return (
    <React.Fragment>
      <section className='full-details container  pb-3'>
        <h2 className='text-center mb-5'>Details For Product</h2>
        <div className='product__details__wrapper mt-5'>
          <div className='row'>
            <div className='product__images col-6'>
              <div className='row'>
                <div className='mini__images col-2'>
                  <figure className=''>
                    <img className=' w-100' src={productItem.image} alt='' />
                  </figure>
                  <figure className=''>
                    <img className=' w-100' src={productItem.image} alt='' />
                  </figure>
                  <figure className=''>
                    <img className=' w-100' src={productItem.image} alt='' />
                  </figure>
                </div>
                <figure className='col-10 mb-0'>
                  <img
                    className='product-img w-100'
                    src={productItem.image}
                    alt=''
                  />
                </figure>
              </div>
            </div>
            <div className='product-info offset-1 col-5 d-flex flex-column justify-content-between'>
              <div className='info'>
                <div className='mb-3'>
                  <span className='fs-5 fw-bold'>Product Title</span> :{' '}
                  {productItem.title}.
                </div>
                <div className='mb-3'>
                  <span className='fs-5 fw-bold'>Product Desciption</span> :{' '}
                  {productItem.description}.
                </div>
                <div className='mb-3'>
                  <span className='fs-5 fw-bold'>Product Price</span> :{' '}
                  {productItem.price}$.
                </div>
                <div className=''>
                  <span className='fs-5 fw-bold'>Product Count</span> :{' '}
                  {productItem.count}.
                </div>
              </div>
              <div className='options__btn row'>
                <div className='col-6'>
                  <button
                    onClick={() => dispatch(addCart(productItem))}
                    className='btn btn-primary'>
                    Add Cart
                  </button>
                </div>
                <div className='col-6'>
                  <button onClick={handleBack} className='btn btn-primary'>
                    {isFromCart ? 'Back Cart' : 'Back Products'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className='container my-5' />
      <section className='product__reviews'>
        <div className='container'>
          <h2 className='text-capitalize mb-5'>top reviews</h2>
          <div className='customer__rates mt-5'>
            <div className='row'>
              <figure className='col-2 text-center'>
                <img className='w-50' src={userImage} alt='...' />
              </figure>
              <div className='col-10 mb-5'>
                <h3 className='text-capitalize'>username</h3>
                <div className='mb-4'>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='far fa-star'></i>
                </div>
                <p className='w-50'>
                  This is some content from a media component. You can replace
                  this with any content and adjust it as needed.
                </p>
              </div>
              <figure className='col-2 text-center'>
                <img className='w-50' src={userImage} alt='...' />
              </figure>
              <div className='col-10 mb-5'>
                <h3 className='text-capitalize'>username</h3>
                <div className='mb-4'>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='far fa-star'></i>
                </div>
                <p className='w-50'>
                  This is some content from a media component. You can replace
                  this with any content and adjust it as needed.
                </p>
              </div>
              <figure className='col-2 text-center'>
                <img className='w-50' src={userImage} alt='...' />
              </figure>
              <div className='col-10 mb-5'>
                <h3 className='text-capitalize'>username</h3>
                <div className='mb-4'>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='far fa-star'></i>
                </div>
                <p className='w-50'>
                  This is some content from a media component. You can replace
                  this with any content and adjust it as needed.
                </p>
              </div>
              <figure className='col-2 text-center'>
                <img className='w-50' src={userImage} alt='...' />
              </figure>
              <div className='col-10 mb-5'>
                <h3 className='text-capitalize'>username</h3>
                <div className='mb-4'>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='far fa-star'></i>
                </div>
                <p className='w-50'>
                  This is some content from a media component. You can replace
                  this with any content and adjust it as needed.
                </p>
              </div>
              <figure className='col-2 text-center'>
                <img className='w-50' src={userImage} alt='...' />
              </figure>
              <div className='col-10 mb-5'>
                <h3 className='text-capitalize'>username</h3>
                <div className='mb-4'>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='far fa-star'></i>
                </div>
                <p className='w-50'>
                  This is some content from a media component. You can replace
                  this with any content and adjust it as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductDetails;
