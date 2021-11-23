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
      console.log("unmounting");
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
    // <div className="post">
    //   <ReactPlayer width="100%" url={video} controls />
    //   <div className="postFooter">
    //     <div className="caption">
    //       <p>
    //         <strong>{username}</strong> {caption}
    //       </p>
    //     </div>
    //     <Rate />
    //     <div className="post_comment">
    //       {comments.map((comment) => (
    //         <p key={comment.timestamp}>
    //           <strong>{`${comment.username}`}</strong>
    //           {comment.text}
    //         </p>
    //       ))}
    //     </div>
    //     <form className="comment" action="">
    //       <input
    //         type="text"
    //         placeholder="Add a comment..."
    //         value={comment}
    //         onChange={(e) => setComment(e.target.value)}
    //       />
    //       <button disabled={!comment} type="submit" onClick={postComment}>
    //         Post
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div class="main-wraper mt-4 ms-2">
      <div class="user-post">
        <div class="friend-info">
          <figure>
            <img alt="" src="https://via.placeholder.com/100" />
          </figure>
          <div class="friend-name">
            <div class="more">
              <div class="more-post-optns">
                <i class="fas fa-ellipsis-h"></i>
                <ul>
                  <li>
                    <i class="fas fa-pen-alt"></i>Edit Post
                    <span>Edit This Post within a Hour</span>
                  </li>
                  <li>
                    <i class="fas fa-ban"></i>Hide Post
                    <span>Hide This Post</span>
                  </li>
                  <li>
                    <i class="fas fa-trash"></i>Delete Post
                    <span>If inappropriate Post By Mistake</span>
                  </li>
                  <li>
                    <i class="fas fa-flag"></i>Report
                    <span>Inappropriate content</span>
                  </li>
                </ul>
              </div>
            </div>
            <h5>
              <a title="" href="time-line.html">
                Turgut Alp
              </a>{" "}
              Create Post
            </h5>
            <span>
              <i class="fas fa-globe-asia"></i>published: Sep,15 2020
            </span>
          </div>
          <div class="post-meta">
            <div className="video">
              <ReactPlayer width="100%" url={video} controls />
            </div>
            <Rate />
            <a href="post-detail.html" class="post-title">
            {username}
            </a>
            <p class="caption">
            {caption}
            </p>
          <div className="postFooter">
            <div className="post_comment">
              {comments.map((comment) => (
                <p key={comment.timestamp}>
                  <strong className="me-1">{`${comment.username}`}</strong>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
