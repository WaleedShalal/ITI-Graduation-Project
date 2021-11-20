import React, { useContext } from 'react';
import { FirebaseContext } from '../../../../Firebase/Firebase';
import ChatCurrentUserBody from '../ChatCurrentUserBody/ChatCurrentUserBody';
import ChatUserBody from '../ChatUserBody/ChatUserBody';
import MessagesUsers from '../MessagesUsers/MessagesUsers';
import ChatUserHeader from './../ChatUserHeader/ChatUserHeader';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './Messages.scss';
import ChatUserFooter from '../ChatUserFooter/ChatUserFooter';

function Messages() {
  const { messagingUsersCollection } = useContext(FirebaseContext);
  const [users] = useCollectionData(messagingUsersCollection);
  console.log(users);
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
              <div className='messages__inboxBody py-4'>
                {users?.map((data) => {
                  return <MessagesUsers data={data} key={Math.random()} />;
                })}
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
                <ChatUserFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Messages;
