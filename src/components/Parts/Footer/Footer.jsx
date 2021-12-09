import React from 'react';
import './Footer.scss';
function Footer() {
  return (
    <footer className='footer  m-auto'>
      <ul className='foote_bottom_ul_amrc '>
        <li>
          <a href='http://webenlance.com'>Home</a>
        </li>
        <li>
          <a href='http://webenlance.com'>About</a>
        </li>
        <li>
          <a href='http://webenlance.com'>Services</a>
        </li>
        <li>
          <a href='http://webenlance.com'>Pricing</a>
        </li>
        <li>
          <a href='http://webenlance.com'>Blog</a>
        </li>
        <li>
          <a href='http://webenlance.com'>Contact</a>
        </li>
      </ul>

      <p className='footer__copyright text-center ms-3'>
        Copyright &copy; 2021
      </p>
    </footer>
  );
}

export default Footer;
