/* eslint-disable no-param-reassign */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import TravelDetails from './shared/TravelDetails';
import TravelReason from './shared/TravelReason';
import approveRejectAction from '../redux/actions/approveRejectAction';
import Button from './shared/Button';
import validator from '../helpers/validator';
// import  {getRequest} from '../API/managerApi';
import {Spinner} from './shared/Spinner';
import getSingleRequest from '../redux/actions/requestAction';
import ConfirmModal from './shared/confirmModal';
import CommentsCompoment from './shared/commentsCompoment';

class ApproveReject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: null,
             error: undefined, submitting:{sub1: '', sub2: ''}, dropDisplay: 'hidden', arrowDirection: 'right', dropActive: false, reason: '', showModal: false, decision: '', buttonTarget: null};
    }

    componentDidMount() {
        // eslint-disable-next-line react/destructuring-assignment
        const { location, singleRequest }  = this.props;
        const requestId = location.pathname.split('approvals/')[1];
        const {getSingleRequest} = this.props;
        if(singleRequest.data) {
            this.setState((prev) => ({...prev, request: singleRequest.data.request}));
        }
        getSingleRequest(requestId);
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState((prev) => ({...prev, submitting: {sub1: '', sub2: ''}}));
        // eslint-disable-next-line prefer-const
        let {approveReject, singleRequest, history} = nextProps;
        // console.log(singleRequest.data);
        if(approveReject.data || singleRequest.data) {
            
            if(approveReject.data) {
                history.push('/approvals');
                window.location.reload();
                toast.success(approveReject.data.message);
            } else {
                this.setState((prev) => ({...prev, request: singleRequest.data.request}));
                    if(singleRequest.data.request.status !== 'Pending') {
                    history.push('/approvals');
                    toast.error('Action already taken');
                   }
            }

        } else {
            let error = null;
            if(approveReject.error) {
                error = approveReject.error;
            } else {
                error = singleRequest.error;
            }
            const {status, message} = error;
            if(status === 401){
                history.push('/login');
                toast.error('Current session is expired. Please login again');
                localStorage.removeItem('bareFootToken');
            } else if (status === 403){
                toast.error(message);
                history.push('/AccessForbidden');
            } else if (status === 404) {
                toast.error(message);
                history.push('/approvals');
            } else if (status === 409) {
                history.push('/approvals');
                toast.error(message);
            } else if(status === 500){
                history.push('/500');
                toast.error('Server error');
            } else {
                toast.error('Connection Error. Try again');
            }
        }
    }
    
    handleAsk = () => {
        const {dropActive} = this.state;
        if(dropActive){
            this.setState((prev) => ({...prev, dropDisplay: 'hidden', arrowDirection: 'right', dropActive: false}));
        } else {
            this.setState((prev) => ({...prev, dropDisplay: 'visible', arrowDirection: 'down', dropActive: true}));
        }
        
    }

    handleDecision = async ({target}) => {
        const {reason, error} = this.state;
        if(error === undefined && reason.length >=30) {
            const {textContent} =  target;
            this.setState((prev) => ({...prev, showModal: true, decision: textContent}));
            const buttonTarget = {id: target.id, textContent };
            this.setState((prev) => ({...prev, buttonTarget}));
        } else {
            const {error} = await validator('reasonComment', reason);
            this.setState((prev) => ({...prev, error}));
        }
    }

    handleChange = async ({target}) => {
        
        this.setState((prev) => ({...prev, reason: target.value}));
        const {reason} = this.state;
        const {error} = await validator('reasonComment', reason);
        this.setState((prev) => ({...prev, error}));
    }

    toggleModal = () => {
        this.setState((prev)=> ({...prev, showModal: false, buttonTarget: null}));
    }

    reconfirm = async () => {
        this.setState((prev)=> ({...prev, showModal: false}));
        const {approveRejectAction} = this.props;
        const {reason, request, buttonTarget} = this.state;
        this.setState((prev) => ({...prev, submitting:{ ...prev.submitting, [`sub${buttonTarget.id}`]: 'submitting'}}));
        await approveRejectAction({action: buttonTarget.textContent.trim().toLowerCase(), requestId: request.id, reason});
        
    }

    render() { 
        const {dropDisplay, arrowDirection, reason, submitting, request, error, showModal, decision} = this.state;
        const {match} = this.props;
        const {sub1, sub2} = submitting; 
        return ( !request ? <Spinner className="spinner-center"/> : (<>
                    { showModal ? <ConfirmModal confirm={this.reconfirm} closeModal={this.toggleModal}>
                <p>{`Are you sure you want to ${decision} this request?`}</p>
            </ConfirmModal> : '' }
        <a href="/approvals" className="back-approvals"><i className="fa fa-angle-double-left" aria-hidden="true"/></a>
        <div className="grid single-request-container">
            <TravelDetails request={request} classes="col-4 details"/>
            <div className="col-8 reason">
            <TravelReason reason={request.reason}/>
            <div className="manager-options trv-reason">
            <i onClick={this.handleAsk} className={`drop-fa fa fa-angle-${arrowDirection}`} aria-hidden="true"> <span>Take action</span></i>
            </div>
            <div className={`trv-reason trv-reason-dropdown ${dropDisplay}`}>
                <span className="reason-error">{error}</span>
                <textarea className="trv-reason txt-reason-comment" placeholder="Comment/ reason" onChange={this.handleChange} value={reason}/>
                <div className="manager-actions-container">
                <Button ButtonId = '1' buttonType='button' classes='btn-approve btn btn-primary' text='Approve' onClick={this.handleDecision} submitting={sub1}/>
                <Button ButtonId = '2' buttonType='button' classes='btn-reject btn btn-danger' text='Reject' onClick={this.handleDecision} submitting={sub2}/>
                </div> 
            </div>
            <CommentsCompoment requestId={match.params.id}/>
            </div>
        </div>
        </>)
        );
    }
}

const mapStateToProps = ({approveReject, singleRequest}) => {
    return {
        approveReject,
        singleRequest
    };
};

const mapDispatchToProps = {
    approveRejectAction,
    getSingleRequest
};
export {ApproveReject};
export default connect(mapStateToProps, mapDispatchToProps)(ApproveReject);
