/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Button from './shared/Button';
import Input from './shared/Input';
import Select from './shared/Select';

const Profile = ({ 
    updating,
    uploading,
    image,
    uploadPicture,
    handleChange,
    handleSubmit,
    toggleUpdating,
    errors,
    firstName,
    lastName,
    birthDate,
    gender,
    location,
    language,
    phoneNumber,
    currency,
    passportName,
    passportNumber,
    department,
    submitting
}) => {
    const disabled = (updating)? '' : 'disabled';
    const buttonText = (updating)? 'Cancel' : 'Update';
    return (
        <div className='grid p-top-5'>
            <div className='col-4 picture-form center'>
                <img src={image} className="profile-picture" alt="Profile" height="250" width="250" />
                <br /><br />
                <form>
                    <label id='file-chooser' className={ uploading? 'btn btn-disabled large file-chooser' :'btn large btn-primary file-chooser'} htmlFor='file'>
                        {uploading ? 'Uploading' : 'Upload' } {uploading ? <FontAwesomeIcon icon={faSpinner} spin /> : '' }
                        <input type="file" name="image" id="file" accept='image/*' onChange={uploadPicture} hidden="hidden" />
                    </label>
                </form>
                <br />
            </div>
            <form id='update-profile-form' onSubmit={handleSubmit} className='profile-form col-8'>
                <div className='grid'>
                    <div className='col-6'>
                        First Name:
                        <Input value={firstName} name='firstName' onChange={handleChange} error={errors.firstName} disabled={disabled} />
                    </div>
                    <div className='col-6'>
                        Last Name:
                        <Input value={lastName} name='lastName' onChange={handleChange} error={errors.lastName} disabled={disabled} />
                    </div>
                    <div className='col-6'>
                        Birth Date:
                        <Input value={birthDate} inputType='date' name='birthDate' onChange={handleChange} error={errors.birthDate} disabled={disabled} />
                    </div>
                    <div className='col-6'>
                        Gender:
                        {/* <Input value={gender} name='gender' onChange={handleChange} error={errors.gender} disabled={disabled} /> */}
                        <Select name='gender' options={['','MALE', 'FEMALE', 'OTHER']} selected={gender} onChange={handleChange} error={errors.gender} disabled={disabled} />
                    </div>
                    <div className='col-6'>
                        Location:
                        <Input value={location} name='location' onChange={handleChange} error={errors.location} disabled={disabled} />
                    </div>
                    <div className='col-6'>
                        Language:
                        <Input value={language} name='language' onChange={handleChange} error={errors.language} disabled={disabled} />
                    </div>
                    <div className='col-6'>
                        Phone Number:
                        <Input value={phoneNumber} name='phoneNumber' onChange={handleChange} error={errors.phoneNumber} disabled={disabled} />
                    </div>
                    <div className='col-6'>
                        Currency:
                        <Input value={currency} name='currency' onChange={handleChange} error={errors.currency} disabled={disabled} />
                    </div>
                    <div className='col-6'>
                        Passport Name:
                        <Input value={passportName} name='passportName' onChange={handleChange} error={errors.passportName} disabled={disabled} />
                    </div>
                    <div className='col-6'>
                        Passport Number:
                        <Input value={passportNumber} name='passportNumber' onChange={handleChange} error={errors.passportNumber} disabled={disabled} />
                    </div>
                    <div className='col-6'>
                        Department:
                        <Select name='department' options={['','TDD', 'Marketing', 'Operations', 'Finance']} selected={department} onChange={handleChange} error={errors.department} disabled={disabled} />
                    </div>
                </div>
                <div className='center m-top-1'>
                    <Button ButtonId='edit-profile' classes='btn large btn-secondary' text={buttonText} onClick={toggleUpdating} />
                    {updating ? <Button ButtonId='submit-profile' classes='btn large btn-primary' text='Save' buttonType='submit' submitting={submitting} /> : '' }
                </div>
            </form>
        </div>
    );
};

Profile.propTypes = {
    updating: PropTypes.bool.isRequired,
    uploading: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    image:PropTypes.object.isRequired,
    uploadPicture: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    toggleUpdating: PropTypes.func.isRequired,
    errors: PropTypes.objectOf({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        birthDate: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
        passportName: PropTypes.string.isRequired,
        passportNumber: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired
    }).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    passportName: PropTypes.string.isRequired,
    passportNumber: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
};

export default Profile;