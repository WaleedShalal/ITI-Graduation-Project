import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../Firebase/Firebase";
import avatar from "../../../assets/images/avatar.jpg";
import Loader from "../../../components/Parts/Loader/Loader"
import "./EditProfile.scss";
import { AuthContext } from "../../../context/Auth";
function EditProfile() {
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);
  const [isMounted, setMounted] = useState(true);
  const {setEdit} = useContext(AuthContext)
  const [data, setData] = useState({
    address: [],
    birthDate: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    followedHashtags: " ",
    gender: "",
    id: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    subscribeUs: true,
    website: "",
    imageUrl: "",
  });
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        setData(snapshot.data());
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isMounted) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .update(data);
    }
    setUpdated(true);
    setEdit(true);
    setTimeout(() => {
      setUpdated(false);
      setEdit(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setData({...data,imageUrl:reader.result});
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    data.email?
    <div className="edit__profile container">
      <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    <div className="page">
                      <div className="img-holder">
                        <img
                          src={data.imageUrl ? data.imageUrl : avatar}
                          alt=""
                          id="img"
                          className="img rounded-circle"
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        name="image-upload"
                        id="input"
                        onChange={imageHandler}
                      />
                      <div className="label">
                        <label className="image-upload" htmlFor="input">
                          <i className="fas fa-camera"></i> change image
                        </label>
                      </div>
                    </div>
                  </div>
                  <h5 className="user-name">
                    {data.email.substring(0, data.email.lastIndexOf("@"))}
                  </h5>
                  <h6 className="user-email">{data.email}</h6>
                </div>
                <div className="about">
                  <h5>About</h5>
                  <p>
                    I'm Yuki. Full Stack Designer I enjoy creating user-centric,
                    delightful and human experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          {updated && (
            <div className="alert alert-success text- center" role="alert">
              data has been updated successfully
            </div>
          )}
          <div className="card h-100">
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="mb-1" htmlFor="fullName">
                        firstName
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="mb-1" htmlFor="fullName">
                        lastName
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="mb-1" htmlFor="eMail">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="eMail"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="mb-1" htmlFor="ciTy">
                        password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-2">
                      <label className="mb-1" htmlFor="phone ">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-2">
                      <label className="mb-1" htmlFor="website">
                        Website URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="website"
                        value={data.website}
                        name="website"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row gutters">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2">
                    <div className="form-group mt-2">
                      <label className="mb-1" htmlFor="Street">
                        Address
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        id="Address"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2">
                    <div className="form-group">
                      <label className="mb-1" htmlFor="sTate">
                        followedHashtags
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="sTate"
                        name="followedHashtags"
                        value={data.followedHashtags}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
                    <div className="text-right">
                      <button
                        type="button"
                        name="submit"
                        className="btn btn-secondary me-2"
                        onClick={() => navigate("/home")}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        name="submit"
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>:<Loader />
  );
}

export default EditProfile;
