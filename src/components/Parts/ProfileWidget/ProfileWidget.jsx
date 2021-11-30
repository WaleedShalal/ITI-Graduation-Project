import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth';
import { auth, db } from '../../../Firebase/Firebase';
import './ProfileWidget.scss';
function ProfileWidget() {
  const [image] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  );
  const [data, setData] = useState({
    imageUrl: image,
  });
  const { user } = useContext(AuthContext);
  useEffect(() => {
    db.collection('users')
      .doc(auth.currentUser?.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setData(snapshot.data());
        }
      });
  }, [data]);
  return (
    <div className='w-100 widget profile-widget text-center'>
      <div className='user-heading round'>
        <Link to='#'>
          <img
            className='rounded-circle'
            src={data.imageUrl ? data.imageUrl : image}
            alt=''
          />
        </Link>
        <h1 className='mt-2'>{user.displayName}</h1>
        <p>{user.email}</p>
      </div>
      <h4 className='widget-title'>
        Your profile has a new Experience section
      </h4>
      <p>
        Showcase your professional experience and education to help potential
        employers and collaborators find and contact you about career
        opportunities.
      </p>
      <Link
        to='/profile'
        className='main-btn'
        href='profile.html'
        title=''
        data-ripple=''>
        view profile
      </Link>
    </div>
  );
}

export default ProfileWidget;
