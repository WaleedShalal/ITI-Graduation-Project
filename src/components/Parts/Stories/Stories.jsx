import React from 'react';
import NewStory from './Story/NewStory';
import './Stories.scss';

function Stories() {
  const storyData = [1, 2, 3, 4, 5, 6];
  return (
    <div className='new__stories p-3 col-7'>
      <h6 className='text-capitalize text-dark mb-3'>recent stories</h6>
      <ul className='stories__listItems list-unstyled d-flex mb-0'>
        {storyData.map((data, index) => {
          return <NewStory key={index} data={data} storyNum={index} />;
        })}
      </ul>
    </div>
  );
}

export default Stories;
