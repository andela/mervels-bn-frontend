/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Signup from '../../components/signupPage';
import '../../styles/App.scss';
import Provider from '../provider';

const props = {
    
  };

storiesOf('User | Auth/Signup', module)
    .addDecorator(story => <Provider story={story()} />)
    .add('Local strategy', () => (<Signup {...props} />) );