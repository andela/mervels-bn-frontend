import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, Welcome } from '@storybook/react/demo';
import App from '../App';
import '../styles/App.scss';


storiesOf('Home page | Main app/Applicaton', module)
    .add('welcome', () => (<Welcome/>))
    .add('home page', () => (<App/>));
    
storiesOf('Building components | Button', module)
    .add('Non lickable', () => (<Button>Non clickable</Button>))
    .add('clickable', () => (<Button onClick={action('clicked')}>Click Me</Button>));