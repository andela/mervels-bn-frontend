/* eslint-disable no-case-declarations */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import UpdateRequest from './CreateOrEditRequest';
import updateableRequest from '../helpers/updateableRequest';
import TravelDetails from './shared/TravelDetails';
import TravelReason from './shared/TravelReason';
import Button from './shared/Button';
import ConfirmModal from './shared/confirmModal';
import { Spinner } from './shared/Spinner';
import { getSingleRequest, deleteRequest } from '../redux/actions/requestActions';
import CommentsCompoment from './shared/commentsCompoment';

export class ViewRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: '',
            updating: false,
            formattedRequest: '',
            showModal: false
        };
    }

    componentDidMount() {
        const { getSingleRequest: fetchRequest, match: { params }, history } = this.props;
        if(!params.id) history.push('/requests'); 
        fetchRequest(params.id);
    }

    componentWillReceiveProps(nextProps) {
        const { request, history } = nextProps;
        switch(request.status) {
            case 'fetch_request_success' :
                const formattedRequest = updateableRequest(request.data[0]);
                this.setState({ request: request.data[0], formattedRequest });
                break;
            case 'fetch_request_error' :
                toast.error(request.error,{
                    position: toast.POSITION.TOP_RIGHT
                });
                history.push('/requests');
                break;
            case 'delete_request_success' :
                toast.success(request.message,{
                    position: toast.POSITION.TOP_RIGHT
                });
                history.push('/requests');
                break;
            case 'delete_request_error' :
                toast.error(request.error,{
                    position: toast.POSITION.TOP_RIGHT
                });
                this.setState({ showModal: false });
                break;
            default:
                break;
        }
    }

    toggleUpdating = () => {
        const { updating} = this.state;
        if(updating === true) {
            const { getSingleRequest: fetchRequest, match: { params } } = this.props;
            fetchRequest(params.id);
        }
        this.setState({ updating: !updating });
    }

    toggleModal = () => {
        const { showModal } = this.state;
        this.setState({ showModal: !showModal });
    }

    deleteRequest = () => {
        const { deleteRequest: deleteTripRequest, match } = this.props;
        deleteTripRequest(match.params.id);
    }

    render() { 
        const { request, updating, formattedRequest, showModal } = this.state;
        const { match } = this.props;
        const payload = request;
        delete payload.passportName;
        return (updating) ? 
        (
            <>
                <div className='grid'>
                    <div className='col-1' />
                        <UpdateRequest id={match.params.id} toggleUpdating={this.toggleUpdating} updating request={formattedRequest} />
                    <div className='col-1' />
                </div>
            </>
        ) :
        (
        <>
            { showModal ? <ConfirmModal confirm={this.deleteRequest} closeModal={this.toggleModal}>
                <p>Are you sure you want to delete this request?</p>
            </ConfirmModal> : '' } 
            { request ?  <div className="single-request-container grid m-2">
                <div className='col-1' />
                <div className='col-3 center'>
                    <TravelDetails request={payload}/>
                    { payload.status === 'Pending' ?
                        <>
                            <Button buttonType='button' ButtonId='start-updating' classes='btn btn-secondary m-top-2' text='Update' onClick={this.toggleUpdating} />
                            <Button buttonType='button' ButtonId='delete' classes='btn btn-danger' text='Delete' onClick={this.toggleModal} />
                        </>
                        : ''
                    }
                </div>
                <div className="travel-reason-2-container col-7">
                    <TravelReason reason={payload.reason}/>
                    <CommentsCompoment/>
                </div>
                <div className='col-1' />
            </div> : 
            <Spinner className='spinner-center' />
            }
        </> 
        );
    }
}

const mapStateToProps = ({request}) => ({ request });

const mapDispatchToProps = { getSingleRequest, deleteRequest };

export default connect(mapStateToProps, mapDispatchToProps)(ViewRequest);
