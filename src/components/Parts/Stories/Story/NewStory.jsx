import React from 'react';

function NewStory({ image, name, storyNum }) {
  return (
    <>
      <li className='list__item'>
        <figure className='item__pigPic mb-0 '>
          <img className='w-100' src={image} alt='' />
        </figure>
        <figure className='item__smallPic mb-0 '>
          <img className='rounded-circle' src={image} alt='' />
        </figure>
        <div className='item__name text-center py-1'>
          {!storyNum && (
            <div className='item__add d-flex justify-content-center align-items-center'>
              <i className='fas fa-plus'></i>
            </div>
          )}
          <h6 className='text-capitalize text-white mb-0'>
            {storyNum > 0 ? name : 'add your story'}
          </h6>
        </div>
      </li>
    </>
  );
}

export default NewStory;
