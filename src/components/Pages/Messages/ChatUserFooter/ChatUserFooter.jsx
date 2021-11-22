import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../../../Firebase/Firebase';
import { SecondUserContext } from './../../../../context/SecondUser';
import { currentUserContext } from './../../../../context/CurrentUser';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatUserFooter() {
  const [msgContent, setMsgContent] = useState('');
  const { messagesCollection } = useContext(FirebaseContext);
  const { msgCounterFlag } = useContext(FirebaseContext);
  const { userData } = useContext(currentUserContext);
  const { secondUserData } = useContext(SecondUserContext);
  // const [msgFlag] = useCollectionData(msgCounterFlag, {
  //   idField: 'id',
  // });
  console.log(msgCounterFlag);
  const handleSendMsg = (e) => {
    e.preventDefault();
    if (msgContent) {
      messagesCollection.add({
        msg: msgContent,
        sentBy: userData.uid,
        sentAt: new Date(),
        sentTo: secondUserData.userId,
        relation: `${userData.uid}/${secondUserData.userId}`,
      });
    }
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
