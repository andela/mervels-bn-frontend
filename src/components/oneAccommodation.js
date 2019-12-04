/* eslint-disable react/no-danger */
/* eslint-disable default-case */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Button from './shared/Button';
import Room from './addRoom';
import { getAccommodation } from '../redux/actions/accommodationsAction';
import SingleRoom from './viewRoom';
import ServicesModal from './servicesModal';
import Amenities from './viewServices';
import ImageGallery from './accomodationImages';
import Map from './mapComponent';

export class OneAccommodation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false,
            isAllowed: false,
            showModal: false,
            submitting: false,
            roomError: null,
            roomsList: ''
        };
    }

    componentDidMount(){
        const { getAccommodation, match } = this.props;
        getAccommodation(match.params.id);
    }

    componentDidUpdate() {
        const { addRooms, user } =this.props;
        if(user) {
            this.handleAuth(user);
        }
        if (addRooms) {
            this.setRoom(addRooms);
        }
    }

    setRoom = (room) => {
        const { roomError, roomsList } = this.state;
        if(room.rooms){
            if(room.rooms !== roomsList) {
                this.setState({ roomsList: room.rooms });
                this.setState({ submitting: false }); 
                this.setState({ isCreating: false });
            }
        } else if (room.error) {
            if(room.error !== roomError) {
                this.setState({ roomError: room.error });
                toast.error(room.error);
                this.setState({ submitting: false });
            }
        }
    }

    toggleCreating = () => {
        const { isCreating } = this.state;
        this.setState({ isCreating: !isCreating });
    }

    toggleModal = () => {
        const { showModal } = this.state;
        this.setState({ showModal: !showModal });
    }

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
        const { isCreating, isAllowed, showModal, roomError, submitting, roomsList } =this.state;
        const { accommodation, match } = this.props;
        const acc = accommodation.accommodation;
        let rooms;
        let location;
        let description;
        let map;
        let amenity = [];
        let service = [];
        if(Object.keys(acc).length !== 0 && acc.constructor === Object) {
            let counter = 0;
            const allRooms = [...acc.Rooms, ...roomsList];
            rooms = allRooms.map((room) =>{
                let classes = [];
                switch (counter) {
                    case 0:
                        classes = ["thir", "third"];
                        break;
                    case 1:
                        classes = ["fir", "first"];
                        break;
                    case 2:
                        classes = ["sec", "second"];
                        break;
                }
                if(counter < 2){
                    counter += 1;
                } else {
                    counter = 0;
                }
                return <SingleRoom 
                name={room.name}
                type={room.type}
                price={room.price}
                classes={classes}
            />;
            });
            location = `${acc.Location.city} ${acc.Location.country}`;
            amenity = acc.amenities;
            service = acc.services;
            description = acc.description;
            map = <Map
            // eslint-disable-next-line react/destructuring-assignment
            google={this.props.google}
            center={acc.maplocations}
            height='200px'
            zoom={15}
            display={null}
        />;
        }
        return (
            <>
            <div className="main-frame">
            <div className="main_container">
        <div className="grid">
            <div className="col-8 details">  
                <div className="top-title">
                    <h2>{acc.name}</h2>
                    <span className="location"><p>{location}</p></span>
                    <div className="rate">
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star" />
                        <span className="fa fa-star" /> 3 star
                    </div>
                </div>  
                <ImageGallery imageUrl={acc.imageUrl}/>
                <div className="describe" dangerouslySetInnerHTML={{ __html: description }} />
                <hr/>
                <div className="amenser">
                    <Amenities amenities={amenity} services={service} />
                </div>
                { showModal ? <ServicesModal amenities={amenity} services={service} closeModal={this.toggleModal} /> : '' }
                <div className="view-all" role="presentation" onClick={() => this.toggleModal()}>View All Amenites and Services</div>
                <hr/>
            </div>
            <div className="col-4 side-info">  
                <span className="hword"><h3>Location</h3></span>
                <div className="map">
                    {map}
                </div>
                <div className="rating">
                    <span className="hword"><h3>Rate Hotel</h3></span>
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                </div>
                <div className="review">
                    <a href="#comment"><h4>Add review</h4></a>
                </div>
                <div className="like">
                    <span className="hword"><h4>Like</h4></span>
                    <i className="fa fa-thumbs-up" /> 80
                </div>
            </div>
        </div>
        <div className="room-container">
            <h3>Rooms</h3>
            { isAllowed ? <div className='grid'>
                <div className='col-12 center'>
                    {roomError || ''}
                </div>
                <div className='col-10'>
                        <Button buttonType='button' ButtonId='create-start' classes={`btn m-top-3 m-bottom-1 ${ isCreating ? 'btn-danger' : 'btn-primary' }`} text={isCreating? '✖ Close' : '✙ Add Rooms'} onClick={this.toggleCreating} />
                    </div>
                    <div className='col-2' />
                    { isCreating? <Room submitting={submitting} submit={this.submit} id={match.params.id} /> : ''}
                </div> : '' }
            <div className="rooms scroll_container">
                {rooms}
            </div>
        </div>
        <div className="comments" id="comment">
            <h3>Comments</h3> 
        </div>
    </div>
    </div>
            </>
        );
    }
}

OneAccommodation.propTypes = {
    getAccommodation: PropTypes.func.isRequired,
    accommodation: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};
  
const mapStateToProps = ({ accommodation, addRooms }) => ({
    accommodation,
    addRooms
});

export default connect(
mapStateToProps,
{ getAccommodation }
)(OneAccommodation);
