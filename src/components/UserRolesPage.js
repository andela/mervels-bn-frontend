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

class UserRoles extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:null,
            role: '',
            errors: {}
        };
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

    render() {
        const { role, email, errors } =this.state;
        return (
            <>
            <SidebarComponent pageRole="Admin" />
                <h1 className="text-center m-top-2">Settings</h1>
                <div className="grid m-left-2 m-right-2 m-top-2">
                    <div className="roles-panel col-9 offset-3">
                        <h3 className="title">Roles Panel</h3>
                        <div className="grid">
                            <form className='col-9 offset-4' onSubmit={this.handleSubmit}>
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
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export const mapStateToProps = (state) => ({
    userRoles: state.userRoles,
    error: state.error
});

const mapDispatchToProps = {
    assignUser
};

export { UserRoles as UserRolesTest};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoles);