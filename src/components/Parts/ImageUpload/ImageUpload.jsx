import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/Auth";
import "./ImageUpload.scss";
function ImageUpload() {
  const { data } = useContext(AuthContext);
  const [image, setImage] = useState(data.imageUrl);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="page">
      <div className="img-holder">
        <img src={image} alt="" id="img" className="img rounded-circle" />
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
