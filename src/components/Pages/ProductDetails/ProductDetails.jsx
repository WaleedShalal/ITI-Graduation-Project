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
      <section className='full-details mt-2'>
        <div className='product__details__wrapper container-fluid mt-5'>
          <div className='row '>
            <div className='product__images col-6'>
              <div className='row align-items-center'>
                <div className='mini__images col-2'>
                  <figure className=''>
                    <img className='' src={productItem.image} alt='' />
                  </figure>
                  <figure className=''>
                    <img className='' src={productItem.image} alt='' />
                  </figure>
                  <figure className=''>
                    <img className='' src={productItem.image} alt='' />
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
                  <span className='fw-bold  text-capitalize'>product id</span> :{' '}
                  {productItem.id}.
                </div>
                <div className='mb-3'>
                  <span className='fw-bold text-capitalize'>product Title</span>{' '}
                  : {productItem.title}.
                </div>
                <div className='mb-3'>
                  <span className='fw-bold text-capitalize'>
                    product Desciption
                  </span>{' '}
                  : {productItem.description}.
                </div>
                <div className='mb-3'>
                  <span className='fw-bold text-capitalize'>product Price</span>{' '}
                  : {productItem.price}$.
                </div>
                <div className=''>
                  <span className='fw-bold text-capitalize'>
                    product quantity in cart
                  </span>{' '}
                  : {purchasedItem ? purchasedItem.count : 0}.
                </div>
              </div>
              <div className='options__btn row pt-3'>
                <div className='col-sm-12 col-md-6 text-center p-1'>
                  <button
                    onClick={() => dispatch(addCart(productItem))}
                    className='option__addCart btn btn-primary'>
                    Add Cart
                  </button>
                </div>
                <div className='col-sm-12 col-md-6 text-center p-1'>
                  <button
                    onClick={handleBack}
                    className='option__backProducts btn btn-outline-primary'>
                    {isFromCart ? 'Back Cart' : 'Back Products'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='product__reviews'>
        <div className='container-fluid'>
          <h2 className='text-capitalize mb-5'>top reviews</h2>
          <div className='row'>
            <div className='cutomer__review col-6 mb-3 p-3'>
              <div className='row cutomer__reviewBlock py-3'>
                <figure className='customer__img col-3 text-center mb-0'>
                  <img className='rounded-circle' src={userImage} alt='...' />
                </figure>
                <div className='ps-3 col-9'>
                  <h3 className='text-capitalize mb-0'>username</h3>
                  <div className='mb-3'>
                    <Stars />
                  </div>
                  <p className='mb-0'>
                    This is some content from a media component. You can replace
                    this with any content and adjust it as needed.
                  </p>
                </div>
              </div>
            </div>
            <div className='cutomer__review col-6 mb-3 p-3'>
              <div className='row cutomer__reviewBlock py-3'>
                <figure className='customer__img col-3 text-center mb-0'>
                  <img className='rounded-circle' src={userImage} alt='...' />
                </figure>
                <div className='ps-3 col-9'>
                  <h3 className='text-capitalize mb-0'>username</h3>
                  <div className='mb-3'>
                    <Stars />
                  </div>
                  <p className='mb-0'>
                    This is some content from a media component. You can replace
                    this with any content and adjust it as needed.
                  </p>
                </div>
              </div>
            </div>
            <div className='cutomer__review col-6 mb-3 p-3'>
              <div className='row cutomer__reviewBlock py-3'>
                <figure className='customer__img col-3 text-center mb-0'>
                  <img className='rounded-circle' src={userImage} alt='...' />
                </figure>
                <div className='ps-3 col-9'>
                  <h3 className='text-capitalize mb-0'>username</h3>
                  <div className='mb-3'>
                    <Stars />
                  </div>
                  <p className='mb-0'>
                    This is some content from a media component. You can replace
                    this with any content and adjust it as needed.
                  </p>
                </div>
              </div>
            </div>
            <div className='cutomer__review col-6 mb-3 p-3'>
              <div className='row cutomer__reviewBlock py-3'>
                <figure className='customer__img col-3 text-center mb-0'>
                  <img className='rounded-circle' src={userImage} alt='...' />
                </figure>
                <div className='ps-3 col-9'>
                  <h3 className='text-capitalize mb-0'>username</h3>
                  <div className='mb-3'>
                    <Stars />
                  </div>
                  <p className='mb-0'>
                    This is some content from a media component. You can replace
                    this with any content and adjust it as needed.
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
