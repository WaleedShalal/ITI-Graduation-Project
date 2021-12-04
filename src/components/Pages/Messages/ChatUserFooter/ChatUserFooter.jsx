import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../../../Firebase/Firebase';
import { SecondUserContext } from './../../../../context/SecondUser';
import { currentUserContext } from './../../../../context/CurrentUser';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import './ChatUserFooter.scss';
import Emoji from '../../../Parts/Emoji/Emoji';
function ChatUserFooter() {
  const [msgContent, setMsgContent] = useState('');
  const { messagesCollection } = useContext(FirebaseContext);
  const { data } = useContext(currentUserContext);
  const { secondUserData } = useContext(SecondUserContext);
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

  const onEmojiClick = (event, emojiObject) => {
    emojiObject && setMsgContent(`${msgContent}${emojiObject?.emoji}`);
  };

  function handleToggleEmoji() {
    let emojiElement = document.getElementById('emoji');
    emojiElement.classList.toggle('active');
    isInEmoji = !isInEmoji;
  }

  let isInEmoji = false;

  const handleGrandparent = (e) => {
    // isInEmoji = true;
    console.log(e.target);
  };
  // window.onclick = (e) => {
  //   let emojiElement = document.getElementById('emoji');
  //   if (!isInEmoji && emojiElement.classList.contains('active')) {
  //     console.log('LLL');
  //     // emojiElement.classList.remove('active');
  //     isInEmoji = false;
  //   }
  // };

  return (
    <div className='row reply'>
      <div className='col-1  pt-2 icon-btn'>
        <i className='chat__emoji far fa-smile' onClick={handleToggleEmoji}></i>
      </div>
      <div className='col-11 reply-main'>
        <form className='messages__form d-flex' onSubmit={handleSendMsg}>
          <Emoji
            onEmojiClick={onEmojiClick}
            handleGrandparent={handleGrandparent}
          />
          <input
            rows='1'
            id='comment'
            className='form-control'
            type='text'
            placeholder='Enter a message...'
            value={msgContent}
            autoComplete='off'
            onChange={(e) => setMsgContent(e.target.value)}
          />
          <button className='col icon-btn reply-send' type='submit'>
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
