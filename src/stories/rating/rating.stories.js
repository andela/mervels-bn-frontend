/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Rating from '../../components/shared/ratingCompoment';
import Rate from '../../components/shared/Rating';
import '../../styles/App.scss';
import Provider from '../provider';

const props = {
    stars: [1, 2, 3]
  };

storiesOf('Accommodations | Rating', module)
    .addDecorator(story => <Provider story={story()} />)
    .add('Rating Stars', () => (<Rating {...props} />) );

storiesOf('Accommodations | Rate', module)
    .add('Rate Star', () => (<Rate />));