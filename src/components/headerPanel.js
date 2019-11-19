/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';


export const  HeaderPanel = ({ title, onClick, onChange, holder, type, search }) => {
  return (
    <div className="panel">
    <h4 className="title">{title}</h4>
    <div className="page">Page</div>
    <div className="others">
        <input type="number" name="requestsPerPage" className="input select" onChange={onChange} />
    </div>
    <div className="word" id="all" role="presentation" onClick={() => onClick('ALL')} >ALL</div>
    <div className="word" id="pending" role="presentation" onClick={() => onClick('PENDING')} >PENDING</div>
    <div className="word" id="past" role="presentation" onClick={() => onClick('PAST')}>PAST</div>
    <div><input type="button" value="NEW REQUEST" className="bnn btn btn-secondary" /></div>
    <div>
    <table className="search-table">
        <tbody>
            <tr>
                <td className="search-sel">
                    <select name="parameter" id="catsel" onChange={onChange}>
                        <option>Search by</option>
                        <option value="accommodation" >Accommodation</option>
                        <option value="id" >Request ID</option>
                        <option value="returnDate" >Return Date</option>
                        <option value="travelDate" >Travel Date</option>
                        <option value="reason" >Reason</option>
                        <option value="requester" >Name</option>
                        <option value="from" >From</option>
                        <option value="destination" >Destination</option>
                        <option value="status" >Status</option>
                    </select>
                </td>
                <td><input type={type} name="query" className="input search" placeholder={holder} onChange={onChange} /></td>
                <td className="">
                    <input type="submit" onClick={() => search()} id="search" className="btn btn-primary searchbtn" value="Go" />
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
  );
};

HeaderPanel.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    holder: PropTypes.string,
    type: PropTypes.string
};

HeaderPanel.defaultProps = {
    title: 'REQUESTS',
    holder: 'search',
    type: 'search'
};
export default HeaderPanel;
