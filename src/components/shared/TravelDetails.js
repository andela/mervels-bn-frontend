/* eslint-disable react/prop-types */
import React from 'react';

const TravelDetails = (props) => {
    const { request, classes } = props; // request is the object from the backend which contain the details of request see the bottom to see the form
    const {travelDate, accommodations} = request;
    const details = accommodations.map((element, index) => ({traveldate: travelDate[index], destination: `${element.Location.country} ${element.Location.city}` , accommodation: element.name}));
    const {createdAt, status, returnDate, from, passportName } = request;
    const requestDate = createdAt.split('T')[0] || createdAt;
    const tbody= [{ value: requestDate, label: 'Request Date' }, { value: status, label: 'Status' }, { value: returnDate, label: 'Return Date' }, { value: from, label: 'From' }];
    return ( <div className={`req-details ${classes} p-left-1 p-right-1`}>
        <table>
            <thead>
                <tr>
                    <th className="req-header">{passportName || 'Travel Request'}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {tbody.map((element) => element.value ? <p key={element.label} className="req-elem"> {`${element.label}: ${element.value}`}</p> : '')}
                    </td>
                </tr>
                { details.map((detail) => {
                    const tbody2= [{value: detail.traveldate, label: 'Travel Date'}, {value: detail.destination, label: 'Destination'}, {value: detail.accommodation, label: 'Accommodation'}];
                    return(<tr key={detail.traveldate}>
                        <td>
                        { tbody2.map((elem) =>(<p key={elem.label} className="req-elem">{`${elem.label}: ${elem.value}`}</p>)) }
                        </td>
                </tr>);}) }
            </tbody>
        </table>
    </div> );
};
 
export default TravelDetails;
