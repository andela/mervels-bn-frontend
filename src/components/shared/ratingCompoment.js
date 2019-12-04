/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import { rateAccommodation } from '../../redux/actions/accommodationsAction';

export class RatingCompoment extends Component {
    constructor(props){
        super(props);
        this.state = {value: 0};
    }

    componentDidMount () {
        const {  userRating } = this.props;

        if (userRating === undefined) {
            this.setState({value: 0});
            return;
        }
        this.setState({value: userRating.userRating});
    }

    componentDidUpdate(prevProps) {
        const {  userRating } = this.props;
        if (userRating !== prevProps.userRating) {
            this.setState({value: userRating.userRating});
        }
    }

    handleClick = async(item) => {
        const { rateAccommodation: rateAcc, accommodationId, getUpdate } = this.props;
        await rateAcc({ rating: item }, accommodationId);
        this.setState({value: item});
       getUpdate();
    }

    render() {
        const { value } = this.state;
        return (
            <div>
                <Rating
                className="rating-container"
                initialRating={value}
                onClick={(e)=> this.handleClick(e)}
                emptySymbol="fa fa-star-o fa-lg"
                fullSymbol="fa fa-star fa-lg"
                />
                <p className="starsCount">User Rating: {value}</p>
            </div>
        );
    }
}

export function mapStateToProps({rateAccommodationReducer}){
    return {rate: rateAccommodationReducer,};

};

const mapDispatchToProps = {
    rateAccommodation
};

export {RatingCompoment as RatingCompomentTest};
export default connect(mapStateToProps, mapDispatchToProps)(RatingCompoment);