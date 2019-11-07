import * as yup from 'yup';

const messages = {
    short: 'Too short',
    required: 'This field is required',
    maxDate: 'The birth date can\'t be later than 01-01-2002',
    phone: 'The phone number has to be exactly 10 numbers',
    department: 'You have to choose a department',
    gender: 'You have to choose a gender',
    validEmail: 'Please include an @ sign in the email',
    validPassword: 'Password must be atleast 8 characters with atleast a special letter and a capital letter'
};

const schema = {
    passportName: yup.string().min(3, messages.short),
    passportNumber: yup.string().min(3, messages.short),
    firstName: yup.string().min(3, messages.short).required(messages.required),
    lastName: yup.string().min(3, messages.short).required(messages.required),
    birthDate: yup.date().max('01-01-2002', messages.maxDate),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, messages.phone),
    language: yup.string().min(3, messages.short),
    currency: yup.string().min(3, messages.short),
    location: yup.string().min(3, messages.short),
    department: yup.string().min(3, messages.department),
    gender: yup.string().min(3, messages.gender),
    userEmail: yup.string().email(messages.validEmail).required(messages.required),
    // eslint-disable-next-line no-useless-escape
    userPassword: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/, messages.validPassword).required(messages.required),
};


export default (key, value) => {
    const newSchema = yup.object().shape({ [key]: schema[key] });
    const toCheck = { [key]: value };
    return newSchema.validate(toCheck).catch((err) => {
        return {
            error: err.errors[0]
        };
    });
}; 
