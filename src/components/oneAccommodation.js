/* eslint-disable no-fallthrough */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-case-declarations */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable default-case */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { parse } from "query-string";
import Rating from 'react-rating';
import Button from './shared/Button';
import Room from './addRoom';
import { getAccommodation } from '../redux/actions/accommodationsAction';
import ServicesModal from './servicesModal';
import Amenities from './viewServices';
import Meta from './shared/meta';
import ImageGallery from './accomodationImages';
import Map from './mapComponent';
import LikeComponent from "./LikeComponent";
import ReviewComponent from "./ReviewComponent";
import OneReviewComponent from "./OneReviewComponent";
import RatingCompoment from './shared/ratingCompoment';
import { enhanceRooms } from '../helpers/RoomClasses';

export class OneAccommodation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false,
            isAllowed: false,
            showModal: false,
            submitting: false,
            roomError: null,
            roomsList: '',
            liked: false,
            reviewError: false
        };
    }

    async componentDidMount() {
      const { getAccommodation, match, location } = this.props;
      if (parse(location.search).review === "success") {
        this.onReviewSuccess();
      }
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

    async componentWillReceiveProps(nextProps) {
      const { like, feedback } = nextProps;
      if (like) {
        switch (like.status) {
          case "like_success":
            break;
          case "like_error":
            const { liked: likeStatus } = this.state;
            const errorMessage = likeStatus ? "unlike" : "like";
            toast.error(`Could not ${errorMessage} the accommodation`);
            break;
          default:
            break;
        }
      }
      if (feedback) {
        switch (feedback.status) {
          case "feedback_success":
            const { match } = nextProps;
            window.location.replace(`/accommodation/${match.params.id}?review=success`);
            break;
          case "feedback_error":
            toast.error(`Couldn't add that review`);
            this.setState({ reviewError: true });
            break;
          default:
            break;
        }
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
    
    getUpdate = () => {
        const { getAccommodation, match } = this.props;
        getAccommodation(match.params.id);
    }

    onReviewSuccess = async () => {
      const { match, history } = this.props;
      toast.success("Review added successfully");
      history.push(`/accommodation/${match.params.id}#reviews`);
    };

    render() {
        const { isCreating, isAllowed, showModal, roomError, submitting, roomsList, reviewError } =this.state;
        const { accommodation, match } = this.props;
        const acc = accommodation.accommodation;
        let rooms;
        let location;
        let description;
        const rating = acc.Ratings;
        let map;
        let like;
        let amenity = [];
        let service = [];
        if(Object.keys(acc).length !== 0 && acc.constructor === Object) {
            const allRooms = [...acc.Rooms, ...roomsList];
            rooms = enhanceRooms(allRooms);
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

            like = <LikeComponent
                accommodation={acc.id}
                likes={acc.likes}
                liked={acc.liked}
            />;    
        }
        const addReview = (
          <ReviewComponent reviewError={reviewError} accommodation={acc.id} />
        );
    
        let reviewsDisplay;
        if (acc.Feedbacks) {
          reviewsDisplay = acc.Feedbacks.map((review, index) => (
            <OneReviewComponent key={index} review={review} />
          ));
        } 
        return (
            <>
            <Meta title="Accommodation"/>
            <div className="main-frame">
            <div className="main_container">
        <div className="grid grid-sm">
            <div className="col-8  col-sm-12 details">  
                <div className="top-title">
                    <h2>{acc.name}</h2>
                    <span className="location"><p>{location}</p></span>
                    <div className="rate">
                    <Rating
                        className="rating-container"
                        initialRating={(rating === undefined) ? 0: rating.averageRating}
                        readonly
                        emptySymbol="fa fa-star-o fa-lg"
                        fullSymbol="fa fa-star fa-lg"
                        /> {(rating === undefined) ? 0: rating.averageRating} star
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
            <div className="col-4 col-sm-12 side-info">  
                <span className="hword"><h3>Location</h3></span>
                <div className="map">
                    {map}
                </div>
                <div className="rating center">
                    <span className=""><h3>Rate Hotel</h3></span>
                    <RatingCompoment userRating={rating} accommodationId={this.props.match.params.id} getUpdate={this.getUpdate} />
                </div>
                <div className="review m-left-1 grid">
                  <div className="col-6">
                    <a href="#review">
                      <h4>✙ Write a Review</h4>
                    </a>
                  </div>
                  <div className="col-6">
                    <a href="#reviews">
                      <h4>All Reviews</h4>
                    </a>
                  </div>
                </div>
                <div className="like">{like}</div>
            </div>
        </div>
        <div className="room_container">
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
        <div className="review" id="review">
          <h2 className="m-left-1 p-top-2 reviews-title">Reviews</h2>
          {addReview}
        </div>
        <div className="review m-bottom-5 p-top-2" id="reviews">
          <em className="m-left-1">All reviews...</em>
          <br />
          {reviewsDisplay}
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
  
const mapStateToProps = ({ accommodation, addRooms, like, feedback }) => ({
    accommodation,
    addRooms,
    like,
    feedback
});

export default connect(
mapStateToProps,
{ getAccommodation }
)(OneAccommodation);