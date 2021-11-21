import React, { useContext } from 'react';
import { SecondUserContext } from './../../../../context/SecondUser';

function MessagesUsers({ data }) {
  const { secondUserData, setSecondUserData } = useContext(SecondUserContext);

  return (
    <div
      className={`d-flex align-items-center messages__secondUser px-3 mb-3 ${
        data?.userName === secondUserData?.userName && 'active'
      }`}
      onClick={() => setSecondUserData(data)}>
      <div className='flex-shrink-0'>
        <figure className='messages__inboxBodyImage mb-0'>
          <img
            src={data.userPhoto}
            className='w-100 rounded-circle'
            alt='...'
          />
        </figure>
      </div>
      <div className='flex-grow-1 ms-3'>
        <h4 className='mb-0'>{data.userName}</h4>
        <span>active now</span>
      </div>
    </div>
  );
}

export default MessagesUsers;
