import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../../../Firebase/Firebase';
import { SecondUserContext } from './../../../../context/SecondUser';
import { currentUserContext } from './../../../../context/CurrentUser';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import './ChatUserFooter.scss';
function ChatUserFooter() {
  const [msgContent, setMsgContent] = useState('');
  const { messagesCollection } = useContext(FirebaseContext);
  const { data } = useContext(currentUserContext);
  const { secondUserData } = useContext(SecondUserContext);
  console.log(data);
  const handleSendMsg = (e) => {
    e.preventDefault();
    let msgTime = firebase.firestore.FieldValue.serverTimestamp();
    if (msgContent) {
      messagesCollection.add({
        msg: msgContent,
        sentBy: data.id,
        sentAt: msgTime,
        sentTo: secondUserData.id,
        relation: `${data.id}/${secondUserData.id}`,
      });
    }
    setMsgContent('');
  };
  return (
    <div className='row reply'>
      <div className='col-sm-1 col-xs-1 pt-2 icon-btn'>
        <i className='far fa-smile'></i>
      </div>
      <div className='col-sm-11 col-xs-11 reply-main'>
        <form className='d-flex' onSubmit={handleSendMsg}>
          <input
            rows='1'
            id='comment'
            className='form-control'
            type='text'
            placeholder='Enter a message...'
            value={msgContent}
            onChange={(e) => setMsgContent(e.target.value)}
          />
          <button
            className='col-sm-1 col-xs-1 icon-btn reply-send'
            type='submit'>
            <i
              className='fas fa-paper-plane'
              aria-hidden='true'
              style={{ color: msgContent ? '#088dcd' : '#93918f' }}></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatUserFooter;
