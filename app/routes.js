/**
 * Created by Vladimir on 9/10/2016.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';

import HomePage from './components/HomePage';
import Skating from './components/Skating';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="skating" component={Skating} />
	</Route>
);