import React from 'react';
import userImage from '../../../../assets/images/user-img.png';
import './NotificationMsg.scss';

function NotificationMsg() {
  return (
    <div className='pt-3 pb-2'>
      <div className='d-flex align-items-center'>
        <div className='flex-shrink-0'>
          <figure className='image__windowBody mb-0'>
            <img src={userImage} alt='...' />
          </figure>
        </div>
        <div className='flex-grow-1 ms-2'>
          <h6 className='mb-0 text-capitalize'>waleed elbana</h6>
          <span>There is a new post in this group</span>
        </div>
      </div>
    </div>
  );
}

export default NotificationMsg;
