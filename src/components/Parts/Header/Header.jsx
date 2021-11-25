import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { auth, db } from "../../../Firebase/Firebase";
import { useSelector } from "react-redux";
import "./Header.scss";
import { AuthContext } from "../../../context/Auth";

function Header() {
  const [image, setimage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [data, setData] = useState({
    imageUrl: image,
  });
  const { user } = useContext(AuthContext);
  const { fetchedData } = useSelector((state) => state);
  let location = useLocation();
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setData(snapshot.data());
        }
      });
  }, [data]);
  console.log(data);
  return (
    <nav className="main__navbar navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar__logo navbar-brand" to="/">
          Minuteف
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar__search">
            <form className="search__form d-flex">
              <input
                className="search__formInput form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <button className="search__formBtn" type="submit">
                <i className="fas fa-search text-dark "></i>
              </button>
            </form>
          </div>
          <ul className='navbar__list navbar-nav ms-auto mb-2 mb-lg-0 align-items-center'>
            {user && (
              <li className='navbar__listItem  nav-item'>
                <div className='list__itemProfile'>
                  <Link
                    className='nav-link active d-flex align-items-center p-1'
                    aria-current='page'
                    to='/profile'>
                    <figure className='mb-0 rounded-circle'>
                      <img
                        className="w-100 rounded-circle"
                        src={data.imageUrl ? data.imageUrl : image}
                        alt=""
                      />
                    </figure>
                    <div className='ms-1'>
                      <h5 className='text-capitalize mb-0'>
                        {user.displayName}
                      </h5>
                    </div>
                  </Link>
                </div>
              </li>
            )}
            <li className='navbar__listItem nav-item'>
              <Link
                className="item__link nav-link active"
                aria-current="page"
                to="/"
              >
                <i className="fa__item fas fa-home"></i>
              </Link>
            </li>
            <li className="navbar__listItem nav-item">
              <Link className="item__link nav-link" to="/messages">
                <i className="fa__item far fa-comment-alt"></i>
                <span className="item__notification"></span>
              </Link>
            </li>
            <li className="navbar__listItem nav-item">
              <Link className="item__link nav-link" to="#">
                <i className="fa__item far fa-bell"></i>
                <span className="item__notification"></span>
              </Link>
            </li>
            <li className="navbar__listItem nav-item">
              <Link className=" item__link nav-link" to="/cart">
                <i className="fa__item fas fa-shopping-cart">
                  {fetchedData.purchased.length}
                </i>
              </Link>
            </li>
            <li className="navbar__listItem nested__list  nav-item">
              <div className="item__link">
                <i className="fa__item fas fa-th-large"></i>
              </div>
              <ul className="list__itemOption list-unstyled text-dark p-2">
                <li className="option__eCommerce mb-2">
                  <Link className="btn text-capitalize w-100" to="/products">
                    <i className="fas fa-store"></i> ecommerce
                  </Link>
                </li>
                <li className="option__setting mb-2">
                  <Link className="btn text-capitalize w-100" to="/edit">
                    <i className="fas fa-cogs"></i> Edit Profile
                  </Link>
                </li>
                <li className="option__logout">
                  {location.pathname === "/register" ? (
                    <NavLink
                      className=" btn btn-outline-danger  text-capitalize w-100"
                      to={`/login`}
                    >
                      <i className="fas fa-sign-out-alt"></i> Sign in
                    </NavLink>
                  ) : location.pathname === "/login" ||
                    location.pathname === "/wellcome" ? (
                    <NavLink
                      className=" btn btn-outline-danger  text-capitalize w-100"
                      to={`/register`}
                    >
                      <i className="fas fa-sign-out-alt"></i> Sign up
                    </NavLink>
                  ) : (
                    <NavLink
                      className=" btn btn-outline-danger  text-capitalize w-100"
                      to={`/wellcome`}
                      onClick={() => auth.signOut()}
                    >
                      <i className="fas fa-sign-out-alt"></i> logout
                    </NavLink>
                  )}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
