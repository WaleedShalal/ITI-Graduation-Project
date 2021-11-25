import React, { useEffect, useState } from "react";
import { auth, db } from "../../../Firebase/Firebase";
import "./ImageUpload.scss";

function ImageUpload() {
  const [image, setimage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [data, setData] = useState({
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .get()
      .then((snapshot) => {
        setData(snapshot.data());
      });
  }, []);
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .update({ imageUrl: reader.result });
        setData({
          imageUrl: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="page">
      <div className="img-holder">
        <img
          src={data.imageUrl ? data.imageUrl : image}
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
