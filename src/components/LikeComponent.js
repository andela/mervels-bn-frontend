/* eslint-disable react/no-deprecated */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import likeAction from "../redux/actions/likeAction";

export class LikeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      liked: false
    };
  }

  componentDidMount() {
    const { likes, liked } = this.props;
    this.setState({ likes, liked });
  }

  componentWillReceiveProps(nextProps) {
    const { like } = nextProps;
    if(like) {
      switch(like.status) {
        case 'like_success':
          break;
        case 'like_error':
          const { likes, liked } = this.state;
          let payload;
          if (liked) {
            payload = {
              liked: false,
              likes: likes - 1
            };
          } else {
            payload = {
              liked: true,
              likes: likes + 1
            };
          }
          this.setState(payload);
          break;
        default:
          break;
      }
    }
  }

  likeOrUnlike = () => {
    const { likes, liked } = this.state;
    let payload;
    if (liked) {
      payload = {
        liked: false,
        likes: likes - 1
      };
    } else {
      payload = {
        liked: true,
        likes: likes + 1
      };
    }
    this.setState(payload);
    const { likeAction : likeAccommodation, accommodation } = this.props;
    likeAccommodation(accommodation);
  };

  render() {
    const { likes, liked } = this.state;
    return (
      <div className="likes-container m-left-1">
        <div className='likes-number'>
            {likes ? likes : '' }
            {likes > 1
            ? " Likes"
            : likes === 0
            ? "Be the first one to like"
            : " Like"}
        </div>
        <div id='like-button'
          className={`${liked ? "liked" : "not-liked"}`}
          onClick={this.likeOrUnlike}
        >
        <i className={`fa ${liked ? "fa-thumbs-up" : "fa-thumbs-o-up"}`} />
        &nbsp;Like
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ like }) => ({ like });

export default connect(
  mapStateToProps,
  { likeAction }
)(LikeComponent);
