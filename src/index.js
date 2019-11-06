import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './index.css';
import App from './App';
import { SENTRY_DSN } from './config';

Sentry.init({ dsn: SENTRY_DSN });

ReactDOM.render(<App />, document.getElementById('root'));
