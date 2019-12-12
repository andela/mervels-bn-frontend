/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { storiesOf } from '@storybook/react';
import OneWay from '../../components/OneWayRequest';
import '../../styles/App.scss';
import Provider from '../provider';

const props = {
    currentRequest: {
        status: '',
        locations: [
            {
                id : 1,
                country: 'Rwanda',
                city: 'Kigali',
                Accommodations: [{
                    name: 'X'
                }]
            },
            {
                id : 2,
                country: 'Uganda',
                city: 'Kampala',
                Accommodations: []
            }
        ],
        message: '',
        error: ''
    },
    autofillInfo: {
        passportNumber: 'x',
        passportName: 'x',
        gender: 'MALE'
    },
    history: {},
  };

storiesOf('Requests | Create', module)
    .addDecorator(story => <Provider story={story()} />)
    .add('one way form', () => (<OneWay {...props} />) );

