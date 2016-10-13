/**
 * Created by Vladimir on 9/10/2016.
 */

import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';

import routes from './routes';
import configureStore from './store/configureStore';

import './styles/style.css';
import './styles/font-awesome.min.css';

const persistedState = localStorage.getItem('reduxState')
	? JSON.parse(localStorage.getItem('reduxState'))
	: {};

const store = configureStore(persistedState);

store.subscribe(()=>{
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

render(<Provider store={store}><Router history={browserHistory} routes={routes} /></Provider>,
	document.getElementById('root'));