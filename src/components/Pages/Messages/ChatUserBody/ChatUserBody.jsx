import React from 'react';
import userImage from '../../../../assets/images/user-img.png';

function ChatUserBody() {
  return (
    <div class='d-flex align-items-baseline'>
      <div className='flex-shrink-0'>
        <figure className='messages__chatBodyImage'>
          <img src={userImage} className='w-100 rounded-circle' alt='...' />
        </figure>
      </div>
      <div className='flex-grow-1 ms-3'>
        <h4 className='mb-0'>user__Message</h4>
      </div>
    </div>
  );
}

export default ChatUserBody;
