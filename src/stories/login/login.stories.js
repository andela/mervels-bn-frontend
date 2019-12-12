/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { storiesOf } from '@storybook/react';
import SocialAuth from '../../components/shared/socialAuth';
import Login from '../../components/LoginPage';
import '../../styles/App.scss';
import Provider from '../provider';

const props = {
    user: {},
    history: {
      push: () => {}
    },
  };

storiesOf('User | Auth/login', module)
    .addDecorator(story => <Provider story={story()} />)
    .add('empty login', () => (<Login {...props} />) );

storiesOf('User | Auth/Social', module)
    .add('social Auth', () => (<SocialAuth />));