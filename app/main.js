/**
 * Created by Vladimir on 9/10/2016.
 */

import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {AppContainer} from 'react-hot-loader';
import routes from './routes';

import './styles/style.css';
import './styles/font-awesome.min.css';

render(<Router history={browserHistory} routes={routes} />, document.getElementById('root'));