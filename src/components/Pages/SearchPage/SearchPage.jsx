import React from "react";
import { useParams } from "react-router-dom";
import avatar from "../../../assets/images/avatar.jpg";
import { users } from "./users";
import "./SearchPage.scss";
function SearchPage() {
  const param = useParams();
  console.log(param.city);

  const results = users.filter(function (el) {
    return el.name.startsWith(param.city);
  });

  return (
    <>
      <div className="container-fluid search__title">
        <div className="container search__content">
          <h1>bloggers in Egypt</h1>
        </div>
      </div>
      <div className="results">
        <div className="container">
          <div className="row">
            <div className="resultsection col-9">
              {results.map((user) => {
                return (
                  <div key={user.id} className="box">
                    <div className="info">
                      <figure>
                        <img alt="" src={avatar} />
                      </figure>
                      <div className="info__data">
                        <a href="/">
                          {user.name} <i className="fas fa-check-circle"></i>
                        </a>
                        <span className="follow">follow</span>
                        <span className="address">{user.address}</span>
                        <ul className="followers">
                          <li>
                            <span>
                              <span className="num">{user.posts} </span> posts
                            </span>
                          </li>
                          <li>
                            {" "}
                            <span>
                              <span className="num">{user.followers} </span>{" "}
                              followers
                            </span>
                          </li>
                          <li>
                            {" "}
                            <span>
                              <span className="num">{user.following}</span>{" "}
                              following
                            </span>
                          </li>
                        </ul>
                        <span className="role">{user.role}</span>
                      </div>
                    </div>
                    <p className="description">{user.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
