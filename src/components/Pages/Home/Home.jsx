import React, {  useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Post from "../../Parts/Post/Post";
import { db } from "../.../../../../Firebase/Firebase";
import VideoUpload from "../../Parts/VideoUpload/VideoUpload";
import "./Home.scss";
function Home({ userName }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);
  return (
    <section className="home__page">
  
      <div className="container">
      <VideoUpload username={userName} />
        <div className="row">
          <div className="col-7">
            <div className="row mb-3 py-3">
              <figure className="col-2">
                <img
                  className="w-100"
                  src="https://via.placeholder.com/100"
                  alt=""
                />
              </figure>
              <div className="offset-1 col-9">
                {posts.map(({ id, post }) => {
                  return (
                    <Post
                      key={id}
                      postId={id}
                      username={post.username}
                      video={post.videoUrl}
                      caption={post.caption}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="offset-1 col-4">
            <div className="row">
              <h6 className="text-capitalize mb-3 fw-bold">suggestion</h6>
              <figure className="col-2">
                <img
                  className="w-100"
                  src="https://via.placeholder.com/100"
                  alt=""
                />
              </figure>
              <div className="col-6">waleed elbana</div>
              <div className="col-4">follow</div>
              <figure className="col-2">
                <img
                  className="w-100"
                  src="https://via.placeholder.com/100"
                  alt=""
                />
              </figure>
              <div className="col-6">waleed elbana</div>
              <div className="col-4">follow</div>
              <figure className="col-2">
                <img
                  className="w-100"
                  src="https://via.placeholder.com/100"
                  alt=""
                />
              </figure>
              <div className="col-6">waleed elbana</div>
              <div className="col-4">follow</div>
              <figure className="col-2">
                <img
                  className="w-100"
                  src="https://via.placeholder.com/100"
                  alt=""
                />
              </figure>
              <div className="col-6">waleed elbana</div>
              <div className="col-4">follow</div>
            </div>
            <hr />
            <div className="row">
              <h6 className="text-capitalize mb-3 fw-bold">followed hashtag</h6>

              <div className="col-4">#example-1</div>
              <div className="col-4">#example-2</div>
              <div className="col-4">#example-3</div>
              <div className="col-4">#example-4</div>
              <div className="col-4">#example-5</div>
              <div className="col-4">#example-6</div>
              <div className="col-12 text-center text-capitalize mt-2">
                see all
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12 text-capitalize text-center fw-bold">
                discover more
              </div>
            </div>
            <hr />
            <div className="row">
              <nav className="">
                <ul className="row list-unstyled">
                  <li className="col-2 text-capitalize">
                    <NavLink to="#">about</NavLink>
                  </li>
                  <li className="col-2 text-capitalize">
                    <NavLink to="#">privacy</NavLink>
                  </li>
                  <li className="col-2 text-capitalize">
                    <NavLink to="#">terms</NavLink>
                  </li>
                  <li className="col-4 text-capitalize text-center">
                    <NavLink to="#">help center</NavLink>
                  </li>
                  <li className="col text-capitalize">
                    <NavLink to="#">blog</NavLink>
                  </li>
                  <li className="col text-capitalize">
                    <NavLink to="#">top reviews</NavLink>
                  </li>
                  <li className="col text-capitalize text-center">
                    <NavLink to="#">more</NavLink>
                  </li>
                  <li className="col-5 text-capitalize">
                    copyright &copy; 2021
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
