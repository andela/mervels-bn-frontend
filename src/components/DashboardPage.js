/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
import React from "react";
import Ratings from "./shared/Rating";
import Button from "./shared/Button";
import Select from "./shared/Select";
import imagePlaceholder from "../assets/hotel_one.jpg";
import Input from "./shared/input";

class DashboardPage extends React.Component {
  render() {
    const { destination, trips, computePeriod, updateInput } = this.props;

    return (
      <div className="container">
        <div className="grid">
          <div className="col-6 center">
            <div className="card">
              <span className="card-title">MOST TRAVELLED DESTINATION</span>
              <div className="card-body">
                {destination.count > 0 && (
                  <>
                    <div className="card-image">
                      <img
                        src={imagePlaceholder}
                        alt="accommodation_placeholder"
                      />
                    </div>
                    <div className="card-details">
                      <h2>{destination.destinations[0].name} </h2>
                      <p>
                          {destination.destinations[0].description}
                      </p>
                      <div className="card-footer">
                        <Ratings stars={[1, 2, 3, 4]} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-6 center">
            <div className="card">
              <span className="card-title">TRIPS STATISTICS</span>
              <div className="filter m-top-3">
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
              <div><strong>TRIPS: </strong> {trips.total}</div>
            </div>
          </div>
        </div>
        <div className="grid p-top-2">
          <h3 className="col-12 center">PREVIOUS REQUESTS</h3>
          <div className="col-12 center">
            <div className="requests">
              {trips.trips.map(trip => (
                <div className="card col-3" key={trip.id}>
                  <div className="card-info">
                    <div className="card-info-item">
                      <span className="label">Request # </span>
                      <span className="label-item">{trip.id}</span>
                    </div>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
