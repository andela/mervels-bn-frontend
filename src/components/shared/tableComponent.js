/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import moment from 'moment';

export default function TableComponent(props) {
    const { items } = props;
    return (
        <>
            <table className="table">
                <thead className="table-header">
                    <tr className="table-header-row">
                        <th className="table-header-col">#</th>
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
            <tr className="table-row" key={request.id.toString()}>
                <td className="table-col">{index+1}</td>
                <td className="table-col">
                    {moment(request.createdAt).format("MMM Do YY")}
                </td>
                <td className="table-col">{request.from}</td>
                <td className="table-col">
                <ul>
                    {request.accommodations.map((item) =>
                    <li key={item.id.toString()}>
                        {item.Location.country},{item.Location.city}
                    </li>)}
                </ul>
                </td>
                <td className="table-col">
                    {request.travelDate.map((item, _index) =>
                    <li key={_index.toString()}>
                        {moment(item).format("MMM Do YY")}
                    </li>)}</td>
                <td className="table-col">{moment(request.returnDate).format("MMM Do YY")}</td>
                <td className="table-col">{request.status}
                <div id="circle"></div>
                </td>
                </tr>
            )}
                </tbody>
            </table>
        </>
    );
}
