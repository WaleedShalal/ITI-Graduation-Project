import React from 'react';
import { useLocation } from 'react-router-dom';
import NewStory from './Story/NewStory';
import img1 from '../../../assets/images/stories/img1.jpg';
import img2 from '../../../assets/images/stories/img2.jpg';
import img3 from '../../../assets/images/stories/img3.jpg';
import img4 from '../../../assets/images/stories/img4.jpg';
import img5 from '../../../assets/images/stories/img5.jpg';
import img6 from '../../../assets/images/stories/img6.jpg';
import img7 from '../../../assets/images/stories/img7.jpg';
import img_1 from '../../../assets/images/highlights/img1.jfif';
import img_2 from '../../../assets/images/highlights/img2.png';
import img_3 from '../../../assets/images/highlights/img3.jfif';
import img_4 from '../../../assets/images/highlights/img4.jfif';
import img_5 from '../../../assets/images/highlights/img5.png';
import img_6 from '../../../assets/images/highlights/img6.png';
import img_7 from '../../../assets/images/highlights/img7.png';

import './Stories.scss';

function Stories({ id }) {
  const { pathname } = useLocation();

  const storyData =
    pathname !== `/profile/${id}`
      ? [
          { name: 'waleed elbana', image: img1 },
          { name: 'laura chouette', image: img2 },
          { name: 'avi richards', image: img3 },
          { name: 'vladimir tsokalo', image: img4 },
          { name: 'ilya gorborukov', image: img5 },
          { name: 'jonathan borba', image: img6 },
          { name: 'tom ramalho', image: img7 },
        ]
      : [
          { name: 'max fashion', image: img_1 },
          { name: 'h&m', image: img_5 },
          { name: 'lacoste', image: img_3 },
          { name: 'center point', image: img_2 },
          { name: 'zara', image: img_6 },
          { name: 'tommy', image: img_7 },
          { name: 'noon', image: img_4 },
        ];
  return (
    <div className='new__stories p-3'>
      {pathname !== `/profile/${id}` ? (
        <h6 className='text-capitalize text-dark mb-3'>recent stories</h6>
      ) : (
        <h6 className='text-capitalize text-dark mb-3'>highlights</h6>
      )}
      <ul className='stories__listItems list-unstyled d-flex mb-0'>
        {storyData.map((data, index) => {
          return (
            <NewStory
              key={index}
              image={data.image}
              name={data.name}
              storyNum={index}
              id={id}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Stories;
