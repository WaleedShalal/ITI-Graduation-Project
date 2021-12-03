import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.scss';

function WelcomePage() {
  return (
    <section className='welcome__page'>
      <div className='container'>
        <div className='row'>
          <div className='website__info col-sm-12 col-lg-8 order-sm-2 order-lg-1'>
            <div className='info__gretting fadeIn mb-5'>
              <h2 className='text-capitalize '>Come together &</h2>
              <h2 className='text-capitalize '>share your review video.</h2>
            </div>
            <div className='info__features mt-5'>
              <div className='feature d-flex fadeInLeftBig'>
                <i className='fas fa-check'></i>
                <h5 className='text-capitalize ms-3'>
                  find bloggers accounts by locations.
                </h5>
              </div>
              <div className='feature d-flex fadeInLeftBig'>
                <i className='fas fa-check'></i>
                <h5 className='text-capitalize ms-3'>
                  rate both the blogger content and the quality of the product.
                </h5>
              </div>
              <div className='feature d-flex fadeInLeftBig'>
                <i className='fas fa-check'></i>
                <h5 className='text-capitalize ms-3'>
                  classify user as (product owner, blogger, normal user).
                </h5>
              </div>
              <div className='feature d-flex fadeInLeftBig'>
                <i className='fas fa-check'></i>
                <h5 className='text-capitalize ms-3'>
                  providing e-commerce feature for each product owner.
                </h5>
              </div>
              <div className='feature d-flex fadeInLeftBig'>
                <i className='fas fa-check'></i>
                <h5 className='text-capitalize ms-3'>
                  select the content that you interested in.
                </h5>
              </div>
            </div>
            <div className='login__register mt-5 d-flex '>
              <div className='links__wrapper w-50 d-flex justify-content-start fadeInLeftBigLinks'>
                <Link
                  className='text-capitalize btn btn-outline-danger w-50'
                  to='/register'>
                  register now
                </Link>
                <Link
                  className='text-capitalize btn btn-outline-primary ms-5 w-25'
                  to='/login'>
                  sign in
                </Link>
              </div>
            </div>
          </div>
          <figure className='website__logo col-sm-12 col-lg-4 order-lg-2 order-sm-1  mb-0 dropDown'>
            <img className='w-100' src='./logo.png' alt='logo' />
          </figure>
        </div>
      </div>
    </section>

    // <section className='graybox'>
    //   <div data-edit='text' className='free-automobile-sec'>
    //     <h4>Come together &</h4>
    //     <h2 data-edit='text'>Share your review video.</h2>
    //     <h3 data-edit='text'>
    //       Welcome to our site (minuteف). The site gives you the opportunity to
    //       work as a blogger.{' '}
    //     </h3>
    //     <div className='free-automobile-sec-1'>
    //       <p>
    //         <span>
    //           <img src={okay} alt='' />
    //           <Link to='#'>Register</Link>
    //         </span>
    //         <span>
    //           <img src={okay} alt='' />
    //           <Link to='#'>find local friends</Link>
    //         </span>
    //         <span>
    //           <img src={okay} alt='' />
    //           <Link to='#'>Free</Link>
    //         </span>
    //       </p>
    //     </div>
    //     <div className='free-automobile-sec-1'>
    //       <Link className='free-automobile-btn-1' to='/register'>
    //         register now
    //       </Link>
    //       <Link className='free-automobile-btn-2' to='/login'>
    //         sign in
    //       </Link>
    //     </div>
    //   </div>
    // </section>
  );
}

export default WelcomePage;
