/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';

const API_KEY = process.env.REACT_APP_MAP_KEY;
Geocode.setApiKey(API_KEY);
Geocode.enableDebug();
class Map extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
            mapPosition: {lat: '', lng: ''}
        };
    }

;
    /**
    * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
    *
    * @param nextProps
    * @param nextState
    * @return {boolean}
    */
    // eslint-disable-next-line consistent-return
    shouldComponentUpdate (){
        const { mapPosition } = this.state;
        const { center } = this.props;
        if ( mapPosition.lat === center.lat){
            return false;
        }
        this.setState( {
            mapPosition: {
                lat: center.lat,
                lng: center.lng
            }
        });
        return true;
    }


    /**
    * When the user types an address in the search box
    * @param place
    */
    onPlaceSelected = ( place ) => {
        const { getMapLocation } =this.props;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        getMapLocation({lat, lng});
    };

    /**
    * When the marker is dragged you get the lat and long using the functions available from event object.
    * Use geocode to get the address, city, area and state from the lat and lng positions.
    * And then set those values in the state.
    *
    * @param event
    */
    onMarkerDragEnd = ( event ) => {
        const { getMapLocation } =this.props;
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        getMapLocation({lat, lng});
    };

    render(){
        const { google, zoom, height, display } = this.props;
        const { center } =this.props;
        const AsyncMap = withScriptjs(
        withGoogleMap(
            // eslint-disable-next-line no-unused-vars
            _props => (
                <GoogleMap google={google}
                    defaultZoom={zoom}
                    defaultCenter={{ lat: center.lat, lng: center.lng }}
                >
                {/* For Auto complete Search Box */}
               {display? <Autocomplete
                    style={{
                        width: '100%',
                        height: '40px',
                        paddingLeft: '16px',
                        marginTop: '2px',
                        marginBottom: '100px'
                    }}
                    onPlaceSelected={ this.onPlaceSelected }
                    types={['(regions)']}
                />: ''}
                {/* Marker */}
            <Marker google={google}
                name="Dolores park"
                draggable
                onDragEnd={ this.onMarkerDragEnd }
                position={{ lat: center.lat, lng: center.lng }}
            />
            <Marker />
        </GoogleMap>
        )));
        let map;
        if( center.lat !== undefined ) {
            map = <div>
        <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
            loadingElement={
                <div style={{ height: `100%` }} />
            }
            containerElement={
                <div style={{ height }} />
            }
            mapElement={
                <div style={{ height: `100%` }} />
            }
        />
        </div>;
        } else {
            map = <div style={{ height }} />;
        }
        return( map );
    }
}
export default Map;
