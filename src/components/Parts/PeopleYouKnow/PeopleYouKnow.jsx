import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../.../../../../Firebase/Firebase";
import avatar from "../../../assets/images/avatar.jpg";
import { AuthContext } from "../../../context/Auth";
import "./PeopleYouKnow.scss";
function PeopleYouKnow({ userId, username, email }) {
  const [image, setImage] = useState("");
  const { user } = useContext(AuthContext);
  // get user data
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          db.collection("users")
            .doc(userId)
            .get()
            .then((snapshot) => {
              if (snapshot.exists) {
                setImage(snapshot.data().imageUrl);
              }
            });
        }
      });
    }
    return () => {
      isMounted = false;
    };
  },[userId]);

  return (
      userId !== user.uid &&
    <li key={userId}>
      <figure>
        <img alt="" src={image ? image : avatar} />
      </figure>
      <div className="friend-meta">
        <h4>
          <a className="d-block" href={`/profile/${userId}`}>
            {username ? username : email.substring(0, email.lastIndexOf("@"))}
          </a>
          <span>Followed by tarekelswahly </span>
        </h4>
        <span className="underline">follow</span>
      </div>
    </li>
  );
}

export default PeopleYouKnow;
