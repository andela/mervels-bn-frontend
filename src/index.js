import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './styles/index.scss';
import App from './App';
import { SENTRY_DSN } from './sentry_config';

Sentry.init({ dsn: SENTRY_DSN });

ReactDOM.render(<App />, document.getElementById('root'));
