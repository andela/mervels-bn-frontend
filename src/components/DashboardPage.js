/* eslint-disable react/prop-types */
import React from "react";
import Button from "./shared/Button";
import Select from "./shared/Select";
import Input from "./shared/input";
import SingleAccommodation from './accommodation';
import Meta from './shared/meta';

class DashboardPage extends React.Component {
  render() {
    const { destination, trips, computePeriod, updateInput } = this.props;
    let single;
    if(destination.count > 0) {
      const accommodation = destination.destinations[0];
      const totalrating = accommodation.Ratings.length > 0 ? accommodation.Ratings
      .map((rate) => rate.rating)
      .reduce((prev, cur)=> prev + cur ) : 0;
      const rating = totalrating ? totalrating/accommodation.Ratings.length : 0;
      const location = `${accommodation.Location.city} ${accommodation.Location.country}`;
      single = <SingleAccommodation 
        name={accommodation.name}
        likes={accommodation.Likes.length}
        rooms={accommodation.Rooms.length}
        rating = {rating}
        location={location}
        id={accommodation.id}
        key={accommodation.id}
        imageUrl={accommodation.imageUrl}
        description={accommodation.description}
      />;
    }
    return (
      <>
      <Meta title="Dashboard"/>
      <div className="container">
        <div className="bg-welcome" />
        <div className="black-container" />
        <div className='welcome p-top-5'>
          <p className='m-bottom-3'>Barefoot Nomad</p>
          <div className='grid grid-sm'>
            <div className="col-3" />
            <a href='/requests' className='card home-card col-3 col-sm-6 p-top-2'>
              <i className="fab fa-wpforms"/>
              <br />
              <p className='text-home-card m-top-1' href="/requests">
                Go to your requests
              </p>
            </a>
            <a href='/accommodations' className='card home-card col-3 col-sm-6 p-top-2'>
              <i className="fas fa-hotel"/>
              <br />
              <p className='text-home-card m-top-1' href="/requests">
                View All Accommodations
              </p>
            </a>
            <div className="col-3" />
          </div>
        </div>
        <div className="grid grid-sm">
          <div className="col-6 col-sm-12">
            <div className="dash-dest">
              <span className="card-title m-left-1">MOST BOOKED ACCOMMODATION</span>
              <div className="card-body">
                {single}
              </div>
            </div>
          </div>
          <div className='col-1' />
          <div className="col-5 col-sm-12">
            <div className="dash-dest">
              <span className="card-title m-left-1">Find out your past trips statistics</span>
              <div className="filter">
                <div className="filter-items">
                  <div className="filter-items">
                    <Select
                      style={{ }}
                      name="parameter"
                      onChange={updateInput}
                      selected="years"
                      ids={["days", "weeks", "months", "years"]}
                      options={["Days", "Weeks", "Months", "Years"]}
                      error=""
                    />
                  </div>
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
          <div className="col-12" />
        </div>
        <div className="grid grid-sm dash-bottom m-bottom-3">
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
                        />
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
