import React, { useEffect, useState } from "react";
import { db } from "../.../../../../Firebase/Firebase";
import "./PeopleYouKnow.scss";
function PeopleYouKnow() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  });

  return (
    <div className="widget stick-widget">
      <h4 className="widget-title">Who's follownig</h4>
      <ul className="followers">
        {users.slice(0, 5).map((user) => {
          return (
            <li key={user.id}>
              <figure>
                <img alt="" src="https://via.placeholder.com/100" />
              </figure>
              <div className="friend-meta">
                <h4>
                  <a className="d-block" href="time-line.html">
                    {user.userName
                      ? user.userName
                      : user.email.substring(0, user.email.lastIndexOf("@"))}
                  </a>
                  <span>{user.followedHashtags}</span>
                </h4>
                <span className="underline">follow</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PeopleYouKnow;
