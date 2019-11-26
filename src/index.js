import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './styles/index.scss';
import App from './App';
import { SENTRY_DSN } from './sentry_config';
// import { connect } from "./config/sockets";

Sentry.init({ dsn: SENTRY_DSN });
// connect(); // Connects Sockets for notifications

ReactDOM.render(
<App />
, document.getElementById('root'));
