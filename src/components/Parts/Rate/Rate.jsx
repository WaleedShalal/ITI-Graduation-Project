import React from "react";
import Stars from "../Stars/Stars";

function Rate() {
  return (
    <div className="d-flex mt-1">
     <Stars />
      <div className="me-2">
        <i className="fas fa-comment-alt"></i>
      </div>
      <div>
        <i className="fas fa-share"></i>
      </div>
      <div className="ms-auto">
        <i className="far fa-bookmark"></i>
      </div>
    </div>
  );
}

export default Rate;
