import React from 'react';
import './ChatUserHeader.scss';
import { useContext } from 'react';
import { SecondUserContext } from './../../../../context/SecondUser';

function ChatUserHeader() {
  const { secondUserData } = useContext(SecondUserContext);
  return (
    <div className='d-flex align-items-center'>
      {secondUserData && (
        <>
          <div className='flex-shrink-0'>
            <figure className='messages__chatHeaderImage mb-0'>
              <img
                src={secondUserData.userPhoto}
                className='w-100 rounded-circle'
                alt='...'
              />
            </figure>
          </div>

          <div className='flex-grow-1 ms-3'>
            <h6 className='mb-0'>{secondUserData?.userName}</h6>
            <span className='online__status'>active now</span>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatUserHeader;
