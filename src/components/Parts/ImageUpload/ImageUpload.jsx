import React, { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { auth, db } from "../../../Firebase/Firebase";
import avatar from "../../../assets/images/avatar.jpg";
import "./ImageUpload.scss";

function ImageUpload() {
  const { data } = useContext(AuthContext);
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        auth.onAuthStateChanged(function (user) {
          if (user) {
            db.collection("users")
              .doc(user.uid)
              .update({ imageUrl: reader.result });
          }
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
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
  );
}

export default ImageUpload;
