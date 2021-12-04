import React, { useState } from "react";
import Stars from "../Stars/Stars";

function Rate({PostId ,rate}) {
  const [select, setSelect] = useState(false);
  return (
    <div className="d-flex mt-1">
    <Stars PostId={PostId} rate={rate} />
      <div className="ms-auto fs-4">
        <i className="far fa-bookmark" onClick={()=> setSelect(!select)} style={{fontWeight:!select ? "normal" : "900" , cursor:"pointer"}}></i>
      </div>
    </div>
  );
}

export default Rate;
