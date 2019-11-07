/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Profile from '../../components/ProfilePage';
import '../../styles/App.scss';
import Provider from '../provider';

const props = {
    history : {
        push: () => {}
    }
};

storiesOf('User | Profile', module)
    .addDecorator(story => <Provider story={story()} />)
    .add('Unloaded Profile', () => (<Profile {...props} />));