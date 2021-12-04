import React, { useContext} from "react";
import { db } from "../.../../../../Firebase/Firebase";
import avatar from "../../../assets/images/avatar.jpg";
import { AuthContext } from "../../../context/Auth";
import "./PeopleYouKnow.scss";
function PeopleYouKnow() {
  const { users } = useContext(AuthContext);
  const handleFollow = (id, F) => {
    db.collection("users").doc(id).update({
      follow: !F,
    });
  };
  return (
    <div className="widget stick-widget">
      <h4 className="widget-title">Who's follownig</h4>
      <ul className="followers">
        {users.slice(0, 5).map((user) => {
          return (
            <li key={user.id}>
              <figure>
                <img alt="" src={avatar} />
              </figure>
              <div className="friend-meta">
                <h4>
                  <a className="d-block" href="time-line.html">
                    {user.userName
                      ? user.userName
                      : user.email.substring(0, user.email.lastIndexOf("@"))}
                  </a>
                  <span>Followed by tarekelswahly + 3 more</span>
                </h4>
                <span
                  className="underline"
                  onClick={() => handleFollow(user.id, user.follow)}
                >
                  {!user.follow ? "follow" : "unfollow"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PeopleYouKnow;
