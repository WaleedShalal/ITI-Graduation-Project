import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../../../Firebase/Firebase';
import { SecondUserContext } from './../../../../context/SecondUser';
import { currentUserContext } from './../../../../context/CurrentUser';
import firebase from 'firebase/compat/app';
import Emoji from '../../../Parts/Emoji/Emoji';
import './ChatUserFooter.scss';
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
    let chat__emoji = document.getElementById('chat__emoji');
    chat__emoji.classList.toggle('active');
    chat__emoji.classList.contains('active')
      ? emojiElement.classList.add('active')
      : emojiElement.classList.remove('active');
  }
  const [inEmoji, setInEmoji] = useState(false);
  const handleParent = (param) => {
    setInEmoji(param);
  };

  window.onclick = (e) => {
    let emojiElement = document.getElementById('emoji');
    let chat__emoji = document.getElementById('chat__emoji');
    let clickedElement = e.target;
    handleParent(false);
    // console.log(
    //   chat__emoji.classList.contains('active'),
    //   !clickedElement.classList.contains('emoji__show'),
    //   !inEmoji,
    // );
    if (emojiElement && chat__emoji && clickedElement) {
      if (
        chat__emoji.classList.contains('active') &&
        !clickedElement.classList.contains('emoji__show') &&
        !inEmoji
      ) {
        emojiElement.classList.remove('active');
        chat__emoji.classList.remove('active');
      }
    }
  };

  return (
    <div className='row reply'>
      <div className='col-1  pt-2 icon-btn'>
        <i
          id='chat__emoji'
          className='emoji__show far fa-smile'
          onClick={handleToggleEmoji}></i>
      </div>
      <div className='col-11 reply-main'>
        <form className='messages__form d-flex' onSubmit={handleSendMsg}>
          <Emoji onEmojiClick={onEmojiClick} handleParent={handleParent} />
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
