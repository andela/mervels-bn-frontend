/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-plusplus */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import TextArea from './TextArea';
import { getComment, postComment, deleteComment } from '../../redux/actions/commentAction';

class CommentsCompoment extends Component {
   constructor(props) {
     super(props);
     this.state={
       comment:'',
       markup: '',
       error:''
     };
    }

    componentDidMount(){
      const{ requestId, getComment: fetchComments } = this.props;
      fetchComments(requestId);
    }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value,});
    };

    removeComment = (id) => {
      const { deleteComment: rmComment } =this.props;
      rmComment(id);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { postComment: addComment, requestId } =this.props;
      const { comment } = this.state;
      addComment(requestId, { comment });
    }

    render() {
      const{ comment, markup, error } = this.state;
      const { comments } =this.props;
      const obj = comments.comments;
      let display;
        if(Object.keys(obj).length === 0 && obj.constructor === Object){
          display =<h2> No comments</h2>;
        }else{
        const { data } = comments.comments;
        display = data.map((item)=>
          <div className="comment" key={item.id}>
            <span className="comment-details">
        <span className="comment-details-owner">{item.User.firstName} {item.User.lastName}</span>
                <br/>
                <em className="comment-details-time">{moment(item.createdAt).fromNow()}</em>
            </span>
                <div className="comment-body" dangerouslySetInnerHTML={{__html: item.comment}} />
                <a className="comment-actions"
                  onClick={()=>this.removeComment(item.id)}
                  role="button"
                  tabIndex="0">
                Delete
                </a>
          </div>
        );
        }
        return (
            <>
                    <div className="comment-container">
                    <h3 className="comment-title">Comments</h3>
                    <form onSubmit={this.handleSubmit}>
                      <TextArea value={comment} markup={markup} name='comment' onChange={(e) => this.handleChange(e)} error='' />
                      <button className="btn btn-secondary" type="submit">Add Comment</button>
                    </form>
                    <div className="comments">
                    {display}
                    </div>
                    </div>

            </>
        );
    }
}

export const mapStateToProps = ({commentReducer}) => ({ comments: commentReducer });

const mapDispatchToProps = {
  getComment,
  postComment,
  deleteComment
};
export { CommentsCompoment as CommentsCompomentTest };
export default connect( mapStateToProps, mapDispatchToProps)(CommentsCompoment);
