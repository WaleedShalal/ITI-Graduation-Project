import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import './ChatUserBody.scss';

function ChatUserBody({ isCurrent, data, userPhoto, time, secondUserId }) {
  const [image] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  );
  const showLastMsg = useRef();
  const scrollToBottom = () => {
    showLastMsg.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
    // showLastMsg.current?.scrollIntoView({ behavior: 'smooth' });
  };
  console.log(secondUserId);
  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return !isCurrent ? (
    <div
      className='d-flex align-items-baseline flex-column pt-3'
      ref={showLastMsg}>
      <h6 className='message__sentAt w-100 text-center'>
        {time && moment(time.toDate()).calendar()}
      </h6>
      <div className='d-flex'>
        <div className='flex-shrink-0'>
          <figure className='messages__chatBodyImage'>
            <img
              src={userPhoto ? userPhoto : image}
              className='w-100 rounded-circle'
              alt='...'
            />
          </figure>
        </div>
        <div className='flex-grow-1 ms-3'>
          <h4 className='message__content message__contentSecondUser mb-0 text-dark'>
            {data}
          </h4>
        </div>
      </div>
    </div>
  ) : (
    <div className='d-flex align-items-baseline flex-column' ref={showLastMsg}>
      <h6 className='message__sentAt w-100 text-center'>
        {time && moment(time?.toDate()).calendar()}
      </h6>
      <div className='ms-auto d-flex'>
        <div className='flex-grow-1 me-3'>
          <h4 className='message__content ms-auto mb-0 text-end text-dark'>
            {data}
          </h4>
        </div>
        <div className='flex-shrink-0'>
          <figure className='messages__chatBodyImage'>
            <img
              src={userPhoto ? userPhoto : image}
              className='w-100 rounded-circle'
              alt='...'
            />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default ChatUserBody;
