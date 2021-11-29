import React, { useState } from 'react';
import { useContext } from 'react';
import { SecondUserContext } from './../../../../context/SecondUser';
import './ChatUserHeader.scss';

function ChatUserHeader() {
  const [image] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  );
  const { secondUserData } = useContext(SecondUserContext);
  return (
    <div className='d-flex align-items-center'>
      {secondUserData && (
        <>
          <div className='header__imageWrapper flex-shrink-0'>
            <figure className='messages__chatHeaderImage mb-0'>
              <img
                src={secondUserData.imageUrl ? secondUserData.imageUrl : image}
                className='w-100 rounded-circle'
                alt='...'
              />
            </figure>
            <span className='active__statusHeader'></span>
          </div>
          <div className='flex-grow-1 ms-3'>
            <h6 className='mb-0'>{secondUserData?.firstName}</h6>
            <span className='online__status'>Active now</span>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatUserHeader;
