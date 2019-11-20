/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchRequestApprovals } from '../redux/actions/approvalsActions';
import TableComponent from './shared/tableComponent';
import SidebarComponent from './shared/SidebarComponent';


class ApprovalsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            requestsPerPage: 3,
          };
    }

    componentDidMount(){
        const { fetchRequestApprovals: getApprovals } = this.props;
        getApprovals();
    }

    componentDidUpdate(prevProps) {
        const { approvals, history } = this.props;
        if (approvals !== prevProps.approvals) {
            if(approvals.error){
                if(approvals.error.status === 403){
                        history.push('/AccessForbidden');
                }
            }
        }
        }

    setCurrentPage = (pageNumber) =>{
        this.setState({
            currentPage: pageNumber,
        });
    }

    paginate = (pageNumber) => this.setCurrentPage(pageNumber)

    render(){
        const { approvals } = this.props;
        const { requestsPerPage, currentPage  } = this.state;
        let items;
        let display;

        const indexOfLastRequest = currentPage * requestsPerPage;
        const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
        display= <div>
                    <h2 className="text-center">Data Loading ...</h2>
                </div>;
        if(approvals.error !== null){
            display = <div>
               <h3 className="text-center text-danger">{approvals.error.status === 401 ? "Invalid Session" :approvals.error.message}</h3>
         </div>;
        }else{
            const obj =approvals.approvals;
            if (Object.keys(obj).length !== 0 && obj.constructor === Object) {
                items =obj.data;
                const currentRequests = items.slice(indexOfFirstRequest, indexOfLastRequest);
                const table =<TableComponent
                items={currentRequests}
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
                <SidebarComponent />
                <div className="grid sm p-bottom-3">
                    <div className="col-10 offset-3">
                    <h1 className="page-header text-center">Approvals Table</h1>
                   {display}
                    </div>
                </div>
            </>
        );
    }
}

ApprovalsPage.propTypes ={
    fetchRequestApprovals: propTypes.func.isRequired,
    approvals: propTypes.object.isRequired,
};



export const mapStateToProps = ({ approvals, error }) => {
    return {
        approvals,
        error
    };
};

const mapDispatchToProps = {
    fetchRequestApprovals
};

export { ApprovalsPage as ApprovalsPageTest };
export default connect(mapStateToProps, mapDispatchToProps)(ApprovalsPage);