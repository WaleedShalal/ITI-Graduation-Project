import React, { useState } from 'react';
import { db } from '../../../Firebase/Firebase';
import './Stars.scss';

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
};

function Stars({ PostId, review }) {
  const [currentValue, setCurrentValue] = useState(review);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const handleClick = (value) => {
    if (!review) {
      setCurrentValue(value);
      db.collection('posts').doc(PostId).update({
        rate: value,
      });
    }
  };
  const handleMouseOver = (newHoverValue) => {
    if (!review) {
      setHoverValue(newHoverValue);
    }
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <ul className='stars mb-0 fs-4'>
      {stars.map((_, index) => {
        return (
          <li
            key={index}
            style={{
              color:
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey,
            }}
            onMouseLeave={handleMouseLeave}
            onMouseOver={() => handleMouseOver(index + 1)}
            onClick={() => handleClick(index + 1)}>
            <i className='fas fa-star'></i>
          </li>
        );
      })}
    </ul>
  );
}

export default Stars;
