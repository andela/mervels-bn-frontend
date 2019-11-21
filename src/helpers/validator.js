/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
import * as yup from 'yup';
import moment from 'moment';

const messages = {
    short: 'Too short',
    required: 'This field is required',
    maxDate: 'The birth date can\'t be later than 01-01-2002',
    phone: 'The phone number has to be exactly 10 numbers',
    department: 'You have to choose a department',
    gender: 'You have to choose a gender',
    validEmail: 'Please include an @ sign in the email',
    validPassword: 'Password must be atleast 8 characters with atleast a special letter and a capital letter',
    validLong: 'Reason must be atleast 30 characters',
    alphanum: 'Has to start with a letter'
};

const schema = {
    passportName: yup.string().min(3, messages.short),
    passportNumber: yup.string().min(3, messages.short),
    firstName: yup.string().matches(/^[a-zA-Z]/, messages.alphanum).min(3, messages.short).required(messages.required),
    lastName: yup.string().matches(/^[a-zA-Z]/, messages.alphanum).min(3, messages.short).required(messages.required),
    birthDate: yup.date().max('01-01-2002', messages.maxDate),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, messages.phone),
    language: yup.string().min(3, messages.short),
    currency: yup.string().min(3, messages.short),
    location: yup.string().min(3, messages.short),
    department: yup.string().min(3, messages.department),
    gender: yup.string().min(3, messages.gender),
    userEmail: yup.string().email(messages.validEmail).required(messages.required),
    email: yup.string().email(messages.validEmail).required(messages.required),
    userPassword: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/, messages.validPassword).required(messages.required),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/, messages.validPassword).required(messages.required),
    reasonComment: yup.string().min(30, messages.validLong),
    role: yup.string().required(messages.required)
};

export const validateRequest = (payload) => {
    const travelDates = payload.trips.map((trip) => trip.travelDate);
    const accommodations = payload.trips.map((trip) => trip.accommodation);
    const locations = payload.trips.map((trip) => trip.location);
    // Add profile info validations!
    if(accommodations.includes('') || locations.includes('') || !payload.reason || !payload.from){
        return 'Please fill all fields';
    }   
    if (moment().isAfter(travelDates[0]) === true) {
      	return 'Travel Dates must be later than today';
    }
    if (payload.returnDate !== undefined) {
      	if (moment(travelDates[travelDates.length - 1]).isAfter(payload.returnDate) === true) {
        	return 'The Return Date must be later than travel date';
      	}
    }
    if (travelDates.length > 1) {
      	for (let date = 0; date < travelDates.length - 1; date += 1) {
        	if (moment(travelDates[date]).isAfter(travelDates[date + 1]) === true) {
          		return 'Travel Dates must be in order';
        	}
      	}
    }
    return null;
};


export default (key, value) => {
    const newSchema = yup.object().shape({ [key]: schema[key] });
    const toCheck = { [key]: value };
    return newSchema.nullable().validate(toCheck).catch((err) => {
        return {
            error: err.errors[0]
        };
    });
};
