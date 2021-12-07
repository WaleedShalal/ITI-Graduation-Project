import React, { useContext, useEffect, useState } from "react";
import Post from "../../Parts/Post/Post";
import { db } from "../.../../../../Firebase/Firebase";
import VideoUpload from "../../Parts/VideoUpload/VideoUpload";
import PeopleYouKnow from "../../Parts/PeopleYouKnow/PeopleYouKnow";
import ProfileWidget from "../../Parts/ProfileWidget/ProfileWidget";
import Stories from "../../Parts/Stories/Stories";
import Time from "../../Parts/Time/Time";
import Loader from "../../Parts/Loader/Loader";
import Footer from "../../Parts/Footer/Footer";
import "./Home.scss";
import { AuthContext } from "../../../context/Auth";
function Home() {
  const [posts, setPosts] = useState([]);
  const { user, data, users } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      db.collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
          );
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return data && users.length && user ? (
    <section className="home__page mt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-3">
            <ProfileWidget />
          </div>
          <div className="col-12 col-lg-6">
            <Stories />
            <VideoUpload />
            {posts.length ? (
              posts.map(({ id, post }) => {
                return (
                  <Post
                    key={id}
                    postId={id}
                    username={post.username}
                    userId={post.userId}
                    video={post.videoUrl}
                    caption={post.caption}
                    rate={post.rate}
                  />
                );
              })
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <div
                  className="spinner-border"
                  style={{ color: "#088dcd" }}
                  role="status"
                ></div>
              </div>
            )}
          </div>
          <div className="col-12 col-lg-3">
            <div className="widget stick-widget">
              <h4 className="widget-title text-center">Who's follownig</h4>
              <ul className="followers">
                {users.map((user) => {
                  return (
                    <PeopleYouKnow
                      key={user.id}
                      userId={user.id}
                      username={user.userName}
                      email={user.email}
                    />
                  );
                })}
              </ul>
            </div>
            <Time />
            <Footer />
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loader />
  );
}

export default Home;
