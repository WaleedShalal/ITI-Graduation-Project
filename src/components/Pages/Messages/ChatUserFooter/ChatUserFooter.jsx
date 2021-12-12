import React, { useContext, useRef, useState, useEffect } from 'react';
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
  let emojiMenu = useRef(null);
  let emojiIcon = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let eventHandler = (event) => {
      if (
        !emojiMenu.current?.contains(event.target) &&
        !emojiIcon.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', eventHandler);
    return () => {
      document.removeEventListener('mousedown', eventHandler);
    };
  });

  return (
    <div className='row reply'>
      <div className='col-1 pt-2 icon-btn'>
        <i
          id='chat__emoji'
          className='emoji__show far fa-smile'
          ref={emojiIcon}
          onClick={() => setIsOpen((isOpen) => !isOpen)}></i>
      </div>
      <div className='col-11 reply-main'>
        <form className='messages__form d-flex' onSubmit={handleSendMsg}>
          {isOpen && (
            <Emoji onEmojiClick={onEmojiClick} emojiMenu={emojiMenu} />
          )}
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
