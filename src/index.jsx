/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import fastclick from 'fastclick';
import App from './app';

fastclick.attach(document.body);

ReactDOM.render(<App />, document.getElementById('root'));
