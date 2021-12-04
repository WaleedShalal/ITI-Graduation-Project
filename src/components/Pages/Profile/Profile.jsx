import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../../Parts/Post/Post";
import Stars from "../../Parts/Stars/Stars";
import { db } from "../.../../../../Firebase/Firebase";
import NoPosts from "../../Parts/Post/NoPosts";
import Stories from "../../Parts/Stories/Stories";
import Loader from "../../Parts/Loader/Loader"
import ImageUpload from "./../../Parts/VideoUpload/VideoUpload";
import avatar from "./../../../assets/images/avatar.jpg";
import "./Profile.scss";
import { AuthContext } from "../../../context/Auth";

function Profile() {
  const { user ,users } = useContext(AuthContext);
  const param = useParams();
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState({
    imageUrl: avatar,
    email:""
  });
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        var posts = snapshot.docs
          .filter(function (doc) {
            if (doc.data().userId !== param.id) {
              return false; // skip
            }
            return true;
          })
          .map(function (doc) {
            return { id: doc.id, post: doc.data() };
          });
        setPosts(posts);
      })
    }
      return ()=>{isMounted = false}
  },[param.id]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      db.collection("users")
      .doc(param.id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setData(snapshot.data());
        }
      });
    }
  return ()=>{isMounted = false}
  },[param.id]);

  return (
    data.email && users.length && user ?
    <div className='profile pt-5'>
      <div className='container'>
        <div className='row profile__wrapper flex-column-reverse flex-lg-row'>
          <div className='col-lg-7 col-12'>
            <Stories id={param.id} />
            <ImageUpload />
            <div className='content-page w-100'>
              {posts.length > 0 ? (
                posts.map(({ id, post }) => {
                  return (
                    <Post
                      key={id}
                      postId={id}
                      username={post.username}
                      video={post.videoUrl}
                      caption={post.caption}
                      rate={post.rate}
                      userId = {post.userId}
                    />
                  );
                })
              ) : (
                <NoPosts />
              )}
            </div>
          </div>
          <div className="user-info offset-lg-1 col-lg-4 col-12 p-3">
            <div className="d-flex flex-column justify-content-center align-items-center mb-5">
              <h5 className="text-dark">
                {data.email.substring(0, data.email.lastIndexOf("@")).toUpperCase()}{" "}
                <i className="user__badge far fa-id-badge"></i>
              </h5>
              <img src={data.imageUrl ? data.imageUrl : avatar} alt="profile" />
              <div className="rate d-flex">
                <Stars review={4} />
                <span className='rate-number text-dark'>4.0</span>
              </div>
              <button className='user__followBtn btn btn-outline-primary text-capitalize mt-2'>
                follow
              </button>
            </div>
            <div className='user__description text-dark px-2 mb-3'>
              <p className='text-capitalize mb-0'>job : front-end developer</p>
              <p className='text-capitalize mb-0'>
                hobbies : travelling - watching animation
              </p>
              <p className='text-capitalize mb-2'>age : 26</p>
              <div className=' Ecommerce-Link-site w-100 text-center mb-2'>
                <Link className='text-primary text-capitalize' to='/products/1'>
                  e-commerce page
                </Link>
                <span className='text-primary'>
                  <i className='fa__item fas fa-shopping-cart'></i>
                </span>
              </div>
            </div>
            <ul className='description ps-0'>
              <li className='active'>
                <a className='text-dark' href='/blog/mohamedebrahimdiab'>
                  <span className='text-dark'>Posts</span>100
                </a>
              </li>
              <li className='jk3gM'>
                <a
                  className='text-dark'
                  href='/blog/mohamedebrahimdiab/followers'>
                  <span className='text-dark'>Followers</span>
                  <span className='KlOKT text-dark'>20K</span>
                </a>
              </li>
              <li className='jk3gM'>
                <a
                  className='text-dark'
                  href='/blog/mohamedebrahimdiab/followers'>
                  <span className='text-dark'>Following</span>
                  <span className='KlOKT text-dark'>400</span>
                </a>
              </li>
            </ul>
            <ul className='reviews__controls list-unstyled d-flex flex-column '>
              <li className='text-capitalize d-flex justify-content-between align-items-center w-100 mb-2'>
                <span>filter by</span>
                <i className='fas fa-filter'></i>
              </li>
              <li className='text-capitalize d-flex justify-content-between align-items-center w-100 mb-2'>
                <span>sort by</span>
                <i className='fas fa-sort'></i>
              </li>
            </ul>
            <ul className='profile__setting list-unstyled d-flex flex-column'>
              <li className='text-capitalize d-flex justify-content-between  align-items-center w-100 mb-2'>
                <span>edit badge</span>
                <i className='far fa-edit'></i>
              </li>
              <li className='text-capitalize d-flex justify-content-between  align-items-center w-100 mb-2'>
                <span>saved reviews</span>
                <i className='far fa-bookmark'></i>
              </li>
              <li className='text-capitalize d-flex justify-content-between  align-items-center w-100 mb-2'>
                <span>tagged</span>
                <i className='fas fa-tag'></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>:  <Loader />
  );
}

export default Profile;
