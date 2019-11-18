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
import 'react-toastify/dist/ReactToastify.css';
import RequestPanel from './headerPanel';
import { searchMessage } from '../helpers/search';



class RequestView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            requestsPerPage: 2,
            parameter: null,
            query: null
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
                        // eslint-disable-next-line react/prop-types
                        history.push('/login');
                }
            }
        }
    }

    handleChange = (e) => {
        this.setState({
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

    paginate = (pageNumber) => this.setCurrentPage(pageNumber)

    handleSearch = () => {
        const { parameter, query } = this.state;
        const { searchRequests } = this.props;
        if(parameter && query ) {
            searchRequests(parameter, query);
        }
    }

    render(){
        const { parameter, currentPage } = this.state;
        let { requestsPerPage } = this.state;
        if(!requestsPerPage || requestsPerPage <= 0) {
            requestsPerPage = 1;
        }
        const { requests, match } = this.props;
        const { message, type } = searchMessage(parameter);
        let items;
        let display;

        const indexOfLastRequest = currentPage * requestsPerPage;
        const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
        display= <div>
                    <h2 className="text-center">Data Loading ...</h2>
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
                route={match.path}
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
                <RequestPanel
                    title={requests.title} 
                    onClick={this.handleRequests} 
                    onChange={this.handleChange} 
                    holder={message} type={type} 
                    search={this.handleSearch}
                />
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