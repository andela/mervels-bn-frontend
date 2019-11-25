/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Button from './shared/Button';
import AddAccommodation from './createAccommodation';
import SingleAccommodation from './accommodation';
import { getAccommodations } from '../redux/actions/accommodationsAction';
import Pagination from "./shared/Pagination";
import { getLocations } from '../redux/actions/requestActions';

export class Accommodations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            requestsPerPage: 3,
            isCreating: false,
            submitting: false,
            accError: null,
            isAllowed: false
        };
    }

    componentDidMount() {
        const { getAccommodations, getLocations, user } = this.props;
        const currentUser = {
            role: user.userRoles,
            id: user.id
        };
        getAccommodations(currentUser);
        getLocations();
    }

    componentDidUpdate() {
        const { addAccommodation, user } = this.props;
        if(user) {
            this.handleAuth(user);
        }
        if(addAccommodation) {
            this.setAccommodation(addAccommodation);
        }
    }

    setAccommodation = (acc) => {
        const { history } = this.props;
        if(acc.accommodation) {
            history.push(`/accommodation/${acc.accommodation.id}`);
        } else if(acc.error) {
            const { accError } = this.state;
            if(acc.error !== accError) {
                this.setState({ accError: acc.error });
                toast.error(acc.error);
                this.setState({ submitting: false });
            }
        }
    }

    toggleCreating = () => {
        const { isCreating } = this.state;
        this.setState({ isCreating: !isCreating });
    }

    setCurrentPage = (pageNumber) =>{
        this.setState({
            currentPage: pageNumber,
        });
    }

    paginate = (pageNumber) => this.setCurrentPage(pageNumber);

    submit = () => {
        this.setState({ submitting: true }); 
    }

    handleAuth = (user) => {
        const { isAllowed } = this.state;
        const allowed = ['Accommodation Supplier', 'Travel Administrator'];
        if(isAllowed !== true) {
            if(allowed.includes(user.userRoles)){
                this.setState({
                    isAllowed: true
                });
            }
        }
    }

    render() {
        const { isCreating, currentPage, accError, submitting, isAllowed } = this.state;
        const { accommodations, locations } = this.props;
        let { requestsPerPage } = this.state;
        let total = [];
        if(!requestsPerPage || requestsPerPage <= 0) {
            requestsPerPage = 1;
        }
        const indexOfLastRequest = currentPage * requestsPerPage;
        const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
        total = accommodations.accommodations;

        const items = total.slice(indexOfFirstRequest, indexOfLastRequest);
        const totalRequests = total.length;

        const button = <Button buttonType='button' ButtonId='create-start' classes={`btn m-top-3 m-bottom-1 ${ isCreating ? 'btn-danger' : 'btn-primary' }`} text={isCreating? '✖ Close' : '✙ New Accommodation'} onClick={this.toggleCreating} />;
        
        return (
            <>
                <div className='grid'>
                    <div className='col-10 offset-3'>
                        {isAllowed ? button : '' }
                    </div>
                    <div className='col-2' />
                        { isCreating? <AddAccommodation locations={locations} submit={this.submit} submitting={submitting} /> : ''}
                    <div className='col-12 center text-danger'>
                        {accError || ''}
                    </div>
                </div>
                <div className="bg-img" />
                <div className="grid">
                    <div className="col-3 acc-search" />
                    <div className="col-6 all-container">
                        {items.map((acc) =>
                            <SingleAccommodation 
                                name={acc.name}
                                likes={acc.likes}
                                rooms={acc.rooms}
                                rating = {Math.round( acc.averageRating * 10 ) / 10}
                                location={acc.location}
                                id={acc.id}
                                key={acc.id}
                                imageUrl={acc.imageUrl}
                                description={acc.description}
                            />
                        )}
                    </div>
                <div className='col-12 center'>
                <table >
                    <tbody>
                    <tr className="table-col">
                <td colSpan="3">
                    Showing <span className="special">{currentPage}</span> of {Math.ceil(totalRequests/requestsPerPage)}
                </td>
                <td className="table-col">
                <Pagination requestsPerPage={requestsPerPage} currentPage={currentPage} totalRequests={totalRequests} paginate={this.paginate}/>
                </td>
                </tr>
                </tbody>
                </table>
                </div>
                </div>
            </>
        );
    }
}

Accommodations.propTypes = {
    getAccommodations: PropTypes.func.isRequired,
    accommodations: PropTypes.object.isRequired,
    addAccommodation: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    getLocations: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ accommodations, addAccommodation, request }) => ({
accommodations,
addAccommodation,
locations: request.locations
});

export default connect(
mapStateToProps,
{ getAccommodations, getLocations }
)(Accommodations);
