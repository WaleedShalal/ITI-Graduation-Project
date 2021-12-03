import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import avatar from "../../../assets/images/avatar.jpg";
import { users } from "./users";
import "./SearchPage.scss";
function SearchPage() {
  const param = useParams();
  const [city, setcity] = useState("all");
  const [role, setRole] = useState("all");

  const results = users.filter(function (el) {
    if (city === "all") {
      return el.name.startsWith(param.name.toLowerCase());
    }
    if (role === "all") {
      return el.name.startsWith(param.name.toLowerCase()) &&
      el.address.includes(city) 
    } else {
      return (
        el.name.startsWith(param.name.toLowerCase()) &&
        el.address.includes(city) &&
        el.role === role
      );
    }
  });
  const handleSelectCity = (e) => {
    setcity(e.target.value);
  };
  const handleSelectRole = (e) => {
    setRole(e.target.value);
  };
  return (
      <div className="results">
        <div className="container">
          <div className="row">
            <div className="filter col-3">
              <div className="filter__header">
                <h3>Filters</h3>
                <div className="filter__selected">
                  <span>{results.length} results</span>
                </div>
              </div>
              <div className="drop__sec">
                <h3>
                  <span>Country</span>
                </h3>
                <div className="select-dropdown">
                  <select>
                    <option value="Egypt">Egypt</option>
                  </select>
                </div>
              </div>
              <div className="drop__sec">
                <h3>
                  <span>City</span>
                </h3>
                <div className="select-dropdown">
                  <select value={city} onChange={handleSelectCity}>
                    <option value="all">all</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Aswan">Aswan</option>
                    <option value="Asyut">Asyut</option>
                    <option value="Beheira">Beheira</option>
                    <option value="Beni Suef">Beni Suef</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Dakahlia">Dakahlia</option>
                    <option value="Damietta">Damietta</option>
                    <option value="Faiyum">Faiyum </option>
                    <option value="Gharbia">Gharbia</option>
                    <option value="Giza">Giza</option>
                    <option value="Ismailia">Ismailia</option>
                    <option value="Kafr El Sheikh">Kafr El Sheikh</option>
                    <option value="Luxor">Luxor</option>
                    <option value="Matruh">Matruh</option>
                    <option value="Minya">Minya</option>
                    <option value="Monufia">Monufia</option>
                    <option value="New Valley">New Valley</option>
                    <option value="North Sinai">North Sinai</option>
                    <option value="Port Said">Port Said</option>
                    <option value="Qalyubia">Qalyubia</option>
                    <option value="Qena">Qena</option>
                    <option value="Queens">Red Sea</option>
                    <option value="Red Sea">Sharqia</option>
                    <option value="Sohag">Sohag</option>
                    <option value="South Sinai">South Sinai</option>
                    <option value="Suez">Suez</option>
                  </select>
                </div>
              </div>
              <div className="drop__sec border-0">
                <h3>
                  <span>Role</span>
                </h3>
                <div className="select-dropdown">
                  <select value={role} onChange={handleSelectRole}>
                    <option value="all">all</option>
                    <option value="user">user</option>
                    <option value="Blogger">Blogger</option>
                    <option value="product owner">product owner</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="resultsection col-9">
              {results.length ? (
                results.map((user) => {
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
                })
              ) : (
                <div className="box__fail">
                  <p className="fail__results">
                    No results found for the keyword{" "}
                    <span className="css-1gu9lf2">“{param.name}”</span>
                  </p>
                  <p className="hint">
                    Please check the spelling or use a general search keyword
                  </p>
                  <Link to="/" type="button" className="back__btn">
                    Back to home
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default SearchPage;
