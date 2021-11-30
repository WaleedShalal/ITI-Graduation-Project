import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../../../../Firebase/Firebase';
import { currentUserContext } from './../../../../context/CurrentUser';
import { SecondUserContext } from './../../../../context/SecondUser';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatUserBody from '../ChatUserBody/ChatUserBody';
import MessagesUsers from '../MessagesUsers/MessagesUsers';
import ChatUserHeader from './../ChatUserHeader/ChatUserHeader';
import ChatUserFooter from '../ChatUserFooter/ChatUserFooter';
import './Messages.scss';

function Messages() {
  const { messagingUsersCollection } = useContext(FirebaseContext);
  const [users] = useCollectionData(messagingUsersCollection);
  const { messagesCollection } = useContext(FirebaseContext);
  const { data } = useContext(currentUserContext);
  const { secondUserData } = useContext(SecondUserContext);
  const query =
    secondUserData?.id &&
    messagesCollection
      .where('relation', 'in', [
        `${data.id}/${secondUserData.id}`,
        `${secondUserData.id}/${data.id}`,
      ])
      .limit(30);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [messagesSorted, setMessagesSorted] = useState([
    { msg: '', relation: '', sentAt: '', sentBy: '', sentTo: '' },
  ]);
  useEffect(() => {
    if (messages) {
      let sortedMsg = sortingMessages();
      sortedMsg[0]?.sentAt !== null && setMessagesSorted(sortedMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const sortingMessages = () => {
    let sortedMsg = messages?.sort((a, b) => a.sentAt - b.sentAt);
    return sortedMsg;
  };

  return (
    <section className='messages my-3'>
      <div className='container'>
        <div className='messages__wrapper'>
          <div className='row'>
            <div className='messages__inbox col-4 pe-0'>
              <div className='messages__inboxHeader d-flex justify-content-around align-items-center px-3'>
                <h4>chats</h4>
              </div>
              <div className='messages__inboxBody py-4 mt-1'>
                {users
                  ?.filter((user) => user.id !== data.id)
                  ?.map((data) => (
                    <MessagesUsers data={data} key={data.id} />
                  ))}
              </div>
            </div>
            {!secondUserData ? (
              <div className='fs-1 col-8 ps-0 d-flex inbox justify-content-center align-items-center'>
                <i className='fas fa-inbox fa-2x'></i>
              </div>
            ) : (
              <div className='messages__chat col-8 ps-0'>
                <div className='messages__chatHeader d-flex justify-content-between align-items-center px-3'>
                  <ChatUserHeader />
                  <i className='fas fa-exclamation-circle'></i>
                </div>
                <div className='messages__chatBody px-3 py-4 mt-3'>
                  {messagesSorted?.map((message) => (
                    <ChatUserBody
                      key={message.sentAt}
                      isCurrent={message.sentBy === data.id}
                      data={message.msg}
                      time={message.sentAt}
                      userPhoto={
                        message.sentBy === data.id
                          ? data.imageUrl
                          : secondUserData.imageUrl
                      }
                    />
                  ))}
                </div>
                <ChatUserFooter />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Messages;
