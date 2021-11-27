import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({ dataPerPage, totalData, paginate }) {
  const pagesNumber = [];
  for (let i = 1; i <= Math.floor(totalData / dataPerPage); i++) {
    pagesNumber.push(i);
  }
  return (
    <ul className='pagination d-flex justify-content-center'>
      {pagesNumber.map((number) => {
        return (
          <li key={number} className='page-item'>
            <Link
              onClick={() => paginate(number)}
              className='text-dark page-link'
              to={`/products/${number}`}>
              {number}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Pagination;
