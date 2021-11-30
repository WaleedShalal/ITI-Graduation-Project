import React from 'react';
import NewStory from './Story/NewStory';
import img1 from '../../../assets/images/stories/img1.jpg';
import img2 from '../../../assets/images/stories/img2.jpg';
import img3 from '../../../assets/images/stories/img3.jpg';
import img4 from '../../../assets/images/stories/img4.jpg';
import img5 from '../../../assets/images/stories/img5.jpg';
import img6 from '../../../assets/images/stories/img6.jpg';
import img7 from '../../../assets/images/stories/img7.jpg';

import './Stories.scss';

function Stories() {
  const storyData = [
    { name: 'waleed elbana', image: img1 },
    { name: 'laura chouette', image: img2 },
    { name: 'avi richards', image: img3 },
    { name: 'vladimir tsokalo', image: img4 },
    { name: 'ilya gorborukov', image: img5 },
    { name: 'jonathan borba', image: img6 },
    { name: 'tom ramalho', image: img7 },
  ];
  return (
    <div className='new__stories p-3'>
      <h6 className='text-capitalize text-dark mb-3'>recent stories</h6>
      <ul className='stories__listItems list-unstyled d-flex mb-0'>
        {storyData.map((data, index) => {
          return (
            <NewStory
              key={index}
              image={data.image}
              name={data.name}
              storyNum={index}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Stories;
