import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import {VerifyPage} from '../../components/VerifyEmailPage';
import {ReverifyPage} from '../../components/ReverifyPage';
import {Spinner} from '../../components/shared/Spinner';
import '../../styles/index.scss';

const verifyData1 = {data: null, error: 'error'};
const verifyData3 = {data: null, error: null};
const verify = (token) => token;
const location={search: "https://localhost:3000/api/v1/?token=genericToken"};
storiesOf('User | Auth/Verify', module)
    .add('before the server respond', () => (<VerifyPage  verify ={verify} location={location} verifyData={verifyData1}/>))
    .add('without data and error', () => (<VerifyPage verify={verify} location={location} verifyData={verifyData3}/>));

storiesOf('User | Auth/Reverify', module)
    .add('Reverify', () => (<ReverifyPage reverify={verify}/>));

storiesOf("Building blocks | Spinner", module)
    .add('spinner', () => (<Spinner/>));