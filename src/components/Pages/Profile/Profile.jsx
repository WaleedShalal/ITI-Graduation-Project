import "./Profile.scss";
import { Link } from "react-router-dom";
import Post from "../../Parts/Post/Post";
import Stars from "../../Parts/Stars/Stars";
import Stories from "../../Parts/Stories/Stories";
import "./Profile.scss";
function Profile({userName}) {
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
            <span>{userName}</span>
            <img src="http://placehold.it/70" alt="profile" />
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
