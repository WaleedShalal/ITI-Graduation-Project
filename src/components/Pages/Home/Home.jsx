import React, { useEffect, useState } from "react";
import Post from "../../Parts/Post/Post";
import { db } from "../.../../../../Firebase/Firebase";
import VideoUpload from "../../Parts/VideoUpload/VideoUpload";
import PeopleYouKnow from "../../Parts/PeopleYouKnow/PeopleYouKnow";
import ProfileWidget from "../../Parts/ProfileWidget/ProfileWidget";
import Stories from "../../Parts/Stories/Stories";
import Time from "../../Parts/Time/Time";
import Footer from "../../Parts/Footer/Footer";
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
    <section className="home__page mt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-3">
            <ProfileWidget />
          </div>
          <div className="col-12 col-lg-6">
            <Stories />
            <VideoUpload username={userName} />
            {posts.map(({ id, post }) => {
              return (
                <Post
                  key={id}
                  postId={id}
                  username={post.username}
                  video={post.videoUrl}
                  caption={post.caption}
                  rate={post.rate}
                />
              );
            })}
          </div>
          <div className="col-12 col-lg-3">
            <PeopleYouKnow />
            <Time />
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
