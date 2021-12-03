import React, { useContext, useState } from "react";
import firebase from "firebase/compat/app";
import { db, storage } from "../../../Firebase/Firebase";
import { AuthContext } from "../../../context/Auth";
import "./VideoUpload.scss";
function ImageUpload() {
  const { user } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [loadVideo, setLoadVideo] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (video) {
      setLoadVideo(true);
      const uploadTask = storage.ref(`videos/${video?.name}`).put(video);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("videos")
            .child(video.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                videoUrl: url,
                username: user.displayName,
                userId: user.uid,
                rate : 0,
              });
              setProgress(0);
              setCaption("");
              setVideo(null);
              setLoadVideo(false);
              setError(false);
            });
        }
      );
    } else {
      setError(true);
    }
  };
  return (
   
      <div className="main-wraper mb-0 mt-3">
        <div className="upload_container">
          <span className="new-title">Create New Post</span>
          <input type="file" id="file" onChange={handleChange} />
          <label htmlFor="file" className="btn-3">
            <span>
              <i className="fas fa-cloud-upload-alt"></i> video
            </span>
          </label>
          <button onClick={handleUpload} className="upload">
            upload
          </button>
          </div>
          <div className="new-post">
            <form method="post">
            <i className="fas fa-pen-alt"></i>
              <input
                type="text"
                placeholder="Create New Post"
                onChange={(event) => setCaption(event.target.value)}
                value={caption}
              />
            </form>
            <div className="upload-media">
              <div className="prog_details">
                {loadVideo && (
                  <progress className="progress me-2" value={progress} max="100" />
                )}
                <p className="font-weight-normal text-black">{video?.name}</p>
                {error && !video?.name && (
                  <p className="font-weight-normal text-danger">
                    please choose a video
                  </p>
                )}
              </div>
            </div>
        </div>
      </div>
    
  );
}

export default ImageUpload;
