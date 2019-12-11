/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import { Helmet } from "react-helmet";
import bookRoom from '../redux/actions/bookingAction';
import BookCard from './shared/BookCard';
import {getAccommodations, getAccommodation } from '../redux/actions/accommodationsAction';
import AccommodationCard from './shared/accommodationCard';
import getRooms from '../redux/actions/roomsActions';
import {validateBooking} from '../helpers/validator';
import Meta from './shared/meta';

class BookRoom extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            activeLocation: undefined,
            error: {
                details: '',
                class: 'hidden'
            }
        };
    }

    componentWillMount() {
        const {request} = this.props;
        const { accommodations } = request.data[0];
        const oneReq = request.data[0];
        const requests = [];
        accommodations.forEach((acc, index) => {
            const req1 = {};
            const {travelDate, returnDate, accommodations} = oneReq;
            req1.travelDate = travelDate[index];
            req1.returnDate = returnDate;
            req1.accommodation = accommodations[index].name;
            req1.location = accommodations[index].Location;
            req1.accommodationId = accommodations[index].id;
            requests.push(req1);
        });
        this.setState({trips: requests});
        const { getAccommodations, user, getRooms } = this.props;
        getAccommodations({role: user });
        getRooms();
    }

    async componentWillReceiveProps(nextProps) {
        const {bookedroom, history} = nextProps;
        if(bookedroom.data || bookedroom.error){
            const {data, error} = bookedroom;
            if(data) {
                toast.success(data.message);
                history.push('/requests');
            } else {
                const {status, message} = error;
                if(status===422) {
                    toast.error("Check your inputs");
                } else if(status === 401) {
                    toast.error("The current session is expired. Login");
                    localStorage.removeItem('bareFootToken');
                    history.push('/login');
                } else if(status === 403) {
                    toast.error(message);
                    history.push('/home');
                } else if(status === 404) {
                    toast.error(message);
                    history.push('/requests');
                } else if(status === 409){
                    toast.error(message);
                    history.push('/home');
                } else {
                    toast.error(message);
                    history.push('/home');
                }
            }
        }
    }

    handleImageClick = async (id, name) => {
        const {activeLocation, trips} = this.state;
        const value = name;
        if(activeLocation === undefined) {
            const activeLoc = trips[0].location.id;
            this.setState({activeLocation: activeLoc});
        }

        // find whic array contsins the location
        
        let parent;
        trips.forEach((trip, index) => {
            if(trip.location.id === activeLocation) {
                parent = index;
            }
        });

        trips[parent] = {...trips[parent], accommodation: value};
        this.setState({trips});
            const {Allaccommodations, allRooms} = this.props;
            const accommodation = Allaccommodations.accommodations.find((acc) => acc.name === value);
            const accommodationId = accommodation.id;
            const availableRooms = allRooms.data.filter((room) => room.accommodationId === accommodationId);
            trips[parent] = {...trips[parent], accommodationId, availableRooms};
            this.setState({trips});  
    }

    handleChange = async ({target}) => {
        const parent =  target.attributes.unique.value;
        const {trips} = this.state;
        const {value} = target;
        if(target.name === 'accommodation' && value !== 'Select Accommodation') {
            trips[parent] = {...trips[parent], [target.name]: value};
            this.setState({trips});
            this.setState({selectedAcommodation: value});
            const {Allaccommodations, allRooms} = this.props;
            const accommodation = Allaccommodations.accommodations.find((acc) => acc.name === value);
            const {id} = accommodation;
            const availableRooms = allRooms.data.filter((room) => room.accommodationId === id);
            trips[parent] = {...trips[parent], accommodationId: id, availableRooms};
            this.setState({trips});
        } else if(target.name==='room') {
            const {activeLocation, trips, possibleAccommodations} = this.state; // active Location is shitting me.
            const selectedAcommodation = trips[parent].accommodation;
            const {allRooms} = this.props;
            const activeAccommodation = possibleAccommodations.find((acc)=> acc.locationId === activeLocation && acc.name === selectedAcommodation); // should use possibleAccommodations
            const {id} = activeAccommodation; // this might be the mistake
            if(value !== 'Select Room') {
            const activeRoom = allRooms.data.find((room) => {
                return room.accommodationId === id && room.name === value;
            });          
            const roomId = activeRoom.id;
            trips[parent] = {...trips[parent], [target.name]: roomId};
            this.setState({trips});
            }
        } else {
            trips[parent] = {...trips[parent], [target.name]: value};
            this.setState({trips});
        }
        
    }


    handleFocus = (locationId, possibleAccommodations) => {
        const {activeLocation} = this.state;
        if(locationId!==activeLocation) {
            this.setState({activeLocation: locationId, possibleAccommodations});
        }
    }

    handleCancel = () => {
       const {toggleBooking} = this.props;
       toggleBooking();
    }

    handleSubmit = async () => {

        const {trips} = this.state;
        const {bookRoom, request} = this.props;
        const requestId = request.data[0].id;
        const bookDetails =[];
        const toValidate =[];
        trips.forEach((trip) => {
            const {checkIn, checkOut, accommodation, room, travelDate, returnDate} = trip;
            bookDetails.push({checkIn, checkOut, accommodation, room});
            toValidate.push({checkIn, checkOut, accommodation, room, travelDate, returnDate}); 
        });
        const error = validateBooking(toValidate);
        if(!error) {
            bookRoom(bookDetails , requestId);
        } else {
            this.setState({error: {details: error, class: 'visible'}});
        }

    }

    render() {
        const {classes, Allaccommodations, allRooms } = this.props;
        const nonBookedRooms = allRooms.data.filter((room) => room.status === 'Available');
        const {trips, possibleAccommodations, availableRooms, selectedAcommodation, error} = this.state;
        const acommodations = Allaccommodations.accommodations.filter((acc) => acc.status === 'Available');
        const fLocId = trips[0].location.id;
        const firstAccommodations= acommodations.filter((acc) => acc.locationId === fLocId );
        const selectedRooms = [];
        trips.forEach((trip)=>{
            selectedRooms.push(trip.room);
        });
        const filteredAcoomodations = possibleAccommodations || firstAccommodations;

        return ( <div className = {`${classes}`} >
                <Meta  title="Booking-Rooms"/>
                <div className="bg-img" />
                <div className="black-container black-short" />
                <p className='accommodation-title p-top-5 m-bottom-3'>Booking</p>
                <div className = "bookcards-container">
                    {trips.map((trip, index) => (<BookCard trips={trips} handleGetRooms={this.handleGetRooms} selectedRooms={selectedRooms} availableRooms={availableRooms} displayRooms={this.displayRooms} rooms ={nonBookedRooms} handleFocus={this.handleFocus} key={trip.location.id} locationId={trip.location.id} handleChange={this.handleChange} parent={index} accommodations={acommodations} accommodation={selectedAcommodation || trip.accommodation} returnDate={trip.returnDate} travelDate={trip.travelDate} destination={`${trip.location.city} ${trip.location.country}`}/>))}
                </div>
                <div className={`${error.class} book-error error-multi-city`}>
                    {error.details}
                </div>
                <div className = "book-buttons-container">
                    <button id="cancel-booking" type = "button"className = "btn btn-danger" onClick={this.handleCancel}> Cancel </button>
                    <button id="submit-booking" type = "submit" className = "btn btn-secondary" onClick={this.handleSubmit}> Submit </button> 
                </div>
                <div className = "accommodations-container">
                    {filteredAcoomodations.map((acc) => (<AccommodationCard handleImageClick={this.handleImageClick} name = {acc.name} url={acc.imageUrl} id={acc.id}/>))}
                </div>
            </div>
        );
    }
};

BookRoom.propTypes = {
    request: PropTypes.object.isRequired,
    classes: PropTypes.string.isRequired,
    getAccommodations: PropTypes.func.isRequired,
    Allaccommodations: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    getRooms: PropTypes.func.isRequired,
    allRooms: PropTypes.object.isRequired,
    toggleBooking: PropTypes.object.isRequired,
    bookRoom: PropTypes.func.isRequired,
    bookedroom: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ request, accommodations, accommodation, profile, allRooms, bookedroom }) => {
    return {
        request,
        Allaccommodations: accommodations,
        accommodation,
        user: profile.data.role,
        allRooms,
        bookedroom
    };
};

const mapDispatchToProps = {
    bookRoom,
    getAccommodations,
    getAccommodation,
    getRooms,
};

export {BookRoom};

export default connect(mapStateToProps, mapDispatchToProps)(BookRoom);