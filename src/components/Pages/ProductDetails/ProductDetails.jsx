import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addCart } from "../../../store/cartActions";
import Review from "./Review";
import { auth } from "../../../Firebase/Firebase";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const [comment, setcomment] = useState("");
  const [rate, setRate] = useState("");
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchedData } = useSelector((state) => state);
  const isFromCart = pathname.includes("cart");
  const productItem = fetchedData.filter.filter(
    (p) => p.id === parseInt(id)
  )[0];
  const purchasedItem = fetchedData.purchased.filter(
    (p) => p.id === parseInt(id)
  )[0];

  const handleBack = () => {
    isFromCart ? navigate("/cart") : navigate("/products/1");
  };
  const addReview = (e) => {
    e.preventDefault();
    setReviews([
      ...reviews,
      {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        comment: comment,
        rate: rate,
      },
    ]);
    setcomment("");
    setRate("");
  };
  const handleChangeComment = (e) => {
    setcomment(e.target.value);
  };
  const handleChangeRate = (e) => {
    setRate(e.target.value);
  };
  return (
    <React.Fragment>
      <section className="full-details mt-2">
        <div className="product__details__wrapper container-fluid mt-5">
          <div className="row ">
            <div className="product__images col-6">
              <div className="row align-items-center">
                <div className="mini__images col-2">
                  <figure className="">
                    <img className="" src={productItem.image} alt="" />
                  </figure>
                  <figure className="">
                    <img className="" src={productItem.image} alt="" />
                  </figure>
                  <figure className="">
                    <img className="" src={productItem.image} alt="" />
                  </figure>
                </div>
                <figure className="col-10 mb-0">
                  <img
                    className="product-img w-100"
                    src={productItem.image}
                    alt=""
                  />
                </figure>
              </div>
            </div>
            <div className="product-info offset-1 col-5 d-flex flex-column justify-content-between py-4">
              <div className="info">
                <div className="mb-3">
                  <span className="fw-bold  text-capitalize">product id</span> :{" "}
                  {productItem.id}.
                </div>
                <div className="mb-3">
                  <span className="fw-bold text-capitalize">product Title</span>{" "}
                  : {productItem.title}.
                </div>
                <div className="mb-3">
                  <span className="fw-bold text-capitalize">
                    product Desciption
                  </span>{" "}
                  : {productItem.description}.
                </div>
                <div className="mb-3">
                  <span className="fw-bold text-capitalize">product Price</span>{" "}
                  : {productItem.price}$.
                </div>
                <div className="">
                  <span className="fw-bold text-capitalize ">
                    product quantity in cart
                  </span>{" "}
                  :{" "}
                  <span className="text-success fw-bold">
                    {purchasedItem ? purchasedItem.count : 0}.
                  </span>
                </div>
              </div>
              <div className="options__btn row pt-3">
                <div className="col-sm-12 col-md-6 text-center p-1">
                  <button
                    onClick={() => dispatch(addCart(productItem))}
                    className="option__addCart btn btn-primary"
                  >
                    Add Cart
                  </button>
                </div>
                <div className="col-sm-12 col-md-6 text-center p-1">
                  <Link
                    to="/products/1"
                    onClick={handleBack}
                    className="option__backProducts btn btn-outline-primary"
                  >
                    {isFromCart ? "Back Cart" : "Back Products"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product__reviews">
        <div className="container">
          <form onSubmit={addReview}>
            <div className="row py-3">
              <div className="input-container col-lg-8 col-10">
                <input
                  id="review"
                  className="input"
                  type="text"
                  pattern=".+"
                  required
                  name="review"
                  onChange={handleChangeComment}
                  value={comment}
                />
                <label className="label" htmlFor="review">
                  Add Your Review
                </label>
              </div>

              <input
                className="input-number col-lg-1 col-3 mt-lg-0 mt-3 me-2 ms-3 ms-lg-0 "
                type="number"
                max="5"
                min="0"
                placeholder="rate"
                onChange={handleChangeRate}
                value={rate}
              />

              <input
                className="add_review col-lg-2 mt-3 mt-lg-0 col-3"
                type="submit"
                value="add review"
              />
            </div>
          </form>
          <h2 className="text-capitalize mb-5">top reviews</h2>
          <div className="row">
            {reviews.map((review, index) => {
              return (
                <Review
                  key={index}
                  userName={review.userName}
                  comment={review.comment}
                  rate={review.rate}
                />
              );
            })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductDetails;
