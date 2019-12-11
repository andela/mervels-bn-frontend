/* eslint-disable react/prop-types */
/* eslint-disable no-lonely-if */
/* eslint-disable default-case */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import TableComponent from './shared/tableComponent';
import { fetchRequests, getPending, getPast, searchRequests }  from '../redux/actions/requestsAction';
import RequestPanel from './headerPanel';
import { searchMessage } from '../helpers/search';
import Button from './shared/Button';
import { Spinner } from './shared/Spinner';
import CreateRequest from './CreateOrEditRequest';
import Meta from './shared/meta';


class RequestView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            requestsPerPage: 5,
            parameter: null,
            query: null,
            isCreating: false
        };
    }

    componentDidMount(){
        const { fetchRequests: getRequests } = this.props;
        getRequests();
    }

    componentDidUpdate(prevProps) {
        // eslint-disable-next-line react/prop-types
        const { requests, history } = this.props;
        if (requests !== prevProps.requests) {
            if(requests.error){
                if(requests.error.status === 401){
                    localStorage.removeItem('bareFootToken');
                    // eslint-disable-next-line react/prop-types
                    history.push('/login');
                }
            }
        }
    }

    handleChange = (e) => {
        let resetPage = {};
        if(e.target.name === 'requestsPerPage') resetPage = {currentPage: 1};
        this.setState({
            ...resetPage,
            [e.target.name]: e.target.value
        });
    }

    handleRequests = (value) => {
      const { fetchRequests: getRequests, getPending, getPast } = this.props;
      switch (value) {
        case 'ALL':
          getRequests(); 
          break;  
        case 'PENDING':
          getPending(); 
          break; 
        case 'PAST':
          getPast(); 
          break; 
      }
    }

    setCurrentPage = (pageNumber) =>{
        this.setState({
            currentPage: pageNumber,
        });
    }
    
    toggleCreating = () => {
        const { isCreating } = this.state;
        this.setState({ isCreating: !isCreating });
    }

    viewRequest = (e) => {
        window.location.href = `/request/${e.target.id}`;
    }

    paginate = (pageNumber) => this.setCurrentPage(pageNumber)

    handleSearch = () => {
        const { parameter, query } = this.state;
        const { searchRequests } = this.props;
        if(parameter && query ) {
            searchRequests(parameter, query);
        }
    }

    render(){
        const { parameter, currentPage, isCreating } = this.state;
        let { requestsPerPage } = this.state;
        if(!requestsPerPage || requestsPerPage <= 0) {
            requestsPerPage = 1;
        }
        const { requests, history } = this.props;
        const { message, type } = searchMessage(parameter);
        let items;
        let display;

        const indexOfLastRequest = currentPage * requestsPerPage;
        const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
        display= <div>
                    <Spinner className='spinner-center' />
                </div>;
        let obj;
        if (Object.keys(requests.filtered).length !== 0){
            obj = requests.filtered;
        }else {
            obj = requests.requests;
        }
        
        if(requests.error !== null){
            display = <div>
               <h3 className="text-center text-danger">{requests.error.status === 401 ? "Invalid Session" :requests.error.message}</h3>
         </div>;
        }else {
                if(Object.keys(obj).length !== 0 && obj.constructor === Object) {
                items =obj.data;
                const currentRequests = items.slice(indexOfFirstRequest, indexOfLastRequest);
                const table = <TableComponent
                items={currentRequests}
                viewRequest={this.viewRequest}
                destination="request"
                currentPage={currentPage}
                requestsPerPage={requestsPerPage}
                totalRequests={items.length}
                paginate={this.paginate}
                />;

                display = items && items.length ? table :<p className="text-center backdrop">you currently have no requests</p>;
            }
        }

        return(
            <>
            <Meta title="Requests"/>
                <RequestPanel
                    title={requests.title} 
                    onClick={this.handleRequests} 
                    onChange={this.handleChange} 
                    holder={message} type={type} 
                    search={this.handleSearch}
                />
                <div className="bg-img" />
                <div className="black-container black-short" />
                <p className='accommodation-title p-top-5'>Your Requests</p>
                <div className='grid'>
                    <div className='col-10 offset-3'>
                        <Button buttonType='button' ButtonId='create-start' classes={`btn m-bottom-1 ${ isCreating ? 'btn-danger' : 'btn-primary' }`} text={isCreating? '✖ Close' : '✙ New Request'} onClick={this.toggleCreating} />
                    </div>
                    <div className='col-2' />
                    { isCreating? <CreateRequest history={history} /> : ''}
                </div>
                <div className="grid sm p-bottom-3">
                    <div className="col-10 offset-3">
                    <div className="page-header text-center"  />
                   {display}
                    </div>
                </div>
            </>
        );
    }
}
RequestView.propTypes ={
    fetchRequests: propTypes.func.isRequired,
    searchRequests: propTypes.func.isRequired,
    requests: propTypes.object.isRequired,
    getPending: propTypes.func.isRequired,
    getPast: propTypes.func.isRequired,
    history: propTypes.objectOf({
        push: propTypes.func.isRequired
    }).isRequired
};
export const mapStateToProps = (state) => {
    return {
        requests: state.requests,
        error: state.error
    };
};

const mapDispatchToProps = {
    fetchRequests,
    getPending,
    searchRequests,
    getPast
};

export { RequestView as RequestViewTest };
export default connect(mapStateToProps, mapDispatchToProps)(RequestView);