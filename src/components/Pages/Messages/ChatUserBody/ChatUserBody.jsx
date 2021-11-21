import React from 'react';
import userImage from '../../../../assets/images/user-img.png';

function ChatUserBody({ isCurrent, data, userPhoto }) {
  return !isCurrent ? (
    <div className='d-flex align-items-baseline'>
      <div className='flex-shrink-0'>
        <figure className='messages__chatBodyImage'>
          <img src={userPhoto} className='w-100 rounded-circle' alt='...' />
        </figure>
      </div>
      <div className='flex-grow-1 ms-3'>
        <h4 className='mb-0'>{data}</h4>
      </div>
    </div>
  ) : (
    <div className='d-flex align-items-baseline'>
      <div className='flex-grow-1 me-3'>
        <h4 className='mb-0 text-end'>{data}</h4>
      </div>
      <div className='flex-shrink-0'>
        <figure className='messages__chatBodyImage'>
          <img src={userPhoto} className='w-100 rounded-circle' alt='...' />
        </figure>
      </div>
    </div>
  );
}

export default ChatUserBody;
