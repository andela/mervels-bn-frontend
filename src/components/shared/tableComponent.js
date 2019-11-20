/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Pagination from "./Pagination";
import useStyles from './iconStyles';
import TooltipComponent from './TooltipComponent';

export default function TableComponent({ items, totalRequests, requestsPerPage, paginate, currentPage, route, viewRequest }) {
    const classes = useStyles();
    return (
        <>
            <table className="table">
                <thead className="table-header">
                    <tr className="table-header-row">
                        <th className="table-header-col">#</th>
                        <th className="table-header-col">Owner</th>
                        <th className="table-header-col">Request date</th>
                        <th className="table-header-col">From</th>
                        <th className="table-header-col">To</th>
                        <th className="table-header-col">Travel Date</th>
                        <th className="table-header-col">Return Date</th>
                        <th className="table-header-col">Status</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                {items.map((request, index) =>
            <tr className="table-row" onClick={viewRequest} id={request.id} key={request.id.toString()}>
                    <td className="table-col" id={request.id}>{index+1}</td>
                    <td className="table-col text-center " id={request.id}>
                        <a href={`/approvals/${request.id}`}>
                            <TooltipComponent passportName={request.passportName} />
                        </a>
                    </td>
                    <td className="table-col" id={request.id}>
                        {moment(request.createdAt).format("MMM Do YY")}
                    </td>
                    <td className="table-col" id={request.id}>{request.from}</td>
                    <td className="table-col" id={request.id}>
                        {request.accommodations.map((item, idx) =>
                            <>
                                { idx > 0 ? <div className='line' /> : '' }
                                <li id={request.id} key={item.id.toString()}>
                                    {item.Location.country},{item.Location.city}
                                </li>
                            </>
                        )}
                    </td>
                    <td className="table-col" id={request.id}>
                        {request.travelDate.map((item, _index) =>
                        <li key={_index.toString()}>
                            {moment(item).format("MMM Do YY")}
                        </li>)}</td>
                    <td className="table-col" id={request.id}>{moment(request.returnDate).format("MMM Do YY") === 'Invalid date' ? '-' : moment(request.returnDate).format("MMM Do YY")}</td>
                    <td className="table-col" id={request.id}>{request.status}
                <div id="circle" className={request.status === 'Approved'? 'approved':'rejected'}></div>
                </td>
                </tr>
            )}
            <tr className="table-col">
                <td colSpan="3">
                    Showing <span className="special">{currentPage}</span> of {Math.ceil(totalRequests/requestsPerPage)}
                </td>
                <td className="table-col">
                <Pagination requestsPerPage={requestsPerPage} currentPage={currentPage} totalRequests={totalRequests} paginate={paginate} route={route}/>
                </td>
            </tr>
                </tbody>
            </table>
        </>
    );
}
