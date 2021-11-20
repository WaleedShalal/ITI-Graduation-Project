import React from "react";
import ReactPlayer from 'react-player'
import Rate from "../Rate/Rate";
import "./Post.scss";

function Post({username,video,caption}) {

  return (
    <>
      <div className="post">
      <ReactPlayer width="100%" url={video} controls/>
      </div>
      <div className="postFooter">
        <div className="caption">
          <p><strong>{username}</strong> {caption}</p>
        </div>
        <Rate />
        <form className="comment" action="">
          <input className="w-100" type="text" placeholder="Add a comment..." />
        </form>
      </div>
    </>
  );
}

export default Post;
