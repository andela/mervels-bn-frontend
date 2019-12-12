import React from 'react';
import { storiesOf } from '@storybook/react';
import App from '../App';
import '../styles/App.scss';


storiesOf('Home page | Applicaton', module)
    .add('home page', () => (<App/>));
    