/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import 'react-router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Meta from './shared/meta';
import Button from './shared/Button';
import OneWayRequest from './OneWayRequest';
import ReturnRequest from './ReturnRequest';
import MultiCityRequest from './MultiCityRequest';
import { getProfile } from '../redux/actions/profileAction';

export class CreateorEditRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oneWayTrip: false,
            returnTrip: false,
            multiCityTrip: false,
            id: '',
            request: '',
            updating: false,
            autofillInfo: '',
            autofill: ''
        };
    }

    componentDidMount() {
        const { id, request, updating, getProfile : fetchProfile } = this.props;
        fetchProfile();
        if (updating) {
            this.setState({
                id,
                [request.type]: true,
                request: request.data,
                updating
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { history } = this.props;
        if(nextProps.profile.error === 'Server error') {
            history.push('/500');
        }
        if(nextProps.profile.error === 'Invalid or expired token used') {
            history.push('/login');
            nextProps.profile.error = 'You need to log in again';
        }
        switch(nextProps.profile.status) {
            case 'fetch_success': {
                const { passportName, passportNumber, gender, requestAutofill } = nextProps.profile.data;
                const emptyValues = [ null, undefined, '', 'null' ];
                let autofillInfo;
                if(!emptyValues.includes(passportName)) autofillInfo = { ...autofillInfo, passportName };
                if(!emptyValues.includes(passportNumber)) autofillInfo = { ...autofillInfo, passportNumber };
                if(!emptyValues.includes(gender)) autofillInfo = { ...autofillInfo, gender };
                this.setState({ autofillInfo, autofill: requestAutofill });
                break;
            }
            case 'fetch_error':
                toast.error(nextProps.profile.error, {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            default:
                break;
        };
    }

    switchTripType = (e) => {
        const tripTypes = ['oneWayTrip', 'returnTrip', 'multiCityTrip'];
        const index = tripTypes.indexOf(e.target.id);
        tripTypes.splice(index, 1);
        this.setState({ [e.target.id] : true, [tripTypes[0]]: false, [tripTypes[1]]: false });
    }

    render() { 
        const { oneWayTrip, returnTrip, multiCityTrip, request, id, autofillInfo, autofill } = this.state;
        const { updating, toggleUpdating, history } = this.props;
        return(
            <>
            <Meta title="Creating-request"/>
                <div className={`col-10 ${ updating ? '' : 'offset-3'} p-1 m-bottom-1`}>
                    { !updating ?
                        <div className='center'>
                            <Button buttonType='button' ButtonId='oneWayTrip' classes={`btn ${ oneWayTrip ? 'btn-primary' : 'btn-secondary' }`} text='One Way Trip' onClick={this.switchTripType} />
                            <Button buttonType='button' ButtonId='returnTrip' classes={`btn ${ returnTrip ? 'btn-primary' : 'btn-secondary' }`} text='Return Trip' onClick={this.switchTripType} />
                            <Button buttonType='button' ButtonId='multiCityTrip' classes={`btn ${ multiCityTrip ? 'btn-primary' : 'btn-secondary' }`} text='Multi-City Trip' onClick={this.switchTripType} />
                        </div>
                        :
                        ''
                    }
                    <br />
                    { oneWayTrip ? <OneWayRequest
                        currentRequest={request}
                        id={id}
                        updating={updating}
                        toggleUpdating={toggleUpdating}
                        history={history}
                        autofillInfo={autofillInfo}
                        autofill={autofill}
                        /> :
                        ''
                    }
                    { returnTrip ? <ReturnRequest
                        currentRequest={request}
                        id={id}
                        updating={updating}
                        toggleUpdating={toggleUpdating}
                        history={history}
                        autofillInfo={autofillInfo}
                        autofill={autofill}
                        /> : ''
                    }
                    { multiCityTrip ? <MultiCityRequest
                        currentRequest={request}
                        id={id}
                        updating={updating}
                        toggleUpdating={toggleUpdating}
                        history={history}
                        autofillInfo={autofillInfo}
                        autofill={autofill}
                        /> : ''
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = ({profile}) => ({profile});

export default connect(
    mapStateToProps,
    { getProfile }
)(CreateorEditRequest);