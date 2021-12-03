import React from 'react';
import './DefaultFooter.scss';
function DeafultFooter() {
  return (
    <footer className='default__footer py-1'>
      <div className='container'>
        <div className='wrapper d-flex flex-column align-items-center'>
          <ul className='list-unstyled d-flex flex-wrap justify-content-around align-items-center  mb-0'>
            <li className='text-capitalize p-2'>about</li>
            <li className='text-capitalize p-2'>terms</li>
            <li className='text-capitalize p-2'>privacy</li>
            <li className='text-capitalize p-2'>help center</li>
            <li className='text-capitalize p-2'>more</li>
          </ul>
          <div className='copyright text-capitalize'>copyright &copy; 2021</div>
        </div>
      </div>
    </footer>
  );
}

export default DeafultFooter;
