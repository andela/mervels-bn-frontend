/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme from '../../config/enzyme.config';
import ApproveReject, {ApproveReject as ApproveRejectPage} from '../../components/ApproveReject';
import request from '../../__mocks__/request';

const mount = Enzyme.mount;
const shallow = Enzyme.shallow;
const Render = Enzyme.render;
const mockedStore = configureStore([thunk]);

describe('Approve Reject', () => {

 describe('Unit tests', ()=>{
 


    const render = (params, fn=shallow) => {
        const defaultProps = {
            location: {pathname: 'http://localhost:3000/approvals/2'},
            match:{ params:1},
            history: {push: jest.fn()},
            singleRequest: {data: {status: 200, message: 'success'}, error: null},
            approveRejectAction: jest.fn(),
            getSingleRequest: jest.fn(),
        };
        const props = {...defaultProps, ...params };
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(<ApproveRejectPage {...props }/>);
    };

    it('should render the page successfully', () => {
        const wrapper = render();
        expect(wrapper).toHaveLength(1);
    });

    it('should not load a spinner after data comes', async () => {
        const wrapper = render(); 
        await wrapper.setState({...wrapper.instance().state, request});  
        const requestContainer = wrapper.find('.single-request-container');
        const spinner = wrapper.find('.spinner-center');
        expect(requestContainer).toHaveLength(1); 
        expect(spinner).toHaveLength(0);
    }); 

    it('handle validations', async () => {
        const wrapper = render(); 
        wrapper.setState({...wrapper.instance().state, request, error: 'Reason must be atleast 30 characters'});  
        const reasonContainer = wrapper.find('.txt-reason-comment');
        reasonContainer.simulate('change', {target: {value: 'this is less'}});
        const state = wrapper.instance().state;
        expect(state.reason).toEqual('this is less'); 
        expect(state.error).toEqual('Reason must be atleast 30 characters');
    });

    it('should handle submition with errors', async () => {
        const wrapper = render(); 
        wrapper.setState({...wrapper.instance().state, request, error: 'Reason must be atleast 30 characters'});
        const reasonContainer = wrapper.find('Button[ButtonId="1"]');
        reasonContainer.simulate('click', {target: {text: 'Approve'}});
        const state = wrapper.instance().state;
        expect(state.error).toEqual('Reason must be atleast 30 characters');
    });

    it('should handle submition without errors', async () => {
        const wrapper = render(Render);  
        wrapper.setState({...wrapper.instance().state, buttonTarget: {id: 1},  request, reason: 'this text is a mock test supposed to thirty characters and abover'});  
        const reasonContainer = wrapper.find('Button[ButtonId="1"]');
        reasonContainer.simulate('click', {target: {id: 1, text: 'Approve'}});
        expect(wrapper.instance().state).toHaveProperty('submitting');
    });

    // it('should handle cancel reconfirmation', async () => {
    //     const wrapper = render(Render);  
    //     wrapper.setState({...wrapper.instance().state, buttonTarget: {id: 1},  request, reason: 'this text is a mock test supposed to thirty characters and abover'});  
    //     const reasonContainer = wrapper.find('Button[ButtonId="1"]');
    //     reasonContainer.simulate('click', {target: {id: 1, textContent: 'Approve'}});
    //     const modal = wrapper.find('.main-modal');
    //     const cancelbtn = modal.find('[text="Close"]');
    //     console.log("mmm",wrapper.debug());
    //     cancelbtn.simulate('click');
    //     expect(wrapper.instance().state.showModal).toEqual(false);
    // });

    it('should handle choice of action dropdown when active ', async () => {
        const wrapper = render(Render);  
        wrapper.setState({...wrapper.instance().state, request, dropActive: true});  
        const dropdownIcon = wrapper.find('.drop-fa');
        dropdownIcon.simulate('click', {target: {id: 1, text: 'Approve'}});
        expect(wrapper.instance().state.dropActive).toEqual(false);

    });

    it('should handle choice of action dropdown when active ', async () => {
        const wrapper = render(Render);  
        wrapper.setState({...wrapper.instance().state, request, dropActive: false});  
        const dropdownIcon = wrapper.find('.drop-fa');
        dropdownIcon.simulate('click', {target: {id: 1, text: 'Approve'}});
        expect(wrapper.instance().state.dropActive).toEqual(true);
        expect(wrapper.instance().state.arrowDirection).toEqual('down');
    });

    it('should handle successfull approve/reject ', async () => {
        const wrapper = render();  
        wrapper.setProps({approveReject: {data: {status: 200, request}}});  
        const {history} = wrapper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledWith('/approvals');
    });

    it('should handle 401 error from server ', async () => {
        window.localStorage.removeItem =  () => jest.fn();
        const wrapper = render();  
        wrapper.setProps({singleRequest: {}, approveReject: {error: {status: 401, message: 'some message'}, data: null}});  
        const {history} = wrapper.instance().props;
        const {push} = history;
        localStorage.setItem('barefootToken', 'abcd'); 
        expect(push).toHaveBeenCalledWith('/login');
    });

    it('should handle 403 error from server ', async () => {
        const wrapper = render();  
        wrapper.setProps({singleRequest: {}, approveReject: {error: {status: 403, message: 'some message'}, data: null}});  
        const {history} = wrapper.instance().props;
        const {push} = history;
        localStorage.setItem('barefootToken', 'abcd');
        expect(push).toHaveBeenCalledWith('/AccessForbidden');
    });
        
    it('should handle 404 error from server ', async () => {
        const wrapper = render();   
        wrapper.setProps({singleRequest: {}, approveReject: {error: {status: 404, message: 'some message'}, data: null}});  
        const {history} = wrapper.instance().props;
        const {push} = history;
        localStorage.setItem('barefootToken', 'abcd');
        expect(push).toHaveBeenCalledWith('/approvals');
    });

    it('should handle 409 error from server ', async () => {
        const wrapper = render();  
        wrapper.setProps({singleRequest: {}, approveReject: {error: {status: 409, message: 'some message'}, data: null}});   
        const {history} = wrapper.instance().props; 
        const {push} = history;
        localStorage.setItem('barefootToken', 'abcd');
        expect(push).toHaveBeenCalledWith('/approvals');
    });

    it('should handle 500 error from server ', async () => {
        const wrapper = render();  
        wrapper.setProps({singleRequest: {}, approveReject: {error: {status: 500, message: 'some message'}, data: null}}); 
        const {history} = wrapper.instance().props;
        const {push} = history;
        localStorage.setItem('barefootToken', 'abcd'); 
        expect(push).toHaveBeenCalledWith('/500'); 
    });

    it('should handle other status error from server ', async () => {
        const wrapper = render();  
        wrapper.setProps({singleRequest: {}, approveReject: {error: {status: 501, message: 'some message'}, data: null}});   
        const {history} = wrapper.instance().props;
        const {push} = history;
        localStorage.setItem('barefootToken', 'abcd');
        expect(push).toHaveBeenCalledTimes(0);
    });

    it('should handle successfull fetching of single request ', async () => {
        const wrapper = render();  
        wrapper.setProps({singleRequest: {data: {status: 200, request}}, approveReject: {}});   
        const {history} = wrapper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledTimes(0);
    });
    
    it('should handle successfull fetching of single request with status not', async () => {
        const wrapper = render();  
        request.status = 'approved';
        wrapper.setProps({singleRequest: {data: {status: 200, request}}, approveReject: {}});   
        const {history} = wrapper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledWith('/approvals'); 
    });

it('should handle 401 error from server ', async () => {
        window.localStorage.removeItem =  () => jest.fn();
        const wrapper = render();  
        wrapper.setProps({singleRequest: {error: {status: 401, request}}, approveReject: {}}); 
        const {history} = wrapper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledWith('/login');
    });

    it('should handle 403 error from server ', async () => {
        const wrapper = render();  
        wrapper.setProps({singleRequest: {error: {status: 403, request}}, approveReject: {}}); 
        const {history} = wrapper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledWith('/AccessForbidden');
    });
        
    it('should handle 404 error from server ', async () => {
        const wrapper = render();   
        wrapper.setProps({singleRequest: {error: {status: 404, request}}, approveReject: {}});
        const {history} = wrapper.instance().props;
        const {push} = history;
        expect(push).toHaveBeenCalledWith('/approvals');
    });

    it('should handle 409 error from server ', async () => {
        const wrapper = render();  
        wrapper.setProps({singleRequest: {error: {status: 409, request}}, approveReject: {}});
        const {history} = wrapper.instance().props; 
        const {push} = history;
        expect(push).toHaveBeenCalledWith('/approvals');
    });

    it('should handle 500 error from server ', async () => {
        const wrapper = render();  
        wrapper.setProps({singleRequest: {error: {status: 500, request}}, approveReject: {}});
        const {history} = wrapper.instance().props;
        const {push} = history;
        localStorage.setItem('barefootToken', 'abcd'); 
        expect(push).toHaveBeenCalledWith('/500'); 
    });
}); 
  
 describe('integration tests', () => {
    const render = (params, fn=mount) => {
        const defaultProps = {
            location: {pathname: 'http://localhost:3000/approvals/2'},
            history: {push: jest.fn()},
            match:{ params:1},
            approveRejectAction: jest.fn(),
            getSingleRequest: jest.fn(),
        };
        const props = {...defaultProps, ...params };
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(<ApproveRejectPage {...props }/>);
    };

    const store= mockedStore({
        approveReject: {
            data: null, 
            error: null
        }, singleRequest: {}
    });
    it('should render the the connected component', () => {
        const wrapper = render({store, singleRequest: {}});
        expect(wrapper).toHaveLength(1);
    });

    it('should not load a spinner after data comes', async () => {
        const wrapper = render({singleRequest: {}}, shallow); 
        await wrapper.setState({ request});  
        const requestContainer = wrapper.find('.single-request-container');
        const spinner = wrapper.find('.spinner-center');
        expect(requestContainer).toHaveLength(1); 
        expect(spinner).toHaveLength(0);
    });
 });

 describe('integration tests', () => {
    const render = (params, fn=mount) => {
        const defaultProps = {
            location: {pathname: 'http://localhost:3000/approvals/2'},
            history: {push: jest.fn()},
            match:{ params:1},
            approveRejectAction: jest.fn(),
            getSingleRequest: () => ({ data: { request } })
        };
        const props = {...defaultProps, ...params };
        // eslint-disable-next-line import/no-named-as-default-member
        return fn(
            <Provider {...props }>
                <ApproveReject {...props }/>
            </Provider>
        );
    };

    const store= mockedStore({
        approveReject: {
            data: null, 
            error: null
        },
        singleRequest: {
            data: { request }
        },
        commentReducer: {
            comments:{},
            errors: null
        },
    });
    it('should render the the connected component', () => {
        const wrapper = render({store, singleRequest: {}});
        expect(wrapper).toHaveLength(1);
    });

    it('should open and close modal', () => {
        const wrapper = render({store, singleRequest: {
            data: { request },
            error: null
        }});
        const reasonText = wrapper.find('.txt-reason-comment');
        reasonText.simulate('change', { target: { value: 'something longer than 30 characters' } });
        const reasonContainer = wrapper.find('.btn-approve');
        reasonContainer.simulate('click', {target: {id: 1, text: 'Approve'}});
        const modal = wrapper.find('.main-modal'); 

        const close = wrapper.find('[text="Close"]');
        close.simulate('click');
    });

    it('should open and close modal', () => {
        const wrapper = render({store, singleRequest: {
            data: { request },
            error: null
        }});
        const reasonText = wrapper.find('.txt-reason-comment');
        reasonText.simulate('change', { target: { value: 'something longer than thirty characters characters' } });
        const reasonContainer = wrapper.find('.btn-approve');
        reasonContainer.simulate('click', {target: {id: 1, textContent: 'Approve'}});
        const modal = wrapper.find('.main-modal'); 
        const confirm = wrapper.find('[text="Confirm"]');
        confirm.simulate('click');
        console.log("<<<<", confirm.debug());
    });
 });
});