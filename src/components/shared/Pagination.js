/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Pagination({requestsPerPage, totalRequests, paginate, currentPage}) {
  const pageNumbers = [];
  for (let index = 1; index <= Math.ceil(totalRequests/requestsPerPage); index++) {
    pageNumbers.push(index);
  }
  return (
    <nav className="a-pagination">
      <ul>
        {pageNumbers.map(number => (
          <li key={number} style={{display: 'inline'}}className={currentPage === number ? "active": "notActive"}>
            <a onClick={()=>paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
