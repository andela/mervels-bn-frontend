import * as yup from 'yup';

const messages = {
    short: 'Too short',
    required: 'This field is required',
    validEmail: 'Please include an @ sign in the email',
    validPassword: 'Password must be atleast 8 characters with atleast a special letter and a capital letter'
};

const schema = {
    firstName: yup.string().min(3, messages.short).required(messages.required),
    lastName: yup.string().min(3, messages.short).required(messages.required),
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