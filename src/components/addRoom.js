/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './shared/input';
import Button from './shared/Button';
import { createRooms } from '../redux/actions/accommodationsAction';

export class AddRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomname: '',
            roomtype: '',
            roomprice: '',
            rooms: [],
            requiredError: null
        };
    }

    handleAdd = () => {
        const { rooms } = this.state;
        this.setState({
            rooms: rooms.concat([{
                name: null,
                type: null,
                price: null
            }])
        });
    };

    handleRemove = (index) => {
        const { rooms } = this.state;
        this.setState({
            rooms: rooms.filter((r, idx) => index !== idx)
        });
    }

    handleChange = (e, index) => {
        const { rooms } = this.state;
        if (index >= 0) {
            const newRooms = rooms.map((room, idx) => {
                if (index === idx) return { ...room, [e.target.name]: e.target.value };
                return room;
            });
            this.setState({
                rooms: newRooms
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    handleNew = (index) => {
        return <>
        <div className='col-12'><h3>Room</h3></div>        
        <div className='col-6'>
            Name *:<br />
            <Input inputType='text' name='name' onChange={(e) => this.handleChange(e, index)} error='' />
        </div>
        <div className='col-6'>
            Type *:<br />
            <Input inputType='text' name='type' onChange={(e) => this.handleChange(e, index)} error='' />
        </div>
        <div className='col-6'>
            Price *:<br />
                <Input inputType='number' name='price' onChange={(e) => this.handleChange(e, index)} error='' />
        </div>
        <div className='col-1'>
            <br />
            <Button buttonType='button' ButtonId='remove-room' classes='btn btn-danger p-left-2 p-right-2' text='✖' onClick={() =>this.handleRemove(index)}/>
        </div>
        <div className='col-5' />
    </>;
    }

    handleSubmit = () => {
        const { roomprice, roomname, roomtype, rooms } = this.state;
        const { submit, id } = this.props;
        let canSubmit = true;
        rooms.map((room) => {
            if (Object.values(room).includes(null)) canSubmit = false;
        });
        if(!roomname || !roomprice || !roomtype || !canSubmit ){
            this.setState({
                requiredError: 'ALL * fields are required'
            });
        } else {
            const { createRooms } = this.props;
            const room1 = {
                name: roomname,
                type: roomtype,
                price: roomprice
            };
            const data = [...rooms];
            data.push(room1);
            const createRoom = {
                rooms: data,
                accommodationId: id
            };
            submit();
            createRooms(createRoom);
        }
    }

    render() {
        const { rooms, roomname, roomtype, roomprice, requiredError } = this.state;
        const { submitting } = this.props;
        return (
            <div className="col-10 p-1 m-bottom-1 offset-3">
            <div className='grid white p-left-1 p-top-1'>
                <div className='col-12'><h3>Room</h3></div> 
                <div className='col-6'>
                    Name *:<br />
                    <Input inputType='text' value={roomname} name='roomname' onChange={(e) => this.handleChange(e)} error='' />
                </div>
                <div className='col-6'>
                    Type *:<br />
                    <Input inputType='text' value={roomtype} name='roomtype' onChange={(e) => this.handleChange(e)} error='' />
                </div>
                <div className='col-6'>
                    Price *:<br />
                        <Input inputType='number' value={roomprice} name='roomprice' onChange={(e) => this.handleChange(e)} error='' />
                </div>
                <div className='col-6' />
                {rooms.map((room, index) => this.handleNew(index))}
                <div className='col-12'>
                    <Button buttonType='button' ButtonId='add-room' classes='btn btn-secondary col-4' text='✚ Add Rooms' onClick={() =>this.handleAdd()} />
                </div>
                <div className='col-12 m-right-2'>
                    <h4 className="text-center text-danger">{requiredError || ''}</h4>
                </div>
                <div className='col-12 center'>
                    <Button
                        buttonType='button'
                        ButtonId='submit-rooms'
                        classes='btn btn-primary'
                        text='Add'
                        submitting={submitting}
                        onClick={this.handleSubmit}
                    />
                </div>
            </div>
            </div>
        );
    }
}

AddRoom.propTypes = {
    createRooms: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
};

export default connect(null, { createRooms })(AddRoom);
