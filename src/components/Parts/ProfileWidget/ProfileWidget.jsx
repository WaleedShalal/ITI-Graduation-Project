import React from "react";
import { Link } from "react-router-dom";
import "./ProfileWidget.scss";
function ProfileWidget() {
  return (
    <div class="widget">
      <h4 class="widget-title">Your profile has a new Experience section</h4>
      <p>
        Showcase your professional experience and education to help potential
        employers and collaborators find and contact you about career
        opportunities.
      </p>
      <Link to="/profile"class="main-btn" href="profile.html" title="" data-ripple="">
        view profile
      </Link>
    </div>
  );
}

export default ProfileWidget;
