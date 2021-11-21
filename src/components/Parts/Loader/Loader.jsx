import React from "react";
import './Loader.scss'
function spinner() {
  return (
    <section className="loader">
      <button className="loader-btn" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    </section>
  );
}

export default spinner;
