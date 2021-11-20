import React from 'react';
import ChatCurrentUserBody from '../ChatCurrentUserBody/ChatCurrentUserBody';
import ChatUserBody from '../ChatUserBody/ChatUserBody';
import MessagesUsers from '../MessagesUsers/MessagesUsers';
import ChatUserHeader from './../ChatUserHeader/ChatUserHeader';
import './Messages.scss';

function Messages() {
  return (
    <section className='messages my-3'>
      <div className='container'>
        <div className='messages__wrapper'>
          <div className='row'>
            <div className='messages__inbox col-4 pe-0'>
              <div className='messages__inboxHeader d-flex justify-content-around align-items-center px-3'>
                <h3>username</h3>
                <i className='fas fa-edit'></i>
              </div>
              <div className='messages__inboxBody px-3 py-4'>
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
                <MessagesUsers />
              </div>
            </div>
            <div className='messages__chat col-8 ps-0'>
              <div className='messages__chatHeader d-flex justify-content-between align-items-center px-3'>
                <ChatUserHeader />
                <i className='fas fa-exclamation-circle'></i>
              </div>
              <div className='messages__chatBody px-3 py-4'>
                <ChatUserBody />
                <ChatCurrentUserBody />
                <ChatUserBody />
                <ChatCurrentUserBody />
                <ChatUserBody />
                <ChatCurrentUserBody />
                <ChatUserBody />
                <ChatCurrentUserBody />
                <ChatUserBody />
                <ChatCurrentUserBody />
                <ChatUserBody />
                <ChatCurrentUserBody />
                <ChatUserBody />
                <ChatCurrentUserBody />
                <ChatUserBody />
                <ChatCurrentUserBody />
                <ChatUserBody />
                <ChatCurrentUserBody />
                <ChatUserBody />
                <ChatCurrentUserBody />
                <ChatUserBody />
                <ChatCurrentUserBody />
              </div>
              <div className='messages__chatFooter d-flex justify-content-between align-items-center px-4 py-2'>
                <form className='messages__SendForm d-flex w-100 py-2'>
                  <input
                    className='w-100 px-3 rounded-pill me-2'
                    type='text'
                    placeholder='Enter a message...'
                  />
                  <button
                    className='btn btn-primary  rounded-pill'
                    type='submit'>
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Messages;
