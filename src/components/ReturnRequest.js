/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Input from './shared/input';
import Select from './shared/Select';
import Button from './shared/Button';
import TextArea from './shared/TextArea';
import { validateRequest } from '../helpers/validator';
import locationsHelper from '../helpers/locationsHelper';
import { getLocations, requestTrip, updateRequest } from '../redux/actions/requestActions';

export class ReturnRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            location: '',
            travelDate: moment(new Date()).format('YYYY-MM-DD'),
            accommodation: '',
            returnDate : moment(new Date()).format('YYYY-MM-DD'),
            reason : '',
            passportName: '',
            passportNumber: '',
            gender: '',
            error: '',
            possibleLocations: '',
            updating: false,
            id: '',
            markup: '',
            submitting: false,
            autofillInfo: '',
            autofill: false
        };
    }

    componentDidMount() {
        const { getLocations : fetchLocations, id, currentRequest, updating, autofillInfo, autofill } = this.props;
        fetchLocations();
        if (updating) {
            this.setState({
                ...currentRequest,
                id,
                updating,
                markup: currentRequest.reason
            });
        }
        this.setState({ autofillInfo , autofill });
        if(autofill) this.setState({ ...autofillInfo });
    }

    componentWillReceiveProps(nextProps) {
        const { request, toggleUpdating, history } = nextProps;
        switch(request.status) {
            case 'fetch_locations_success' :
                this.setState({ possibleLocations: request.locations.map((
                    {id, country, city, Accommodations }) => ({
                        id, name: `${city}, ${country}`, Accommodations
                    }))
                });
                break;
            case 'request_success' :
                toast.success(request.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                history.push(`/request/${request.id}`);
                break;
            case 'request_error' :
                this.setState({ error: request.error, submitting: false });
                break;
            case 'update_request_success' :
                toast.success(request.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                toggleUpdating();
                break;
            case 'update_request_error' :
                toast.success(request.error, {
                    position: toast.POSITION.TOP_RIGHT
                });
                toggleUpdating();
                break;
            default:
                break;
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, error: '', markup: '' });
    }

    handleSubmit = async () => {
        const payload = this.state;
        const { requestTrip : newTrip, updateRequest: updateTrip, autofill } = this.props;
        const { location, accommodation, travelDate } = payload;
        payload.trips = [{ location : parseInt(location, 10) , accommodation, travelDate}];
        const error = await validateRequest(payload);
        if(!error) {
            let toggleAutofill = false;
            if(autofill !== payload.autofill) toggleAutofill = true;
            if(payload.updating) {
                updateTrip({
                    id: payload.id,
                    data: { 
                        from: payload.from,
                        reason: payload.reason,
                        to: payload.trips,
                        passportName: payload.passportName,
                        passportNumber: payload.passportNumber,
                        gender: payload.gender,
                    }
                });
                this.setState({ submitting: true });
            } else {
                newTrip({
                    type: 'return-trip',
                    toggleAutofill,
                    data: { 
                        from: payload.from,
                        reason: payload.reason,
                        to: payload.trips,
                        returnDate: payload.returnDate,
                        passportName: payload.passportName,
                        passportNumber: payload.passportNumber,
                        gender: payload.gender,
                    }
                });
                this.setState({ submitting: true });
            }
        } else {
            this.setState({ error });
        }
    }

    stopUpdating = () => {
        const { toggleUpdating } = this.props;
        toggleUpdating();
    }

    toggleAutofill = () => {
        const { autofill } = this.state;
        const { autofillInfo } = this.props;
        if(autofill) {
            this.setState({ gender: '', passportName: '', passportNumber: '' });
        } else {
            this.setState({ ...autofillInfo });
        }
        this.setState({ autofill: !autofill });
    }

    render() {
        const { from, location, travelDate, accommodation, reason, error, possibleLocations,returnDate, passportName, passportNumber, gender, markup, updating, submitting, autofill, autofillInfo } = this.state;
        const {
            locationIds,
            locationNames,
            selectedAccommodation,
            locationAccommodations
        } = locationsHelper(possibleLocations, location);
        return(
            <div className='grid white p-left-1 p-top-1'>
                <div className='col-6'>
                    From:<br />
                    <Select name='from' options={locationNames} selected={from} onChange={this.handleChange} error='' />
                </div>
                <div className='col-6 grid'>
                    <div className='col-6 m-right-2'>
                        Travel Date:<br />
                        <Input inputType='date' value={travelDate} classes='input' name='travelDate' onChange={this.handleChange} error='' />
                    </div>
                    <div className='col-6  m-left-2'>
                        Return Date:<br />
                        <Input inputType='date' value={returnDate} classes='input' name='returnDate' onChange={this.handleChange} error='' />
                    </div>
                </div>
                <div className='col-6'>
                    Destination:<br />
                    <Select name='location' ids={locationIds} options={possibleLocations ? ['', ... possibleLocations.map(({name}) => name )] : ['Loading...']} selected={updating && possibleLocations ? possibleLocations.find((lct) => lct.id === location).name : location} onChange={this.handleChange} error='' />
                </div>
                <div className='col-6'>
                    Accommodation:<br />
                    <Select name='accommodation' options={locationAccommodations} selected={accommodation} onChange={this.handleChange} error='' />
                </div>
                {/* <Show accommodations pictures> */}
                {location && possibleLocations ?
                ['' ,...selectedAccommodation.Accommodations.map(({ name, imageUrl }, index) => (
                    <>
                        {index === 0 ? <h3 className='col-12 center'>Accommodations</h3>: ''}
                        <div id={`accommodation-image-${index + 1}`} className={`col-3 p-top-1 p-bottom-1 m-bottom-1 center accomodation-image ${ name === accommodation ? 'accommodation-selected' : '' }`}
                            onClick={() => {
                                this.handleChange({ target: { name: 'accommodation', value: name }});
                            }}
                        >
                            <img src={ imageUrl ? imageUrl[0] : 'https://res.cloudinary.com/drayzii/image/upload/v1573796111/no-image-found-360x260_xvpnuj.png'}
                                height='200' width='200' alt='accommodation'
                            />
                            <br />
                            <h5 className='m-top-1'>{name}</h5>
                        </div>
                    </>
                ))]
                : ''}
                {/* </Show accommodations pictures> */}
                <div className='col-12 m-right-2'>
                    Travel reason:<br />
                    <TextArea value={reason} markup={markup} name='reason' onChange={this.handleChange} error='' />
                </div>
                <div className='col-12 m-top-1 m-bottom-1'>
                    {autofillInfo? <>
                        <input type='checkbox' id='toggle-checkbox' checked={autofill} onChange={this.toggleAutofill}/>
                        <span className='m-left-1 text-blue'>Autofill fields below from your profile</span>
                        </> : <>
                            <input disabled type='checkbox'/>
                            <span className='text-blue'>Autofill fields below from your profile (Will be available when you fill your <a className='link-blue' href='/profile'>profile</a>) </span>
                    </> }
                </div>
                <div className='col-4'>
                    Passport Name:<br />
                    <Input name='passportName' value={passportName} onChange={this.handleChange} error='' disabled={ (autofill && autofillInfo) ? (autofillInfo.passportName ? 'disabled' : '') : '' } />
                </div>
                <div className='col-4'>
                    Passport Number:<br />
                    <Input name='passportNumber' value={passportNumber} onChange={this.handleChange} error='' disabled={ (autofill && autofillInfo) ? (autofillInfo.passportNumber ? 'disabled' : '') : '' } />
                </div>
                <div className='col-4'>
                    Gender:<br />
                    <Select name='gender' options={['','MALE', 'FEMALE', 'OTHER']} selected={gender} onChange={this.handleChange} error='' disabled={ (autofill && autofillInfo) ? (autofillInfo.gender ? 'disabled' : '') : '' } />
                </div>
                <div className='col-2' />
                <div className='col-8 center'>
                    { error? <div className="error-multi-city">
                        {error}
                    </div> : ''}
                </div>
                <div className='col-2' />
                <div className='col-12 center'>
                    { updating ?
                        <Button
                        buttonType='button'
                        ButtonId='stop-updating'
                        classes='btn btn-danger'
                        text='Cancel'
                        onClick={this.stopUpdating}
                        /> :
                        ''
                    }
                    <Button
                        buttonType='button'
                        ButtonId='submit-request'
                        classes='btn btn-primary'
                        text={ updating ? 'Update' : 'Submit Request' }
                        submitting={submitting}
                        onClick={this.handleSubmit}
                    />
                </div>
            </div>
        );
    }
};

ReturnRequest.propTypes = {
    getLocations: PropTypes.func.isRequired,
    requestTrip: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

const mapStateToProps = ({ request }) => ({ request });

const mapDispatchToProps = {
    getLocations,
    requestTrip,
    updateRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReturnRequest);