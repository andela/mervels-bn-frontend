/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import TextArea from "./shared/TextArea";
import Button from "./shared/Button";
import feedbackAction from "../redux/actions/feedbackAction";

export class ReviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      isSubmitting: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { feedbackAction : addReview, accommodation } = this.props;
    const { review } = this.state;
    this.setState({ isSubmitting: true });
    addReview(accommodation, { feedback: review });
  };

  render() {
    const { review, isSubmitting } = this.state;
    const { reviewError } = this.props;
    let submitting = isSubmitting;
    if(reviewError) {
      submitting = false;
    }

    return (
      <div>
        <TextArea name="review" value={review} onChange={this.handleChange} />
        <br />
        <Button ButtonId='add-review' classes='btn btn-primary' text='Add Review' onClick={this.handleSubmit} submitting={submitting} />
      </div>
    );
  }
}

const mapStateToProps = ({ feedback }) => ({ feedback});

export default connect (
  mapStateToProps,
  { feedbackAction }
)(ReviewComponent);
