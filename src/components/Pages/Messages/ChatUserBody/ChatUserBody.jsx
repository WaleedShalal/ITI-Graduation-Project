import React from 'react';
import { useEffect, useRef } from 'react';

function ChatUserBody({ isCurrent, data, userPhoto }) {
  // console.log(time);
  const showLastMsg = useRef(null);
  const scrollToBottom = () => {
    showLastMsg.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return !isCurrent ? (
    <div className='d-flex align-items-baseline' ref={showLastMsg}>
      <div className='flex-shrink-0'>
        <figure className='messages__chatBodyImage'>
          <img src={userPhoto} className='w-100 rounded-circle' alt='...' />
        </figure>
      </div>
      <div className='flex-grow-1 ms-3'>
        <h4 className='message__content message__contentSecondUser mb-0'>
          {data}
        </h4>
      </div>
    </div>
  ) : (
    <div className='d-flex align-items-baseline' ref={showLastMsg}>
      <div className='flex-grow-1 me-3'>
        <h4 className='message__content ms-auto mb-0 text-end'>{data}</h4>
        {/* <h4 className='message__content ms-auto mb-0 text-end'>
          {time.toString()}
        </h4> */}
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
