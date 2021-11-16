import React from "react";
import Rate from "../Rate/Rate";
import "./Post.scss";
function Post() {
  return (
    <>
      <div className="post">Video Review</div>
      <div className="postFooter">
        <Rate />
        <form className="comment" action="">
          <input className="w-100" type="text" placeholder="Add a comment..." />
        </form>
      </div>
    </>
  );
}

export default Post;
