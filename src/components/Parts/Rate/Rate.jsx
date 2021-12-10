import React, { useState } from "react";
import Stars from "../Stars/Stars";
import "./Rate.scss";
function Rate({ PostId, rate }) {
  const [select, setSelect] = useState(false);
  return (
    <>
      <div className="rate d-flex mt-1 pb-2">
        <div>
          <Stars PostId={PostId} rate={rate} />
          <span
            className="rate-number text-dark"
            style={{ fontSize: "17px", fontFamily: "monospace" }}
          >
            {rate}.0
          </span>
        </div>

        <div className="ms-auto fs-4">
          <i
            className="far fa-bookmark"
            onClick={() => setSelect(!select)}
            style={{
              fontWeight: !select ? "normal" : "900",
              cursor: "pointer",
            }}
          ></i>
        </div>
      </div>
      {/* ---------------------------- */}
      <div className="rate d-flex mt-1 justify-content-between py-2">
        <span className="btn icons">
          <i className="fas fa-eye me-1"></i>31k views
        </span>
        <span className="btn icons">
        <i className="far fa-comment-alt me-1"></i>Comment
        </span>
        <span className="btn icons">
        <i className="fas fa-share me-1"></i>Share
        </span>
      </div>
    </>
  );
}

export default Rate;
