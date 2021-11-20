import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../../../Firebase/Firebase';
import { SecondUserContext } from './../../../../context/SecondUser';

function ChatUserFooter() {
  const [msgContent, setMsgContent] = useState('');
  const { messagesCollection } = useContext(FirebaseContext);
  const { secondUserData } = useContext(SecondUserContext);
  const handleSendMsg = (e) => {
    e.preventDefault();
    messagesCollection.add({
      msg: msgContent,
      sentAt: new Date(),
      sentBy: 'Waleed',
      sentTo: 'Other',
    });
    setMsgContent('');
  };
  return (
    <>
      <form
        className='messages__SendForm d-flex w-100 py-2'
        onSubmit={handleSendMsg}>
        <input
          className='w-100 px-3 rounded-pill me-2 text-white'
          type='text'
          placeholder='Enter a message...'
          value={msgContent}
          onChange={(e) => setMsgContent(e.target.value)}
        />
        <button className='btn btn-primary  rounded-pill' type='submit'>
          Send
        </button>
      </form>
    </>
  );
}

export default ChatUserFooter;
