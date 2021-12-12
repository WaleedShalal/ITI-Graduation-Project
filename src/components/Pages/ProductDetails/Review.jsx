import React, { useContext  } from "react";
import { AuthContext } from "../../../context/Auth";
import Stars from "../../Parts/Stars/Stars";

function Review({ userName, comment, rate }) {
  const { data, image } = useContext(AuthContext);
  return (
    <div className="cutomer__review col-10 mb-3 p-3">
      <div className="row cutomer__reviewBlock py-3">
        <figure className="customer__img col-lg-1 col-2 p-0 text-center mb-0">
          <img
            className="rounded-circle"
            src={data.imageUrl ? data.imageUrl : image}
            alt="..."
          />
        </figure>
        <div className="ps-3 col-9">
          <h3 className="userName text-capitalize mb-0">{userName}</h3>
          <div className="mb-3">
            <Stars review={rate} />
          </div>
          <p className="mb-0">{comment}</p>
        </div>
      </div>
    </div>
  );
}

export default Review;
