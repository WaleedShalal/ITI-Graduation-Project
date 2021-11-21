import React, { useContext, useState } from "react";
import firebase from "firebase/compat/app"
import { db, storage } from "../../../Firebase/Firebase";
import { AuthContext } from "../../../context/Auth";
function ImageUpload() {
  const { user } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };
  
  const handleUpload = (e) => {
    const uploadTask = storage.ref(`videos/${video?.name}`).put(video);
    uploadTask.on(
        "state_changed",
        (snapshot)=>{
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress); 
        },
        (error)=>{
            console.log(error);
        },
        ()=>{
            storage
                .ref("videos")
                .child(video.name)
                .getDownloadURL()
                .then(url=>{
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        videoUrl : url, 
                        username:user.displayName 
                    });
                    setProgress(0); 
                    setCaption('')
                    setVideo(null);
                })
        }
    )
  };
  return (
    <div>
        <progress value={progress} max="100"/>
      <input
        type="text"
        placeholder="Enter a caption ..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>upload</button>
    </div>
  );
}

export default ImageUpload;
