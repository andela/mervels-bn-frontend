/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import renderer from "react-test-renderer";
import { shallow, mount } from 'enzyme';
import { ResetFormTemplate, ResetEmailSentTemplate, ResetEmailComplete, PasswordResetFormTemplate } from "../../../components/ResetPassword/ResetPasswordForm";


describe('Reset Password Form', () => {
    test('should test ResetForm Template', () => {
        const wrapper = shallow(
            <ResetFormTemplate
                onChange={jest.fn()}
                handleChange={jest.fn()}
                onSubmit={jest.fn()}
                required
                email="trans@email.com"
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
    test('should test Reset Email Template', () => {
        const wrapper = shallow(
            <ResetEmailSentTemplate
                email="trans@email.com"
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
    test('should test Reset Email Complete', () => {
        const wrapper = shallow(
            <ResetEmailComplete
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
    test('should test Password Reset Form Template', () => {
        const wrapper = shallow(
            <PasswordResetFormTemplate
                onChange={jest.fn()}
                onSubmit={jest.fn()}
                error={{password:undefined}}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});