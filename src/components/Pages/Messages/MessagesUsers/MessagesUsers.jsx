import React from 'react';
import userImage from '../../../../assets/images/user-img.png';

function MessagesUsers() {
  return (
    <div class='d-flex'>
      <div className='flex-shrink-0'>
        <figure className='messages__inboxBodyImage'>
          <img src={userImage} className='w-100 rounded-circle' alt='...' />
        </figure>
      </div>
      <div className='flex-grow-1 ms-3'>
        <h4 className='mb-0'>username</h4>
        <span>active now</span>
      </div>
    </div>
  );
}

export default MessagesUsers;
