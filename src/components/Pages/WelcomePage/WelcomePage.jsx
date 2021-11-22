import React from 'react';
import okay from './images/okay-icon.png';
import banner from './images/banner-1.jpg';
import './WelcomePage.scss';
import { Link } from 'react-router-dom';
function WelcomePage() {
  return (
    <section className='graybox'>
      <div
        data-edit='text'
        className='free-automobile-sec'
        style={{ backgroundImage: `url(${banner})` }}>
        <h4>Come together &</h4>
        <h2 data-edit='text'>Share your review video.</h2>
        <h3 data-edit='text'>
          Welcome to our site (minuteف). The site gives you the opportunity to
          work as a blogger.{' '}
        </h3>
        <div className='free-automobile-sec-1'>
          <p>
            <span>
              <img src={okay} alt='' />
              <Link to='#'>Register</Link>
            </span>
            <span>
              <img src={okay} alt='' />
              <Link to='#'>find local friends</Link>
            </span>
            <span>
              <img src={okay} alt='' />
              <Link to='#'>Free</Link>
            </span>
          </p>
        </div>
        <div className='free-automobile-sec-1'>
          <Link className='free-automobile-btn-1' to='/register'>
            register now
          </Link>
          <Link className='free-automobile-btn-2' to='/login'>
            sign in
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
