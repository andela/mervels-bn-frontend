/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Profile from './Profile';
import validator from '../helpers/validator';
import NavBar from './shared/navbarComponent';
import { getProfile, updateProfile, updateProfilePicture as updatePicture } from '../redux/actions/profileAction';

export class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updating: false,
            submitting: false,
            uploading: false,
            passportName: '',
            passportNumber: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            department: '',
            phoneNumber: '',
            language: '',
            currency: '',
            gender: '',
            location: '',
            image: '',
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleUpdating = this.toggleUpdating.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this);
    }

    componentDidMount() {
        const { getProfile } = this.props;
        getProfile();
    }

    componentWillReceiveProps(nextProps) {
        const { history } = this.props;
        if(nextProps.profile.error === 'Server error') {
            history.push('/500');
        }
        if(nextProps.profile.error === 'Invalid or expired token used') {
            history.push('/login');
            nextProps.profile.error = 'You need to log in again';
        }
        switch(nextProps.profile.status) {
            case 'fetch_success':
                this.setState(nextProps.profile.data);
                break;
            case 'update_success':
                toast.success('Profile successfully updated', {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.setState({...nextProps.profile.data, uploading: false, updating:false, submitting: false });
                break;
            case 'fetch_error':
                toast.error(nextProps.profile.error, {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case 'update_error':
                toast.error(nextProps.profile.error, {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.setState({ uploading: false, submitting: false });
                break;
            default:
                break;
        };
    }

    uploadPicture(e) { 
        const { updatePicture } = this.props;
        const data = new FormData();
        const image = e.target.files[0];
        const allowedTypes = ['image/png', 'image/jpeg'];
        if(!allowedTypes.includes(image.type)){
            return toast.error('Please choose an image with format JPEG or PNG', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        data.append('image', image);
        this.setState({ uploading: true });
        return updatePicture(data);
    }

    async handleChange(e) {
        e.persist();
        this.setState({ [e.target.name]: e.target.value });
        let { error } = await validator(e.target.name, e.target.value);
        const selectTags = ['department', 'gender'];
        if(e.target.value === '' && !selectTags.includes(e.target.name)) {
            error = '';
        }
        const { errors } = this.state;
        this.setState({ errors: { ...errors, [e.target.name]: error } });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { updateProfile, profile } = this.props;
        const payload = {};
        Object.assign(payload, this.state);
        delete payload.updating; delete payload.image; delete profile.data.image;
        delete payload.uploading; delete payload.submitting;
        if(payload.birthDate === 'Invalid date'){
            delete payload.birthDate;
        }
        if(Object.values(payload.errors).some(el => (el !== undefined && el !== '' ))){
            return toast.error('The data you are trying to send is not valid',
                { position: toast.POSITION.TOP_RIGHT }
            );
        }
        delete payload.errors;
        if(Object.is(JSON.stringify(profile.data), JSON.stringify(payload))){
            this.setState({ updating: true });
            return toast.error('No fields updated', { position: toast.POSITION.TOP_RIGHT });
        }
        this.setState({ submitting: true });
        return updateProfile(payload);
    }

    toggleUpdating() {
        const { updating } = this.state;
        const { profile } = this.props;
        this.setState({ updating: !updating, ...profile.data });
    }

    render() {
        const {
            updating,
            uploading,
            submitting,
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
            image,
            errors
        } = this.state;
            return (
                <>
                    <NavBar />
                    <Profile
                        updating={updating}
                        uploading={uploading}
                        submitting={submitting}
                        image={image}
                        uploadPicture={this.uploadPicture}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        toggleUpdating={this.toggleUpdating}
                        errors={errors}
                        firstName={firstName}
                        lastName={lastName}
                        birthDate={birthDate}
                        gender={gender}
                        location={location}
                        language={language}
                        phoneNumber={phoneNumber}
                        currency={currency}
                        passportName={passportName}
                        passportNumber={passportNumber}
                        department={department}
                    />
                </>
            );
    }
}

ProfileComponent.propTypes = {
    getProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    updatePicture: PropTypes.func.isRequired,
    profile: PropTypes.objectOf({
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
    history: PropTypes.objectOf({
        push: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = ({profile}) => ({ profile });

export default connect(
    mapStateToProps,
    {
        getProfile,
        updateProfile,
        updatePicture
    }
)(ProfileComponent);