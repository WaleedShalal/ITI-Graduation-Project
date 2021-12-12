import React from 'react';
import './Post.scss';

function NoPosts() {
  return (
    <div className='post'>
      <div className='noposts'>
        <i className='fas fa-video-slash fa-3x mb-3'></i>
        No posts available
        <div className='note'>
          <p className='mt-2'>can you make a post.</p>
        </div>
      </div>
    </div>
  );
}

export default NoPosts;
