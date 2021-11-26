import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../../../Firebase/Firebase";
// import ChatCurrentUserBody from '../ChatCurrentUserBody/ChatCurrentUserBody';
import { currentUserContext } from "./../../../../context/CurrentUser";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatUserBody from "../ChatUserBody/ChatUserBody";
import MessagesUsers from "../MessagesUsers/MessagesUsers";
import ChatUserHeader from "./../ChatUserHeader/ChatUserHeader";
import ChatUserFooter from "../ChatUserFooter/ChatUserFooter";
import "./Messages.scss";
import { SecondUserContext } from "./../../../../context/SecondUser";
import { useEffect } from "react";

function Messages() {
  const [image, setimage] = useState  (
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const { messagingUsersCollection } = useContext(FirebaseContext);
  const [users] = useCollectionData(messagingUsersCollection);
  const { messagesCollection } = useContext(FirebaseContext);
  const { userData } = useContext(currentUserContext);
  const { secondUserData } = useContext(SecondUserContext);
  const query =
    secondUserData?.userId &&
    messagesCollection.where("relation", "in", [
      `${userData.uid}/${secondUserData.userId}`,
      `${secondUserData.userId}/${userData.uid}`,
    ]);
  console.log(query, "1");
  // .limit(100);
  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages);
  const [messagesSorted, setMessagesSorted] = useState([
    { msg: "", relation: "", sentAt: "", sentBy: "", sentTo: "" },
  ]);
  useEffect(() => {
    if (messages) {
      setMessagesSorted(
        messages.sort((a, b) => {
          return a.sentAt - b.sentAt;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  return (
    <section className="messages my-3">
      <div className="container">
        <div className="messages__wrapper">
          <div className="row">
            <div className="messages__inbox col-4 pe-0">
              <div className="messages__inboxHeader d-flex justify-content-around align-items-center px-3">
                <h4>chats</h4>
              </div>
              <div className="messages__inboxBody py-4 mt-1">
                {users
                  ?.filter((data) => data.userId !== userData.uid)
                  ?.map((data, index) => (
                    <MessagesUsers data={data} key={index} />
                  ))}
              </div>
            </div>
            {!secondUserData ? (
              <div className="fs-1 col-8 ps-0 d-flex inbox justify-content-center align-items-center">
                <i class="fas fa-inbox fa-2x"></i>
              </div>
            ) : (
              <div className="messages__chat col-8 ps-0">
                <div className="messages__chatHeader d-flex justify-content-between align-items-center px-3">
                  <ChatUserHeader />
                  <i className="fas fa-exclamation-circle"></i>
                </div>
                <div className="messages__chatBody px-3 py-4 mt-3">
                  {messagesSorted.map((data) => (
                    <ChatUserBody
                      key={data.sentAt}
                      isCurrent={data.sentBy === userData.uid}
                      data={data.msg}
                      time={data.sentAt}
                      userPhoto={
                        data.sentBy === userData.uid
                          ? userData.photoURL
                          : secondUserData.userPhoto
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
