import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import Rate from "../Rate/Rate";
import { db } from "../../../Firebase/Firebase";
import { AuthContext } from "../../../context/Auth";
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";
import "./Post.scss";

function Post({ username, postId, video, caption, rate ,userId}) {
  const [isMounted ,setMounted ] = useState(true)
  const { user, data} = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let isMounted = true;
    if (postId && isMounted) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {isMounted = false};
  },[postId]);

  useEffect(() => {
    return () => { 
      setMounted(false)
    }
  }, []);
  const postComment =  (e) => {
    e.preventDefault();
    if(isMounted){
      db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId:data.id
      });
      setComment("");
    }
  };

  const deletePost = () => {
    db.collection("posts").doc(postId).delete();
  };
  return (
    <div className="main-wraper mt-3">
      <div className="user-post">
        <div className="friend-info">
          <figure>
            <img alt="" src="https://via.placeholder.com/100" />
          </figure>
          <div className="friend-name">
            <div className="more">
              <div className="more-post-optns">
                <i className="fas fa-ellipsis-h"></i>
                <ul>
                  <li>
                    <i className="fas fa-pen-alt"></i>Edit Post
                    <span>Edit This Post within a Hour</span>
                  </li>
                  <li>
                    <i className="fas fa-ban"></i>Hide Post
                    <span>Hide This Post</span>
                  </li>
                  <li onClick={deletePost}>
                    <i className="fas fa-trash"></i>Delete Post
                    <span>If inappropriate Post By Mistake</span>
                  </li>
                  <li>
                    <i className="fas fa-flag"></i>Report
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
              <i className="fas fa-globe-asia"></i>published: Sep,15 2020
            </span>
          </div>
          <div className="post-meta">
            <div className="video">
              <ReactPlayer width="100%" url={video} controls />
            </div>
            <Rate PostId={postId} rate={rate} />
            <Link to={`/profile/${userId}`} className="post-title">
              {username}
            </Link>
            <p className="caption">{caption}</p>
            <div className="postFooter">
              <div className="post_comment">
                {comments.map((comment) => (
                  <p key={comment.timestamp}>
                    <Link to={`/profile/${comment.userId}`} className="me-1">{`${comment.username}`}</Link>
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
