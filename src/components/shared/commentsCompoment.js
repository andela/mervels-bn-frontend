/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-plusplus */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import DropdownComponent from './DropdownComponent';

export default class CommentsCompoment extends Component {

    constructor(){
        super();
        this.state = {
          location: [
            {
                id: 0,
                title: 'New York',
                selected: false,
                key: 'location'
            },
            {
              id: 1,
              title: 'Dublin',
              selected: false,
              key: 'location'
            },
            {
              id: 2,
              title: 'California',
              selected: false,
              key: 'location'
            },
            {
              id: 3,
              title: 'Istanbul',
              selected: false,
              key: 'location'
            },
            {
              id: 4,
              title: 'Izmir',
              selected: false,
              key: 'location'
            },
            {
              id: 5,
              title: 'Oslo',
              selected: false,
              key: 'location'
            }
          ]
        };
      }
   

    toggleSelected(id, key){
        const temp = this.state[key];
        temp[id].selected = !temp[id].selected;
        this.setState({
          [key]: temp
        });
      }

    render() {
        return (
            <>
                <h3 className="comment-title">comments</h3>
                    <div className="comment">
                    <span className="comment-details">
                        <em className="comment-details-owner">Jonathan Aurugai</em>
                        <DropdownComponent
                            title="Select location"
                            list={this.state.location}
                        />
                        <a className="comment-details-actions">...</a><br/>
                        <em className="comment-details-time">25/07/2019 5:00pm</em>
                    </span>
                        <p className="comment-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel sapien quam.
                        Cras eu tellus ac metus viverra faucibus ut ut libero. Quisque tristique lacus
                        </p>
                        <button type="button" htmlFor="sm">reply</button><button type="button" htmlFor="sm">Delete</button>
                        <form>
                            <textarea/>
                            <button type="submit">comment</button>
                        </form>
                    </div>

            </>
        );
    }
}
