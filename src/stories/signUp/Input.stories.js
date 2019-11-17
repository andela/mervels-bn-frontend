import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import Input from '../../components/shared/input';
import '../../styles/index.scss';

storiesOf('Building blocks | Input', module)
    .add('SignUp page', () => (<Input/>));
