/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Pagination({requestsPerPage, totalRequests, paginate, currentPage, route}) {
  const pageNumbers = [];
  for (let index = 1; index <= Math.ceil(totalRequests/requestsPerPage); index++) {
    pageNumbers.push(index);
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? "active": "notActive"}>
            <a onClick={()=>paginate(number)} href={`${route}/#!`}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
