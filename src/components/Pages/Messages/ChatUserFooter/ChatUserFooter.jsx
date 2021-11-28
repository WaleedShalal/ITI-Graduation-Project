import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../../../Firebase/Firebase";
import { SecondUserContext } from "./../../../../context/SecondUser";
import { currentUserContext } from "./../../../../context/CurrentUser";
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';

function ChatUserFooter() {
  const [msgContent, setMsgContent] = useState('');
  const { messagesCollection } = useContext(FirebaseContext);
  const { msgCounterFlag } = useContext(FirebaseContext);
  const { userData } = useContext(currentUserContext);
  const { secondUserData } = useContext(SecondUserContext);
  // const [msgFlag] = useCollectionData(msgCounterFlag, {
  //   idField: 'id',
  // });
  const handleSendMsg = (e) => {
    e.preventDefault();
    let msgTime = firebase.firestore.FieldValue.serverTimestamp();
    if (msgContent) {
      messagesCollection.add({
        msg: msgContent,
        sentBy: userData.uid,
        // sentAt: new Date(),
        sentAt: msgTime,
        sentTo: secondUserData.userId,
        relation: `${userData.uid}/${secondUserData.userId}`,
      });
    }
    setMsgContent("");
  };
  return (
  

      <div class="row reply">
        <div class="col-sm-1 col-xs-1 pt-2 icon-btn">
          <i class="far fa-smile"></i>
        </div>
        <div class="col-sm-11 col-xs-11 reply-main">
          <form className="d-flex" onSubmit={handleSendMsg}>
            <input
              rows="1"
              id="comment"
              className="form-control"
              type="text"
              placeholder="Enter a message..."
              value={msgContent}
              onChange={(e) => setMsgContent(e.target.value)}
            />
            <button class="col-sm-1 col-xs-1 icon-btn reply-send" type="submit">
              <i class="fas fa-paper-plane" aria-hidden="true" style={{color:msgContent?"#088dcd" : "#93918f"}}></i>
            </button>
          </form>
        </div>
      </div>
   
  );
}

export default ChatUserFooter;
