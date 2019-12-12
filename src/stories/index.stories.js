import React from 'react';
import { storiesOf } from '@storybook/react';
import App from '../App';
import '../App.scss';



storiesOf('Home page | Main app/Applicaton', module)
    .add('home page', () => (<App/>));