import React, { useState ,useEffect, useRef } from 'react';


function ChatUserBody({ isCurrent, data, userPhoto }) {
  const [image, setimage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const showLastMsg = useRef(null);
  const scrollToBottom = () => {
    showLastMsg.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return !isCurrent ? (
    <div className='d-flex align-items-baseline pt-3' ref={showLastMsg}>
      <div className='flex-shrink-0'>
        <figure className='messages__chatBodyImage'>
          <img src={userPhoto ?userPhoto : image } className='w-100 rounded-circle' alt='...' />
        </figure>
      </div>
      <div className='flex-grow-1 ms-3'>
        <h4 className='message__content message__contentSecondUser mb-0 text-dark'>
          {data}
        </h4>
      </div>
    </div>
  ) : (
    <div className='d-flex align-items-baseline' ref={showLastMsg}>
      <div className='flex-grow-1 me-3'>
        <h4 className='message__content ms-auto mb-0 text-end text-dark'>
          {data}
        </h4>
        {/* <h4 className='message__content ms-auto mb-0 text-end'>
          {time.toString()}
        </h4> */}
      </div>
      <div className='flex-shrink-0'>
        <figure className='messages__chatBodyImage'>
          <img src={userPhoto ?userPhoto : image } className='w-100 rounded-circle' alt='...' />
        </figure>
      </div>
    </div>
  );
}

export default ChatUserBody;
