/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Map from './mapComponent';

export class NewCompo extends Component {
    render() {
      return(
    <Map
       // eslint-disable-next-line react/destructuring-assignment
       google={this.props.google}
       center={{lat: 18.5204, lng: 73.8567}}
       height='300px'
       zoom={15}
      />
        );
    }
  }

  export default NewCompo;