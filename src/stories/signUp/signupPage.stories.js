import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import {SignUpPage} from '../../components/signupPage';
import '../../styles/index.scss';

storiesOf('User | Auth/SignUp', module)
    .add('SignUp page', () => (<SignUpPage/>));
    