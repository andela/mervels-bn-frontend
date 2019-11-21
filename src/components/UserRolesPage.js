/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { assignUser }  from '../redux/actions/superAdminAction';
import validator from '../helpers/validator';
import Input from './shared/input';
import Select from './shared/Select';
import SidebarComponent from './shared/Sidebar';
import SettingsCard from './shared/settingsCard';
import addSupplier from '../redux/actions/addSupplierAction';
import Button from './shared/Button';

class UserRoles extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:null,
            submittingSuplier: false,
            role: '',
            errors: {},
            supplier: {errors: {firstName: '', lastName: '', userEmail: ''}, firstName: '', lastName: '', userEmail: ''},
        };
    }

    componentWillReceiveProps(nextProps){
        const {history, addedSupplier} = nextProps;
        if(addedSupplier) {
        const {data, error} = addedSupplier;
        if(data) {
                toast.success('Supplier added successfully');
                this.setState((prev) => ({...prev, submittingSuplier: false}));
            } else {
                const {status} = error;
                if(status===401) {
                    toast.error('Current session is expired. Login');
                    localStorage.removeItem('bareFootToken');
                    history.push('/login');
                } else if(status === 403) {
                    toast.error('Access denied');
                    history.push('/AccessForbidden');
                } else if(status === 500) {
                    toast.error('Server Error');
                    history.push('/500');
                } else if(status === 409) {
                    this.setState((prev) => ({...prev, submittingSuplier: false}));
                    toast.error("User already exist");
                }
            }
        }
    }

    handleChange = async(e) => {
        e.persist();
        this.setState({
          [e.target.name]: e.target.value
        });
        const { error } = await validator(e.target.name, e.target.value);
        const { errors } = this.state;
        this.setState({ errors: { ...errors, [e.target.name]: error } });
      };

      handleSubmit = (e) => {
        e.preventDefault();
        const { assignUser: assigner } = this.props;
        const { email, role, errors } = this.state;
        const roleInfo = {
            userEmail: email,
            userRole: role,
        };
        if (email && role !== '' && Object.keys(errors).length !== 0) {
            assigner(roleInfo);
        }else{
            toast.error('The data you are trying to send is not valid',
                { position: toast.POSITION.TOP_RIGHT }
            );
        }
      }

      handleSupChange = async ({target}) => {
        this.setState((prev) => ({...prev, supplier: {...prev.supplier, [target.name]: target.value} }));
        const { error } = await validator(target.name, target.value);
        this.setState((prev) => ({...prev, supplier: {...prev.supplier, errors: {...prev.supplier.errors, [target.name]: error} }}));
    }


      handleAddSupplier = async (e) => {
          e.preventDefault();
        const {addSupplier} = this.props;
        // eslint-disable-next-line react/destructuring-assignment
        const {userEmail, firstName, lastName} = this.state.supplier;
        const values = [userEmail, firstName, lastName];
        const keys = Object.keys({userEmail, firstName, lastName});
        values.forEach( async (value, index) => { 
            const key = keys[index];
            const {error} = await validator(key, value);
            this.setState((prev) => ({...prev, supplier: {...prev.supplier, errors: {...prev.supplier.errors, [key]: error}}}));
        });

        const {errors} = this.state.supplier;
        const error = Object.values(errors);
        const hasErrors = error.some((err) => err!== undefined);
        if (!hasErrors) {
            addSupplier({userEmail, firstName, lastName});
            this.setState((prev)=>({...prev, submittingSuplier: true}));
        }

      }

    render() {
        const { role, email, errors, supplier,submittingSuplier } =this.state;
        return (
            <>
            <SidebarComponent pageRole="Admin" />
                <h1 className="text-center m-top-2">Settings</h1>
                <div className="grid m-left-2 m-right-2 m-top-2">
                    <SettingsCard title="Roles Panel" handleSubmit={this.handleSubmit} classes='roles-form'>
                    <Input placeholder='Enter user email'
                                name="email"
                                inputType="email"
                                onChange={this.handleChange}
                                value={email}
                                error={errors.email}
                                required />
                                <Select
                                name='role'
                                options={['','Travel Team Member', 'Travel Administrator', 'Manager', 'Requester']}
                                selected={role}
                                error={errors.role}
                                onChange={this.handleChange}
                                />
                                <button className="btn btn-secondary" type="submit">Assign</button>
                    </SettingsCard>

                    <SettingsCard title="Add Supplier" handleSubmit={this.handleAddSupplier} classes='supplier-form'>
                    <Input placeholder='Enter Supplier email'
                                name="userEmail"
                                inputType="email"
                                error={supplier.errors.userEmail}
                                onChange={this.handleSupChange}
                                value={supplier.userEmail}
                                required />
                    <Input placeholder='First Name'
                                name="firstName"
                                inputType="text"
                                error={supplier.errors.firstName}
                                onChange={this.handleSupChange}
                                value={supplier.firstName}
                                required />
                    <Input placeholder='Last Name'
                                name="lastName"
                                inputType="text"
                                error={supplier.errors.lastName}
                                onChange={this.handleSupChange}
                                value={supplier.lastName}
                                required />
                                <Button classes="btn btn-secondary" text="Submit" buttonType="submit" submitting={submittingSuplier} ButtonId='1'/>
                    </SettingsCard>

                </div>
            </>
        );
    }
}

export const mapStateToProps = (state) => ({
    userRoles: state.userRoles,
    error: state.error,
    addedSupplier: state.addedSupplier
});

const mapDispatchToProps = {
    assignUser,
    addSupplier
};

export { UserRoles as UserRolesTest};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoles); 
