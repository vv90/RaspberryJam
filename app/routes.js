/**
 * Created by Vladimir on 9/10/2016.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';

import HomePage from './components/HomePage';
import Registration from './components/Registration';
import Qualifying from './components/Qualifying';
import Skating from './components/Skating';
import Setup from './components/Setup';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="setup" component={Setup} />
		<Route path="registration" component={Registration} />
		<Route path="qualifying" component={Qualifying} />
		<Route path="skating" component={Skating} />
	</Route>
);