import React, { useEffect, useState } from "react";
import Post from "../../Parts/Post/Post";
import { db } from "../.../../../../Firebase/Firebase";
import VideoUpload from "../../Parts/VideoUpload/VideoUpload";
import PeopleYouKnow from "../../Parts/PeopleYouKnow/PeopleYouKnow";
import ProfileWidget from "../../Parts/ProfileWidget/ProfileWidget";
import Stories from "../../Parts/Stories/Stories";
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
          <div className="col-3 pro-widget">
            {" "}
            <ProfileWidget />
          </div>
          <div className="col-6">
            <Stories />
            <VideoUpload username={userName} />
          </div>
          <div className="col-3 PeopleYouKnow-widget">
            {" "}
            <PeopleYouKnow />
          </div>
          <div className="offset-3 col-6">
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
    </section>
  );
}

export default Home;
