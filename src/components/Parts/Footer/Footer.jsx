import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
function Footer() {
  return (
    <footer className='footer  m-auto'>
      <ul className='foote_bottom_ul_amrc '>
        <li>
          <Link to='http://webenlance.com'>Home</Link>
        </li>
        <li>
          <Link to='http://webenlance.com'>About</Link>
        </li>
        <li>
          <Link to='http://webenlance.com'>Services</Link>
        </li>
        <li>
          <Link to='http://webenlance.com'>Pricing</Link>
        </li>
        <li>
          <Link to='http://webenlance.com'>Blog</Link>
        </li>
        <li>
          <Link to='http://webenlance.com'>Contact</Link>
        </li>
      </ul>
      <p className='footer__copyright text-center ms-3'>
        Copyright &copy; 2021
      </p>
    </footer>
  );
}

export default Footer;
