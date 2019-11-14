/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import 'react-router';
import Button from './shared/Button';
import OneWayRequest from './OneWayRequest';
import ReturnRequest from './ReturnRequest';
import MultiCityRequest from './MultiCityRequest';

class CreateorEditRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oneWayTrip: false,
            returnTrip: false,
            multiCityTrip: false,
            id: '',
            request: '',
            updating: false
        };
    }

    componentDidMount() {
        const { id, request, updating } = this.props;
        if (updating) {
            this.setState({
                id,
                [request.type]: true,
                request: request.data,
                updating
            });
        }
    }

    switchTripType = (e) => {
        const tripTypes = ['oneWayTrip', 'returnTrip', 'multiCityTrip'];
        const index = tripTypes.indexOf(e.target.id);
        tripTypes.splice(index, 1);
        this.setState({ [e.target.id] : true, [tripTypes[0]]: false, [tripTypes[1]]: false });
    }

    render() { 
        const { oneWayTrip, returnTrip, multiCityTrip, request, id } = this.state;
        const { updating, toggleUpdating, history } = this.props;
        return(
            <>
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
                        id={id} updating={updating}
                        toggleUpdating={toggleUpdating}
                        history={history}
                        /> :
                        ''
                    }
                    { returnTrip ? <ReturnRequest
                        currentRequest={request}
                        id={id}
                        updating={updating}
                        toggleUpdating={toggleUpdating}
                        history={history}
                        /> : ''
                    }
                    { multiCityTrip ? <MultiCityRequest
                        currentRequest={request}
                        id={id}
                        updating={updating}
                        toggleUpdating={toggleUpdating}
                        history={history}
                        /> : ''
                    }
                </div>
            </>
        );
    }
}

export default CreateorEditRequest;