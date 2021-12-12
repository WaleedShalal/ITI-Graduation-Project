import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import firebase from 'firebase/compat/app';
import { auth, db } from '../../../Firebase/Firebase';
import { AuthContext } from '../../../context/Auth';
import Rate from '../Rate/Rate';
import Emoji from '../Emoji/Emoji';
import avatar from '../../../assets/images/avatar.jpg';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './Post.scss';

function Post({ username, postId, video, caption, rate, userId }) {
  const [isMounted, setMounted] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const { user, data, users } = useContext(AuthContext);
  const [image, setImage] = useState('');
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  useEffect(() => {
    let isMounted = true;
    if (postId && isMounted) {
      db.collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      isMounted = false;
    };
  }, [postId]);
  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);
  const postComment = (e) => {
    e.preventDefault();
    if (isMounted) {
      db.collection('posts').doc(postId).collection('comments').add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: data.id,
        profileImage: data.imageUrl,
      });
      setComment('');
      setShowComments(false);
    }
  };
  const deletePost = () => {
    confirmAlert({
      title: 'Are you sure?',
      message: 'You want to delete this Post?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            db.collection('posts').doc(postId).delete();
            toast.success('Post has been deleted');
          },
        },
        {
          label: 'No',
          onClick: () => toast.error('The post has not been removed'),
        },
      ],
    });
    //
  };

  const onEmojiClick = (event, emojiObject) => {
    emojiObject && setComment(`${comment}${emojiObject?.emoji}`);
  };
  let emojiMenu = useRef(null);
  let emojiIcon = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let eventHandler = (event) => {
      if (
        !emojiMenu.current?.contains(event.target) &&
        !emojiIcon.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', eventHandler);
    return () => {
      document.removeEventListener('mousedown', eventHandler);
    };
  });

  // get user data
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          db.collection('users')
            .doc(userId)
            .get()
            .then((snapshot) => {
              if (snapshot.exists) {
                setImage(snapshot.data().imageUrl);
              }
            });
        }
      });
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.imageUrl]);

  return (
    <div className='main-wraper mt-3'>
      <div className='user-post'>
        <div className='friend-info'>
          <figure>
            <img alt='' src={image ? image : avatar} />
          </figure>
          <div className='friend-name'>
            <div className='more'>
              <div className='more-post-optns'>
                <i className='fas fa-ellipsis-h'></i>
                <ul>
                  {user.uid === userId && (
                    <li>
                      <i className='fas fa-pen-alt'></i>Edit Post
                      <span>Edit This Post within a Hour</span>
                    </li>
                  )}
                  <li>
                    <i className='fas fa-ban'></i>Hide Post
                    <span>Hide This Post</span>
                  </li>
                  {user.uid === userId && (
                    <li onClick={deletePost}>
                      <i className='fas fa-trash'></i>Delete Post
                      <span>If inappropriate Post By Mistake</span>
                    </li>
                  )}
                  <li>
                    <i className='fas fa-flag'></i>Report
                    <span>Inappropriate content</span>
                  </li>
                </ul>
              </div>
            </div>
            <h5>
              <Link title='' to={`/profile/${userId}`}>
                {username}
              </Link>{' '}
            </h5>
            <span>
              <i className='fas fa-globe-asia'></i>published: Sep,15 2020
            </span>
          </div>
          <div className='post-meta'>
            <div className='video'>
              <ReactPlayer width='100%' url={video} controls />
            </div>
            <Rate PostId={postId} rate={rate} />

            <Link to={`/profile/${userId}`} className='post-title'>
              {username}
            </Link>
            <div className='caption'>
              <div>
                Get the product from this link :{' '}
                <Link to={caption}>Product Link</Link>
              </div>
            </div>
            <div className='postFooter'>
              <div className='post_comment'>
                {showComments
                  ? comments.slice(0, 2).map((comment) => (
                      <span key={comment.timestamp}>
                        <figure>
                          <img alt='' src={comment.profileImage} />
                        </figure>
                        <p>
                          <Link
                            to={`/profile/${comment.userId}`}
                            className='me-1'>{`${comment.username}`}</Link>
                          <span>
                            {comment.text.includes('@')
                              ? comment.text.substring(
                                  0,
                                  comment.text.lastIndexOf('@'),
                                )
                              : comment.text}
                            {users.map(
                              (user, index) =>
                                comment.text.includes(user.username) && (
                                  <Link key={index} to={`/profile/${user.id}`}>
                                    @{user.username}
                                  </Link>
                                ),
                            )}
                          </span>
                        </p>
                      </span>
                    ))
                  : comments.map((comment) => (
                      <span key={comment.timestamp}>
                        <figure>
                          <img alt='' src={comment.profileImage} />
                        </figure>
                        <p>
                          <Link
                            to={`/profile/${comment.userId}`}
                            className='me-1'>{`${comment.username}`}</Link>
                          <span>
                            {comment.text.includes('@')
                              ? comment.text.substring(
                                  0,
                                  comment.text.lastIndexOf('@'),
                                )
                              : comment.text}
                            {users.map(
                              (user, index) =>
                                comment.text.includes(user.username) && (
                                  <Link key={index} to={`/profile/${user.id}`}>
                                    @{user.username}
                                  </Link>
                                ),
                            )}
                          </span>
                        </p>
                      </span>
                    ))}
                {comments.length > 3 && showComments && (
                  <p
                    className='showComments'
                    onClick={() => setShowComments(false)}>
                    View {comments.length - 2} more comments
                  </p>
                )}
              </div>
              <form className='comment align-items-center' action=''>
                <i
                  ref={emojiIcon}
                  onClick={() => setIsOpen((isOpen) => !isOpen)}
                  id='comment__emoji'
                  className='emoji__show far fa-smile'></i>
                {isOpen && (
                  <Emoji onEmojiClick={onEmojiClick} emojiMenu={emojiMenu} />
                )}
                <input
                  type='text'
                  placeholder='Add a comment...'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button disabled={!comment} type='submit' onClick={postComment}>
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
