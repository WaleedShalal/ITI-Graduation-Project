import React from 'react';
import userImage from '../../../../assets/images/user-img.png';

function ChatCurrentUserBody() {
  return (
    <div class='d-flex align-items-baseline'>
      <div className='flex-grow-1 me-3'>
        <h4 className='mb-0 text-end'>current__UserMessage</h4>
      </div>
      <div className='flex-shrink-0'>
        <figure className='messages__chatBodyImage'>
          <img src={userImage} className='w-100 rounded-circle' alt='...' />
        </figure>
      </div>
    </div>
  );
}

export default ChatCurrentUserBody;
