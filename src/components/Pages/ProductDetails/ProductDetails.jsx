import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addCart } from '../../../store/cartActions';
import userImage from '../../../assets/images/user-img.png';
import './ProductDetails.scss';
import Stars from '../../Parts/Stars/Stars';

const ProductDetails = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchedData } = useSelector((state) => state);
  const isFromCart = pathname.includes('cart');
  const productItem = fetchedData.filter.filter(
    (p) => p.id === parseInt(id),
  )[0];
  const purchasedItem = fetchedData.purchased.filter(
    (p) => p.id === parseInt(id),
  )[0];

  const handleBack = () => {
    isFromCart ? navigate('/cart') : navigate('/products');
  };
  return (
    <React.Fragment>
      <section className='full-details container mt-2 py-5'>
        <div className='product__details__wrapper mt-5'>
          <div className='row '>
            <div className='product__images col-6'>
              <div className='row align-items-center'>
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
            <div className='product-info offset-1 col-5 d-flex flex-column justify-content-between py-4'>
              <div className='info'>
                <div className='mb-3'>
                  <span className='fs-5 fw-bold  text-capitalize'>
                    product id
                  </span>{' '}
                  : {productItem.id}.
                </div>
                <div className='mb-3'>
                  <span className='fs-5 fw-bold text-capitalize'>
                    product Title
                  </span>{' '}
                  : {productItem.title}.
                </div>
                <div className='mb-3'>
                  <span className='fs-5 fw-bold text-capitalize'>
                    product Desciption
                  </span>{' '}
                  : {productItem.description}.
                </div>
                <div className='mb-3'>
                  <span className='fs-5 fw-bold text-capitalize'>
                    product Price
                  </span>{' '}
                  : {productItem.price}$.
                </div>
                <div className=''>
                  <span className='fs-5 fw-bold text-capitalize'>
                    product quantity in cart
                  </span>{' '}
                  : {purchasedItem ? purchasedItem.count : 0}.
                </div>
              </div>
              <div className='options__btn row'>
                <div className='col-6 text-center'>
                  <button
                    onClick={() => dispatch(addCart(productItem))}
                    className='option__addCart btn btn-primary'>
                    Add Cart
                  </button>
                </div>
                <div className='col-6 text-center'>
                  <button
                    onClick={handleBack}
                    className='btn btn-outline-primary'>
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
          <div className='customers__rates mt-4 py-3'>
            <div className='cutomer__review mb-3 py-3'>
              <div className='row'>
                <figure className='customer__img col-2 text-center'>
                  <img
                    className='w-50 rounded-circle'
                    src={userImage}
                    alt='...'
                  />
                </figure>
                <div className='col-10'>
                  <h3 className='text-capitalize'>username</h3>
                  <div className='mb-4'>
                    <Stars />
                  </div>
                  <p className='w-75'>
                    This is some content from a media component. You can replace
                    this with any content and adjust it as needed. This is some
                    content from a media component. You can replace this with
                    any content and adjust it as needed.
                  </p>
                </div>
              </div>
            </div>
            <div className='cutomer__review mb-3 py-3'>
              <div className='row'>
                <figure className='customer__img col-2 text-center'>
                  <img
                    className='w-50 rounded-circle'
                    src={userImage}
                    alt='...'
                  />
                </figure>
                <div className='col-10'>
                  <h3 className='text-capitalize'>username</h3>
                  <div className='mb-4'>
                    <Stars />
                  </div>
                  <p className='w-75'>
                    This is some content from a media component. You can replace
                    this with any content and adjust it as needed. This is some
                    content from a media component. You can replace this with
                    any content and adjust it as needed.
                  </p>
                </div>
              </div>
            </div>
            <div className='cutomer__review mb-3 py-3'>
              <div className='row'>
                <figure className='customer__img col-2 text-center'>
                  <img
                    className='w-50 rounded-circle'
                    src={userImage}
                    alt='...'
                  />
                </figure>
                <div className='col-10'>
                  <h3 className='text-capitalize'>username</h3>
                  <div className='mb-4'>
                    <Stars />
                  </div>
                  <p className='w-75'>
                    This is some content from a media component. You can replace
                    this with any content and adjust it as needed. This is some
                    content from a media component. You can replace this with
                    any content and adjust it as needed.
                  </p>
                </div>
              </div>
            </div>
            <div className='cutomer__review mb-3 py-3'>
              <div className='row'>
                <figure className='customer__img col-2 text-center'>
                  <img
                    className='w-50 rounded-circle'
                    src={userImage}
                    alt='...'
                  />
                </figure>
                <div className='col-10'>
                  <h3 className='text-capitalize'>username</h3>
                  <div className='mb-4'>
                    <Stars />
                  </div>
                  <p className='w-75'>
                    This is some content from a media component. You can replace
                    this with any content and adjust it as needed. This is some
                    content from a media component. You can replace this with
                    any content and adjust it as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductDetails;
