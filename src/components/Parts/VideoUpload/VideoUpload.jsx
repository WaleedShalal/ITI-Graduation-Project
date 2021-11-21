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
    if(video){
      setLoadVideo(true)
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
              });
              setProgress(0);
              setCaption("");
              setVideo(null);
              setLoadVideo(false);
              setError(false);
            });
        }
      );
    }else{
      setError(true);
    }
   
  };
  return (
    <div className="video_upload">
      <div className="upload_container">
        <input
          type="text"
          className="caption"
          placeholder="Enter a caption ..."
          onChange={(event) => setCaption(event.target.value)}
          value={caption}
        />
        <input type="file" id="file" onChange={handleChange} />
        <label htmlFor="file" className="btn-3">
          <span><i class="fas fa-cloud-upload-alt"></i> video</span>
        </label>
       
        <button onClick={handleUpload} className="upload">
          upload
        </button>
      </div>
      <div className="prog_details">
      {
        loadVideo && <progress className="progress" value={progress} max="100" />
      }
      <p className="font-weight-normal text-black">{video?.name}</p>
      {
        error && !video?.name  && <p className="font-weight-normal text-danger">please choose a video</p>
      }
      </div>
     
    </div>
  );
}

export default ImageUpload;
