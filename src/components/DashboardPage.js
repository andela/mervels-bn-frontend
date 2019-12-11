/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
import React from "react";
// import Ratings from "./shared/Rating";
import Button from "./shared/Button";
import Select from "./shared/Select";
// import imagePlaceholder from "../assets/hotel_one.jpg";
import Input from "./shared/input";
import SingleAccommodation from './accommodation';
import { enhanceRooms } from '../helpers/RoomClasses';

class DashboardPage extends React.Component {
  render() {
    const { destination, trips, computePeriod, updateInput } = this.props;
    let single;
    let rooms;
    if(destination.count > 0) {
      const accommodation = destination.destinations[0];
      const location = `${accommodation.Location.city} ${accommodation.Location.country}`;
      single = <SingleAccommodation 
        name={accommodation.name}
        likes={accommodation.Likes.length}
        rooms={accommodation.Rooms.length}
        rating = {accommodation.Ratings.averageRating}
        location={location}
        id={accommodation.id}
        key={accommodation.id}
        imageUrl={accommodation.imageUrl}
        description={accommodation.description}
      />;
      const displayRooms = accommodation.Rooms.slice(0, 2);
      rooms = enhanceRooms(displayRooms);
    }
    return (
      <>
      <div className="container">
        <div className="grid grid-sm">
          <div className="col-6 offset-2 col-sm-12">
            <div className="dash-dest">
              <span className="card-title">MOST TRAVELLED DESTINATION</span>
              <div className="card-body">
                {single}
              </div>
            </div>
          </div>
          <div className="col-5 col-sm-12 dash-dest">
          <div className="dash-rooms">
            <div className="rooms">
                {rooms}
            </div>
        </div>
          </div>
          <div className="col-12" />
        </div>
        <div className="grid grid-sm dash-bottom">
        <div className="col-8 offset-4 col-sm-12 center dash-stat">
              <div className="card">
              <span className="card-title">Find out your past trips statistics</span>
              <div className="filter">
                <div className="filter-items">
                  <Select
                    name="parameter"
                    onChange={updateInput}
                    selected="years"
                    ids={["days", "weeks", "months", "years"]}
                    options={["days", "weeks", "months", "years"]}
                    error=""
                  />
                </div>
                <div className="filter-items">
                  <Input
                    name="value"
                    onChange={updateInput}
                    inputType="number"
                    placeholder="Enter Value"
                  />
                </div>
                <div className="filter-items">
                  <Button
                    ButtonId="compute"
                    onClick={computePeriod}
                    buttonType="button"
                    text="SUBMIT"
                    classes="btn btn-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4" />
          <div className="col-12 col-sm-11 offset-1">
          <span className="card-title">PREVIOUS TRIPS: {trips.total}</span>
            <div className="requests scroll_container">
              {trips.trips.length > 0 ? trips.trips.map(trip => (
                <div className="one_card reqcard" key={trip.id}>
                  <div className="card-info">
                    <div className="card-info-item">
                      <span className="label">Request date </span>
                      <span className="label-item">
                        {new Date(trip.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="card-info-item">
                      <span className="label">From </span>
                      <span className="label-item">{trip.from}</span>
                    </div>
                    <div className="card-info-item">
                      <span className="label">TravelDate </span>
                      <span className="label-item">{trip.travelDate}</span>
                    </div>
                    <div className="card-info-item">
                      <span className="label">ReturnDate </span>
                      <span className="label-item">{trip.returnDate}</span>
                    </div>
                    <div className="card-info-item">
                      <span className="label">Status </span>
                      <span className="label-item">
                        {trip.status}
                        <span
                          id="circle"
                          className={
                            trip.status === "Approved" ? "approved" : "rejected"
                          }
                        ></span>
                      </span>
                    </div>
                  </div>
                </div>
              )): <span className="text-center text-danger card-title">NO TRIPS</span>}
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default DashboardPage;
