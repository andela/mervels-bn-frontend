/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { toast } from 'react-toastify';
import Input from './shared/input';
import TextArea from './shared/TextArea';
import Button from './shared/Button';
import Select from './shared/Select';
import { createAccommodation } from '../redux/actions/accommodationsAction';
 import Map from './mapComponent';

export class CreateAccommodation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accName: '',
            location: '',
            amenityA: '',
            amenities: [],
            serviceA: '',
            services: [],
            selectedImages: null,
            description: '',
            requiredError: '',
            maplocations: {
                lat: null,
                lng: null
            }
        };
    }

    handleChange = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    readImages = (e) => {
        this.setState({
            selectedImages: e.target.files
        });
    }

    handleAddedChange = (index, e) => {
        const { amenities, services } = this.state;
        if (e.target.name === 'service') {
            services[index] = e.target.value;
        } else {
            amenities[index] = e.target.value; 
        }
    }

    handleAdd = (e, value) => {
        const { amenities, services } = this.state;
        if(value === 'service') {
            this.setState({
                services: services.concat([
                    ''
                ])
            });
        } else {
            this.setState({
                amenities: amenities.concat([
                    ''
                ])
            });
        }
    };

    handleRemove = (value, index) => {
        const { amenities, services } = this.state;
        if(value === 'service') {
            this.setState({
                services: services.filter((s, idx) => index !== idx)
            });
        } else {
            this.setState({
                amenities: amenities.filter((a, idx) => index !== idx)
            });
        }
    }

    handleNew = (title, index) => {
        const property = title.toLowerCase();
        return <>
        <div className='col-6'>
        {title}:<br />
            <Input inputType='text' name={property} onChange={(e) => this.handleAddedChange(index, e)} error='' />
        </div>
        <div className='col-1'>
            <br />
            <Button buttonType='button' ButtonId='remove-trip' classes='btn btn-danger p-left-2 p-right-2' text='✖' onClick={() =>this.handleRemove(property, index)}/>
        </div>
        <div className='col-5' />
    </>;
    }

    handleSubmit = () => {
        const { selectedImages, accName, amenities, amenityA, services, serviceA, description, location, maplocations } = this.state;
        const { submit } = this.props;
        const ml = Object.values(maplocations);
        if(!amenities
            || !services 
            || !accName 
            || !amenityA 
            || !serviceA 
            || !description 
            || !location 
            || !selectedImages
            || ml.includes(null)) {
                this.setState({
                    requiredError: 'ALL * fields are required'
                });
        } else {
            // eslint-disable-next-line no-unused-vars
            const { createAccommodation } = this.props;
            submit();
            const selected = Array.from(selectedImages);
            amenities.push(amenityA);
            services.push(serviceA);
            const payload = new FormData();
            for(let counter = 0; counter<selected.length; counter +=1) {
                payload.append('image', selected[counter]); 
            }
            for(let counter = 0; counter<amenities.length; counter +=1) {
                payload.append('amenities', amenities[counter]); 
            }
            for(let counter = 0; counter<services.length; counter +=1) {
                payload.append('services', services[counter]); 
            }
            payload.append('name', accName);
            payload.append('locationId', location);
            payload.append('description', description);
            payload.append('lat', maplocations.lat);
            payload.append('lng', maplocations.lng);
            createAccommodation(payload);
            this.setState({
                services: [],
                amenities: []
            });
        }
    }

    getMapLocation = (maplocations) => {
        this.setState({
            maplocations,
        });
    }

    render() {
        const { amenities, services, accName, amenityA, serviceA, images, description, requiredError } = this.state;
        const { submitting } = this.props;
        let { maplocations } =this.state;
        const { locations } = this.props;
        const possibleLocations = locations.map((
            {id, country, city, Accommodations }) => ({
                id, name: `${city}, ${country}`, Accommodations
        }));
        const locationIds = possibleLocations.map((location) => location.id);
        const names = possibleLocations.map(({name}) => name );
        const values = Object.values(maplocations);
        if(!values[0]){
            maplocations = { lat: -1.9705786, lng: 30.10442880000005 };
        }

        return (
            <div className="col-10 p-1 m-bottom-1 offset-3">
            <div className='grid white p-left-1 p-top-1'>
                <div className='col-6'>
                    Name *:<br />
                    <Input inputType='text' name='accName' value={accName} onChange={(e) => this.handleChange(e)} error='' required />
                </div>
                <div className='col-6'>
                    Location *:<br />
                    <Select name='location' ids={[0, ...locationIds]} options={['', ...names]}  onChange={(e) => this.handleChange(e)} error='' />
                </div>

                <div className='col-12 center'>
                    Pick hotel location on the map *
                </div>
                <div className='col-12 map-form'>
                    <Map
                    // eslint-disable-next-line react/destructuring-assignment
                    google={this.props.google}
                    center={maplocations}
                    height='200px'
                    zoom={15}
                    display='display'
                    getMapLocation={this.getMapLocation}
                    />
                </div>
                <div className='col-6'>
                    Amenities *:<br />
                        <Input inputType='text' name='amenityA' value={amenityA}  onChange={(e) => this.handleChange(e)} error='' required/>
                </div>
                <div className='col-6' />
                {amenities.map((amen, index) => this.handleNew('Amenity', index))}
                <div className='col-12'>
                    <Button buttonType='button' ButtonId='add-amenity' classes='btn btn-secondary col-4' text='✚ Add Amenity' onClick={(e) =>this.handleAdd(e, 'anemity')} />
                </div>
                <div className='col-6'>
                    Services *:<br />
                        <Input inputType='text' name='serviceA' value={serviceA}  onChange={(e) => this.handleChange(e)} error='' required />
                </div>
                <div className='col-6' />
                {services.map((service, index) => this.handleNew('Service', index))}
                <div className='col-12'>
                    <Button buttonType='button' ButtonId='add-service' classes='btn btn-secondary col-4' text='✚ Add Service' onClick={(e) =>this.handleAdd(e, 'service')} />
                </div>
                <div className='col-12 m-right-2'>
                    Description *:<br />
                    <TextArea name='description' value={description} onChange={(e) => this.handleChange(e)} error='' required/>
                </div>
                <div className='col-12 m-right-2'>
                     <h3 className="text-center text-danger">{requiredError || ''}</h3>
                </div>
                <div className='col-12 m-right-2 acc-image-upload'>
                    Add Images *:<br />
                    <input type="file" name="images" value={images} onChange={(e) => this.readImages(e)} accept="image/*" multiple required/>
                </div>
                <div className='col-12 center'>
                    <Button
                        buttonType='submit'
                        ButtonId='submit-request'
                        classes='btn btn-primary'
                        text='Create Accommodation'
                        submitting={submitting}
                        onClick={this.handleSubmit}
                    />
                </div>
            </div>
            </div>
        );
    }
}

CreateAccommodation.propTypes = {
    createAccommodation: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    submitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
};

    
export default connect(
    null,
    { createAccommodation }
  )(CreateAccommodation);
