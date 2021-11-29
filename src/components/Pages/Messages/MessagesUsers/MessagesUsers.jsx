import React, { useContext, useState } from 'react';
import { SecondUserContext } from './../../../../context/SecondUser';
import './MessagesUsers.scss';

function MessagesUsers({ data }) {
  const [image, setimage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  );
  const { secondUserData, setSecondUserData } = useContext(SecondUserContext);
  return (
    data && (
      <div
        className={`d-flex align-items-center messages__secondUser px-3 mb-3 ${
          data?.firstName === secondUserData?.firstName && 'active'
        }`}
        onClick={() => setSecondUserData(data)}>
        <div className='flex-shrink-0'>
          <figure className='messages__inboxBodyImage mb-0'>
            <img
              src={data.imageUrl ? data.imageUrl : image}
              className='user__photo'
              alt='...'
            />
          </figure>
        </div>
        <div className='flex-grow-1 ms-3'>
          <h5 className='user__name mb-0'>{data.firstName}</h5>
          <span className='user__status'>Active now</span>
        </div>
      </div>
    )
  );
}

export default MessagesUsers;
