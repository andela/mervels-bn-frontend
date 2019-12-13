/* eslint-disable no-debugger */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from "react-redux";
import { getMostTravelled, getTrips } from "../redux/actions/dashboardAction";
import DashboardPage from './DashboardPage';
import { Spinner } from './shared/Spinner';

export class ManageDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            parameter: 'years',
            value: '1'
        };
    }

    componentDidMount(){
        const { getMostTravelled, getTrips } = this.props;
        getMostTravelled();
        getTrips(this.state);
    }

    handleComputePeriod = (event) =>{
        event.preventDefault();
        const {  getTrips } = this.props;
        getTrips(this.state);
    }

    handleChange = (event) =>{
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name] : value
        });
    }

    render(){
        const { mostTravelled, tripsStats} = this.props;
        const spinner = <div><Spinner className='spinner-center' /></div>;

        const display = (mostTravelled) ? (
        < DashboardPage destination={mostTravelled}
            trips={tripsStats}
            computePeriod={this.handleComputePeriod}
            updateInput={this.handleChange}
        />
        ): spinner ;
        return(
            display
        );
    }
}

const mapStateToProps = ({dashboard}) =>{
    return {
        mostTravelled: dashboard.mostTravelled,
        tripsStats: dashboard.tripStats
    };
};

export default connect(mapStateToProps, {getMostTravelled, getTrips})(ManageDashboard);