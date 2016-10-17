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

const workflowStateValue = localStorage.getItem('competitionWorkflowState');

const store = configureStore(workflowStateValue
	? { competitionWorkflow: JSON.parse(workflowStateValue) }
	: {});

store.subscribe(()=>{
	localStorage.setItem('competitionWorkflowState', JSON.stringify(store.getState().competitionWorkflow));
});

render(<Provider store={store}><Router history={browserHistory} routes={routes} /></Provider>,
	document.getElementById('root'));