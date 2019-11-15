import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import {ApproveReject} from '../../components/ApproveReject';
import '../../styles/index.scss';

const location = {pathname: 'http://localhost://approvals/2'};

storiesOf('Request/Approve or Reject', module)
    .add('request page before data comes', () => (<ApproveReject location={location} getSingleRequest={()=>null} />));
    