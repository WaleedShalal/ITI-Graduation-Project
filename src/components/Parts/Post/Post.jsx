import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import Rate from "../Rate/Rate";
import { auth, db } from "../../../Firebase/Firebase";
import { AuthContext } from "../../../context/Auth";
import firebase from "firebase/compat/app";
import avatar from "../../../assets/images/avatar.jpg";
import "./Post.scss";
import Emoji from "../Emoji/Emoji";

function Post({ username, postId, video, caption, rate, userId }) {
  const [isMounted, setMounted] = useState(true);
  const { user, data ,users } = useContext(AuthContext);
  const [image, setImage] = useState("");
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
    return () => {
      isMounted = false;
    };

  }, [postId]);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);
  const postComment = (e) => {
    e.preventDefault();
    if (isMounted) {
      db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: data.id,
        profileImage : data.imageUrl
      });
      setComment("");
    }
  };

  const deletePost = () => {
    db.collection("posts").doc(postId).delete();
  };

  const onEmojiClick = (event, emojiObject) => {
    emojiObject && setComment(`${comment}${emojiObject?.emoji}`);
  };

  const handleToggleEmoji = () => {
    let emojiElement = document.getElementById("emoji");
    let comment__emoji = document.getElementById("comment__emoji");
    comment__emoji.classList.toggle("active");
    comment__emoji.classList.contains("active")
      ? emojiElement.classList.add("active")
      : emojiElement.classList.remove("active");
  };

  const [inEmoji, setInEmoji] = useState(false);
  const handleParent = (param) => {
    setInEmoji(param);
  };

  // window.onclick = (e) => {
  //   let emojiElement = document.getElementById('emoji');
  //   let comment__emoji = document.getElementById('comment__emoji');
  //   let clickedElement = e.target;
  //   handleParent(false);
  //   if (emojiElement && comment__emoji && clickedElement) {
  //     if (
  //       comment__emoji.classList.contains('active') &&
  //       !clickedElement.classList.contains('emoji__show') &&
  //       !inEmoji
  //     ) {
  //       emojiElement.classList.remove('active');
  //       comment__emoji.classList.remove('active');
  //     }
  //   }
  // };

  // get user data
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          db.collection("users")
            .doc(userId)
            .get()
            .then((snapshot) => {
              if (snapshot.exists) {
                setImage(snapshot.data().imageUrl);
              }
            });
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [data.imageUrl]);

  return (
    <div className="main-wraper mt-3">
      <div className="user-post">
        <div className="friend-info">
          <figure>
            <img alt="" src={image ? image : avatar} />
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
              <a title="" href={`/profile/${userId}`}>
                {username}
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
            <a href={`/profile/${userId}`} className="post-title">
              {username}
            </a>
            <p className="caption">{caption}</p>
            <div className="postFooter">
              <div className="post_comment">
                {comments.map((comment) => (
                  <span key={comment.timestamp}>
                    <figure>
                      <img alt="" src={comment.profileImage} />
                    </figure>
                    <p>
                      <a
                        href={`/profile/${comment.userId}`}
                        className="me-1"
                      >{`${comment.username}`}</a>
                      <span> 
                      {comment.text.includes("@") ? comment.text.substring(0, comment.text.lastIndexOf("@")) : comment.text}
                        {
                            users.map((user,index)=>{
                             
                                if(comment.text.includes(user.username)){
                                  return <a key={index} href={`/profile/${user.id}`}>@{user.username}</a>
                                }
                              
                              
                            })
                         

                        }


                      
                      </span>
                    </p>
                  </span>
                ))}
              </div>
              <form className="comment align-items-center" action="">
                <i
                  id="comment__emoji"
                  className="emoji__show far fa-smile"
                  onClick={handleToggleEmoji}
                ></i>
                <Emoji
                  onEmojiClick={onEmojiClick}
                  handleParent={handleParent}
                />
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
