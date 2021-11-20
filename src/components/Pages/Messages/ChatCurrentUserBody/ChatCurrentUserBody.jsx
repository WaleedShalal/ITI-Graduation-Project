import React, { useContext } from 'react';
import userImage from '../../../../assets/images/user-img.png';
import { FirebaseContext } from '../../../../Firebase/Firebase';
import { SecondUserContext } from './../../../../context/SecondUser';

function ChatCurrentUserBody() {
  const { messagesCollection } = useContext(FirebaseContext);
  const { secondUserData } = useContext(SecondUserContext);
  return (
    <div className='d-flex align-items-baseline'>
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
