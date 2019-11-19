/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-useless-constructor */
import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { ToastContainer} from 'react-toastify';
import TableComponent from './shared/tableComponent';
import { fetchRequests }  from '../redux/actions/requestsAction';
import 'react-toastify/dist/ReactToastify.css';


class RequestView extends React.Component{
    constructor(props) {
        super(props);
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
                    setTimeout(() => {
                        // eslint-disable-next-line react/prop-types
                        history.push('/login');
                      }, 3000);
                }
            }
            }
        }


    render(){
        const { requests } = this.props;
        let items;
        let display;
        display= <div>
                    <h2 className="text-center">Data Loading ...</h2>
                </div>;
        if(requests.error !== null){
            display = <div>
               <h3 className="text-center text-danger">{requests.error.status === 401 ? "Invalid Session" :requests.error.message}</h3>
         </div>;
        }else{
            const obj =requests.requests;
            if (Object.keys(obj).length !== 0 && obj.constructor === Object) {
                items =obj.data;
                const table =<TableComponent items={items}/>;

                display = items && items.length ? table :<p className="text-center backdrop">you currently have no requests</p>;
            }
        }
        return(
            <>
                <div className="grid sm p-bottom-3">
                    <div className="col-10 offset-3">
                    <h1 className="page-header text-center">Request Table</h1>
                   {display}
                    </div>
                    <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
                />
                </div>
            </>
        );
    }
}
RequestView.propTypes ={
    fetchRequests: propTypes.func.isRequired,
    requests: propTypes.object.isRequired,
};
export const mapStateToProps = (state) => {
    return {
        requests: state.requests,
        error: state.error
    };
};

const mapDispatchToProps = {
    fetchRequests
};

export { RequestView as RequestViewTest };
export default connect(mapStateToProps, mapDispatchToProps)(RequestView);