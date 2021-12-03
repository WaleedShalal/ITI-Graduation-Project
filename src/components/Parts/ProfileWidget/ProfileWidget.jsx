import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/Auth";
import avatar from "../../../assets/images/avatar.jpg";
import "./ProfileWidget.scss";
function ProfileWidget() {
  const { user, data } = useContext(AuthContext);
  return (
    <div className="w-100 widget profile-widget text-center">
      <div className="user-heading round">
        <a href="/">
          <img
            className="rounded-circle"
            src={data.imageUrl ? data.imageUrl : avatar}
            alt=""
          />
        </a>
        <h1 className="mt-2">{user.displayName}</h1>
        <p>{user.email}</p>
      </div>
      <h4 className="widget-title">
        Your profile has a new Experience section
      </h4>
      <p>
        Showcase your professional experience and education to help potential
        employers and collaborators find and contact you about career
        opportunities.
      </p>
      <Link
         to={`/profile/${data.id}`}
        className="main-btn"
        href="profile.html"
        title=""
        data-ripple=""
      >
        view profile
      </Link>
    </div>
  );
}

export default ProfileWidget;
