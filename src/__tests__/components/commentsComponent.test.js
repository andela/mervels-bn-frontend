/* eslint-disable react/jsx-props-no-spreading */
import { mount } from 'enzyme';
import React from 'react';
import { CommentsCompomentTest, mapStateToProps } from '../../components/shared/commentsCompoment';

let wrapper;

describe('RequestView Component', () => {
    const props = {
      comments:{
          comments:{},
          error:null
      },
      profile: {
        data:{
          firstName: "Jonathan",
          lastName: "Aurugai",
        },
    },
      assignUser: jest.fn(),
      handleChange: jest.fn(),
      history: { push: jest.fn() },
      match:{
        path:'/approvals'
      }
    };

    beforeEach(() => {
      wrapper = mount(
        <CommentsCompomentTest
        comments={props.comments}
        deleteComment={jest.fn()}
        getComment={jest.fn()}
        postComment={jest.fn()}
        requestId={1}
        />,
      );
    });
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('should render Comments component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should submit a comment', () => {
        wrapper.setState({
            comment: '',
        });
        wrapper.setProps({postComment: jest.fn()});

        const form = wrapper.find('form');
        const event = { preventDefault: jest.fn() };
        const commentInput = {target: {name: "comment", value: ""}};
        wrapper.find('TextArea').simulate('change', commentInput);
        form.simulate('submit', event);
        const {postComment} = wrapper.instance().props;
        expect(postComment).toHaveBeenCalledWith(1, {comment:""});
    });
    it('should submit a comment', () => {
        wrapper.setState({
            comment: '',
        });
        wrapper.setProps({postComment: jest.fn()});

        const form = wrapper.find('form');
        const event = { preventDefault: jest.fn() };
        const commentInput = {target: {name: "comment", value: ""}};
        wrapper.find('TextArea').simulate('change', commentInput);
        form.simulate('submit', event);
        const {postComment} = wrapper.instance().props;
        expect(postComment).toHaveBeenCalledWith(1, {comment:""});
    });

    it('should test handle change for  post', () => {
        const commentInput = {target: {name: "comment", value: "this is a comment"}};
        wrapper.find('TextArea').props().onChange(commentInput);
        expect(wrapper.instance().state).toEqual({
            comment:'this is a comment',
            markup: '',
            error:''
        });
      });

      it('should test handle remove comment', () => {
        wrapper.setProps({
            comments:{
                comments:{
                    message:"xxx",
                    status:200,
                    data:[{
                        "id": 1,
                        "user": 6,
                        "comment": "Comment 7 anothero ne",
                        "createdAt": "2019-11-23T13:43:16.856Z",
                        "updatedAt": "2019-11-23T13:43:16.856Z",
                        "User": {
                            "id": 6,
                            "firstName": "Jonathan",
                            "lastName": "Aurugai",
                            "userEmail": "marveldev53@gmail.com",
                            "userPassword": "$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2",
                            "userRoles": "Manager",
                            "accountVerified": true,
                            "emailAllowed": true,
                            "createdAt": "2019-11-11T05:13:44.695Z",
                            "updatedAt": "2019-11-20T15:15:21.194Z"
                        }
                    }]
                },
                error:null
            },
            profile: {
                firstName: "Jonathan",
                lastName: "Aurugai",
          },
            deleteComment: jest.fn()});
        wrapper.find('a').props().onClick();
        const {deleteComment} = wrapper.instance().props;
        expect(deleteComment).toHaveBeenCalledWith(1);
      });
      it('should test handle remove comment for not', () => {
        wrapper.setProps({
            comments:{
                comments:{
                    message:"xxx",
                    status:200,
                    data:[{
                        "id": 1,
                        "user": 6,
                        "comment": "Comment 7 anothero ne",
                        "createdAt": "2019-11-23T13:43:16.856Z",
                        "updatedAt": "2019-11-23T13:43:16.856Z",
                        "User": {
                            "id": 6,
                            "firstName": "Jonathan",
                            "lastName": "Aurugai",
                            "userEmail": "marveldev53@gmail.com",
                            "userPassword": "$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2",
                            "userRoles": "Manager",
                            "accountVerified": true,
                            "emailAllowed": true,
                            "createdAt": "2019-11-11T05:13:44.695Z",
                            "updatedAt": "2019-11-20T15:15:21.194Z"
                        }
                    }]
                },
                error:null
            },
            profile: {
                firstName: "",
                lastName: "",
          },
            deleteComment: jest.fn()});
        // expect(wrapper.find('a').toHaveBeenCalledWith(1);
      });

    it('should test the mapStateToProps for userRoles', () => {
        const initialState = {
            commentReducer:{},
            profile: {
              data:{
                  fristName:'Jonathan',
                  lastName: 'Aurugai'
              },
          },
            error: null
        };
        expect(mapStateToProps(initialState).comments).toEqual({});
    });
});
