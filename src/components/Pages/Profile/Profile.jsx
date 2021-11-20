import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../../Parts/Post/Post";
import Stars from "../../Parts/Stars/Stars";
import Stories from "../../Parts/Stories/Stories";
import { db } from "../../../Firebase/Firebase";
import { AuthContext } from "../../../context/Auth";

import "./Profile.scss";
function Profile() {
  const initialValues = {
    id: "",
    user: {
      address: [],
      birthDate: "",
      confirmPassword: "",
      email: "",
      firstName: "",
      followedHashtags: " ",
      gender: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      subscribeUs: false,
      website: "",
    },
  };
  const [getUser, setUsers] = useState(initialValues);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.id == user.uid) {
          let data = [{ id: doc.id, user: doc.data() }];
          let getUser = data.filter(function (x) {
            return x !== undefined;
          });
          setUsers(...getUser);
        }
      });
    });
  }, []);
  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="content-page col-8">
            <Stories />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
          <div className="user-info col-4">
            <span>{`${getUser.user.firstName} ${getUser.user.lastName}`}</span>
            <img src="http://placehold.it/70" alt="profile-image" />
            <div className="rate d-flex">
              <Stars />
              <span className="rate-number">4.0</span>
            </div>
            <div className="Ecommerce-Link-site">
              <Link to="/products">Ecommerce</Link>
              <span>
                <i className="fas fa-shopping-bag"></i>
              </span>
            </div>
            <ul className="description">
              <li className="active">
                <a href="/blog/mohamedebrahimdiab">
                  <span>Posts</span>100
                </a>
              </li>
              <li className="jk3gM">
                <a href="/blog/mohamedebrahimdiab/followers">
                  <span>Followers</span>
                  <span className="KlOKT">20K</span>
                </a>
              </li>
              <li className="jk3gM">
                <a href="/blog/mohamedebrahimdiab/followers">
                  <span>Following</span>
                  <span className="KlOKT">400</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
