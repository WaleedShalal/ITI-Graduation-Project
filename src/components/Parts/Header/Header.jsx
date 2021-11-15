import React from "react";
import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <div className="container-fluid">
        <header className="header-navbar">
          <div className="leftPart">
            <div className="logo">
              <span>minuteف</span>
            </div>
            <div className="search-container">
              <form className="search">
                <div className="form-content">
                  <span className="search-icon">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    name="search"
                    aria-label="Search"
                    className="search-input"
                    placeholder="Search"
                  ></input>
                </div>
              </form>
            </div>
          </div>
          <div className="rightPart">
            <div className="RighC">
              <i className="fas fa-home "></i>
            </div>
            <div className="RighC">
              <i className="fas fa-comment "></i>
            </div>
            <div className="RighC">
              <i className="fas fa-bell "></i>
            </div>
            <div className="RighC">
              <i className="fas fa-user-circle active "></i>
            </div>
            <div className="RighC">
              Logout <i className="fas fa-sign-out-alt ps-2"></i>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
