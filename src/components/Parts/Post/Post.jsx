import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import Rate from "../Rate/Rate";
import { db } from "../../../Firebase/Firebase";
import { AuthContext } from "../../../context/Auth";
import firebase from "firebase/compat/app";
import "./Post.scss";

function Post({ username, postId, video, caption }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  
  useEffect(() => {
    let mounted = true;
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      mounted = false;
    };
  }, [postId]);
  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <>
      <div className="post">
        <ReactPlayer width="100%" url={video} controls />
      </div>
      <div className="postFooter">
        <div className="caption">
          <p>
            <strong>{username}</strong> {caption}
          </p>
        </div>
        <Rate />
        <div className="post_comment">
          {comments.map((comment) => (
            <p key={comment.timestamp}>
              <strong>{`${comment.username} `}</strong>
              {comment.text}
            </p>
          ))}
        </div>
        <form className="comment" action="">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button disabled={!comment} type="submit" onClick={postComment}>
            Post
          </button>
        </form>
      </div>
    </>
  );
}

export default Post;
